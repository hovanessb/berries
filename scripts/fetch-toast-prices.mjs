/**
 * Reads current prices from Bomberry's public Toast online-ordering page and
 * writes data/toast-prices.json, which lib/seed-menu.ts layers over the seed menu.
 *
 * Stop-gap until Toast API credentials exist. Once they do, lib/toast/menu.ts
 * uses the API and this script (and its workflow) can be deleted.
 *
 * Runs in GitHub Actions (.github/workflows/toast-prices.yml) with Playwright,
 * because the Toast page is rendered client-side. Fails loudly, and never writes
 * the data file, if the page does not look like a menu.
 *
 *   node scripts/fetch-toast-prices.mjs
 */
import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const ORDER_URL = (
  process.env.NEXT_PUBLIC_TOAST_ORDER_URL || "https://www.toasttab.com/local/order/bomberry-1223-n-grand-ave"
).replace(/\/$/, "");
const OUT = new URL("../data/toast-prices.json", import.meta.url);
const DEBUG_DIR = new URL("../debug/", import.meta.url);

const MIN_ITEMS = 6; // the menu has 10; far fewer means the page changed or we were blocked
const MAX_PRICE = 100;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  });
  // Not "networkidle": Toast's page never goes quiet (analytics, polling), so that wait times out.
  // Load the DOM, then wait for the menu itself.
  try {
    const resp = await page.goto(ORDER_URL, { waitUntil: "domcontentloaded", timeout: 45_000 });
    console.log(`HTTP ${resp?.status()} ${resp?.url()}`);
    await page.waitForSelector('a[href*="/item-"]', { timeout: 30_000 });
  } catch (err) {
    console.error(`Could not load menu: ${err.message.split("\n")[0]}`);
    await dumpDebug(page, "no item links found");
    throw new Error("No item links found on the Toast page (blocked, or the markup changed). See debug artifact.");
  }

  // Item links look like .../item-midnight-ube_<guid>. Price is the first $ amount in the card.
  const found = await page.evaluate(() => {
    const re = /\/item-([a-z0-9-]+)_([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/;
    const out = [];
    for (const a of document.querySelectorAll('a[href*="/item-"]')) {
      const m = a.getAttribute("href")?.match(re);
      if (!m) continue;
      // Walk up until the text contains a price (card wrappers differ by layout).
      let el = a;
      let text = a.innerText || "";
      for (let i = 0; i < 4 && !/\$\s?\d/.test(text) && el.parentElement; i++) {
        el = el.parentElement;
        text = el.innerText || "";
      }
      out.push({ slug: m[1], guid: m[2], text });
    }
    return out;
  });

  const items = {};
  for (const { slug, guid, text } of found) {
    const priced = text.match(/\$\s?(\d+(?:\.\d{1,2})?)(\s*\+)?/);
    if (!priced) continue;
    const price = Number(priced[1]);
    if (!(price > 0 && price <= MAX_PRICE)) continue;
    const name = text.split("\n").map((l) => l.trim()).find((l) => l && !l.startsWith("$")) || slug;
    items[slug] = { guid, name, price, priceFrom: Boolean(priced[2]) };
  }

  const count = Object.keys(items).length;
  if (count < MIN_ITEMS) {
    await dumpDebug(page, `only ${count} priced items`);
    throw new Error(`Only ${count} priced items parsed (need ${MIN_ITEMS}). Not updating. See debug artifact.`);
  }

  const previous = JSON.parse(await readFile(OUT, "utf8").catch(() => '{"items":{}}'));
  if (JSON.stringify(previous.items) === JSON.stringify(items)) {
    console.log(`No price changes (${count} items).`);
  } else {
    await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), items }, null, 2) + "\n");
    console.log(`Wrote ${count} items.`);
    for (const [slug, it] of Object.entries(items)) {
      const was = previous.items?.[slug]?.price;
      if (was !== it.price) console.log(`  ${it.name}: ${was ?? "new"} -> ${it.price}`);
    }
  }
} finally {
  await browser.close();
}

async function dumpDebug(page, reason) {
  // Print what the page looked like straight into the Actions log, so it can be read without downloading the artifact.
  try {
    const info = await page.evaluate(() => ({
      url: location.href,
      title: document.title,
      anchors: document.querySelectorAll("a").length,
      itemLinks: document.querySelectorAll('a[href*="item-"]').length,
      sampleHrefs: [...document.querySelectorAll("a[href]")].slice(0, 15).map((a) => a.getAttribute("href")),
      priceMentions: (document.body.innerText.match(/\$\s?\d+(?:\.\d{2})?/g) || []).length,
      text: document.body.innerText.replace(/\s+/g, " ").slice(0, 600),
    }));
    console.error("PAGE DIAGNOSTICS " + JSON.stringify(info, null, 2));
  } catch (e) {
    console.error("Could not read page for diagnostics: " + e.message);
  }
  await mkdir(DEBUG_DIR, { recursive: true });
  await writeFile(new URL("reason.txt", DEBUG_DIR), reason + "\n");
  await writeFile(new URL("page.html", DEBUG_DIR), await page.content());
  await page.screenshot({ path: new URL("page.png", DEBUG_DIR).pathname, fullPage: true });
}

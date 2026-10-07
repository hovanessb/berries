import "server-only";
import { toastGet } from "./client";
import { isToastConfigured, REVALIDATE } from "./config";
import { itemOrderUrl } from "./links";
import { SEED_MENU, STICKERS } from "../seed-menu";
import { artFor } from "../art";
import type { MenuData, MenuItem, MenuSection, ToastMenuGroup, ToastMenuItem, ToastMenusResponse, ToastStockItem } from "./types";

const onlineVisible = (v?: string[]) => !v || v.length === 0 || v.includes("TOAST_ONLINE_ORDERING");

const seedPrice = (name: string) =>
  SEED_MENU.sections.flatMap((s) => s.items).find((i) => i.name.toLowerCase() === name.toLowerCase())?.price ?? null;

function collectItems(group: ToastMenuGroup): ToastMenuItem[] {
  if (!onlineVisible(group.visibility)) return [];
  return [...(group.menuItems ?? []), ...(group.menuGroups ?? []).flatMap(collectItems)];
}

function toItem(t: ToastMenuItem, outOfStock: Set<string>): MenuItem {
  const sized = t.pricingStrategy === "SIZE_PRICE" || t.pricingStrategy === "OPEN_PRICE" || t.price == null;
  return {
    id: t.guid,
    name: t.name,
    description: t.description ?? "",
    price: t.price ?? seedPrice(t.name),
    priceFrom: sized,
    image: t.image ?? undefined,
    soldOut: outOfStock.has(t.guid),
    orderUrl: itemOrderUrl(t.name, t.guid),
    sticker: STICKERS[t.name.toLowerCase()],
    art: artFor(t.name),
  };
}

/** Live menu from Toast (read-only), or the seed menu when Toast isn't set up or fails. */
export async function getMenu(): Promise<MenuData> {
  if (!isToastConfigured()) return SEED_MENU;
  try {
    const [menus, stock] = await Promise.all([
      toastGet<ToastMenusResponse>("/menus/v2/menus", REVALIDATE.menu),
      toastGet<ToastStockItem[]>("/stock/v1/inventory", REVALIDATE.stock).catch(() => [] as ToastStockItem[]),
    ]);
    const outOfStock = new Set(stock.filter((s) => s.status === "OUT_OF_STOCK" || s.quantity === 0).map((s) => s.guid));
    const seen = new Set<string>();
    const sections: MenuSection[] = [];
    for (const menu of menus.menus.filter((m) => onlineVisible(m.visibility))) {
      for (const group of menu.menuGroups) {
        const items = collectItems(group)
          .filter((i) => onlineVisible(i.visibility) && !seen.has(i.guid) && seen.add(i.guid))
          .map((i) => toItem(i, outOfStock));
        if (items.length) sections.push({ id: group.guid, title: group.name, items });
      }
    }
    if (!sections.length) return SEED_MENU;
    return { sections, source: "toast", lastUpdated: menus.lastUpdated };
  } catch (err) {
    console.error("[toast] menu fetch failed, using seed menu", err);
    return SEED_MENU;
  }
}

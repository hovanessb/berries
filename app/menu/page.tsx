import type { Metadata } from "next";
import { getMenu } from "@/lib/toast/menu";
import { SITE } from "@/lib/site";
import { OrderCard } from "@/components/OrderCard";
import { Iris } from "@/components/Deco";

export const metadata: Metadata = {
  title: "Menu",
  description: "Organic acai bowls and crafted smoothies at Bomberry in Walnut, CA. Order pickup or delivery.",
};

export const revalidate = 600;

export default async function MenuPage() {
  const menu = await getMenu();
  return (
    <div className="section--rings" style={{ paddingBottom: 96 }}>
      <Iris />
      <header className="bb-pagehead wrap">
        <h1 className="bb-display">Menu</h1>
        <p>Tap Order on anything you like. You’ll finish checkout on our Toast page, for pickup or delivery.</p>
        <p className="bb-hero__proof"><strong>★ {SITE.rating}</strong> on DoorDash. Delivery arrives ice-packed and fresh.</p>
      </header>
      {menu.sections.map((section) => {
        // Wide art leads its section so the grid packs cleanly.
        const items = [...section.items].sort((a, b) => Number(!!b.art?.wide) - Number(!!a.art?.wide));
        return (
          <section key={section.id} className="section section--tight menu-section" aria-labelledby={`sec-${section.id}`}>
            <div className="wrap">
              <h2 id={`sec-${section.id}`} className="bb-display">{section.title}</h2>
              <div className="bb-grid">
                {items.map((item, i) => <OrderCard key={item.id} item={item} priority={i === 0} />)}
              </div>
            </div>
          </section>
        );
      })}
      <p className="bb-note wrap">
        {menu.source === "toast"
          ? "Menu and availability update live from our register. Prices are pickup prices; + means more sizes are available."
          : "This is our standard menu. Live availability is confirmed at checkout. Prices are pickup prices; + means more sizes are available."}
      </p>
    </div>
  );
}

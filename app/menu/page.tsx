import type { Metadata } from "next";
import { getMenu } from "@/lib/toast/menu";
import { OrderCard } from "@/components/OrderCard";
import { Iris } from "@/components/Deco";
import { MenuTabs } from "@/components/MenuTabs";

export const metadata: Metadata = {
  title: "Menu",
  description: "Organic acai bowls and crafted smoothies at Bomberry in Walnut, CA. Order pickup or delivery.",
};

export const revalidate = 600;

/** Short tab names for the section tabs; falls back to the section title. */
const tabLabel = (title: string) => (/bowl/i.test(title) ? "Açaí Bowls" : /smoothie/i.test(title) ? "Smoothies" : title);

export default async function MenuPage() {
  const menu = await getMenu();
  const tabs = menu.sections.map((s) => ({ id: `sec-${s.id}`, label: tabLabel(s.title) }));
  return (
    <div className="section--rings" style={{ paddingBottom: 96 }}>
      <Iris />
      <h1 className="visually-hidden">Menu</h1>
      <div className="wrap mn-tabs-wrap">
        <MenuTabs tabs={tabs} />
      </div>
      {menu.sections.map((section) => {
        // Wide art leads its section so the grid packs cleanly.
        const items = [...section.items].sort((a, b) => Number(!!b.art?.wide) - Number(!!a.art?.wide));
        return (
          <section key={section.id} id={`sec-${section.id}`} className="section section--tight menu-section" aria-labelledby={`h-${section.id}`}>
            <div className="wrap">
              <h2 id={`h-${section.id}`} className="bb-display">{section.title}</h2>
              <div className="bb-grid bb-grid--compact">
                {items.map((item, i) => <OrderCard key={item.id} item={item} priority={i === 0} cta="Order ahead" />)}
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

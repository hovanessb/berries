"use client";

import { useEffect, useState } from "react";

/**
 * Section tabs for /menu ("Açaí Bowls", "Smoothies"). They jump to each section and
 * underline whichever one is on screen, so the page stays one scrollable list.
 */
export function MenuTabs({ tabs }: { tabs: { id: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => el != null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A section counts as current once its top passes just under the sticky header.
      { rootMargin: "-120px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  return (
    <nav className="mn-tabs" aria-label="Menu sections">
      {tabs.map((t) => (
        <a key={t.id} href={`#${t.id}`} className="mn-tabs__tab" aria-current={active === t.id ? "true" : undefined} onClick={() => setActive(t.id)}>
          {t.label}
        </a>
      ))}
    </nav>
  );
}

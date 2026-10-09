"use client";

import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { usePathname } from "next/navigation";
import { ORDER_URL } from "@/lib/toast/links";
import { HandoffLink } from "./HandoffLink";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/world", label: "World" },
  { href: "/catering", label: "Catering" },
  { href: "/visit", label: "Visit" },
];

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="bb-header">
      <div className="wrap bb-header__bar">
        <Link href="/" className="bb-header__brand" aria-label="Bomberry home">
          <Wordmark />
        </Link>
        <nav className="bb-header__nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--sm hide-sm">Order online</HandoffLink>
        </nav>
      </div>
    </header>
  );
}

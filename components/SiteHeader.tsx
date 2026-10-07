"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ORDER_URL } from "@/lib/toast/links";
import { HandoffLink } from "./HandoffLink";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/visit", label: "Visit" },
];

export function SiteHeader() {
  const path = usePathname();
  return (
    <header className="bb-header">
      <div className="wrap bb-header__bar">
        <Link href="/" className="bb-header__brand" aria-label="Bomberry home">
          <Image src="/brand/bomberry-wordmark.png" alt="Bomberry" width={900} height={205} priority sizes="156px" />
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

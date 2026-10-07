"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * A link that hands the guest to Toast checkout. A cartoon iris closes on Billy
 * ("Sending you to the counter") so leaving the site feels intentional, then
 * Toast opens in the same tab. Cmd/Ctrl/middle-click behave normally.
 */
export function HandoffLink({
  href,
  item,
  className,
  children,
  ...rest
}: { href: string; item?: string; className?: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [sending, setSending] = useState(false);

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setSending(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => window.location.assign(href), reduce ? 50 : 900);
  }

  return (
    <>
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
      {sending && (
        <div className="bb-handoff" role="status" aria-live="polite">
          <div className="bb-handoff__spot">
            <Image src="/brand/billy-circle.webp" alt="" width={720} height={720} sizes="260px" />
          </div>
          <div className="bb-handoff__text">
            <div className="bb-display bb-handoff__title">Sending you to the counter</div>
            {item && <div className="bb-handoff__item">1 × {item}</div>}
            <div className="bb-handoff__note">Checkout and payment are handled securely by Toast.</div>
          </div>
        </div>
      )}
    </>
  );
}

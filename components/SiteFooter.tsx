import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { SITE } from "@/lib/site";
import { HOURS_TEXT } from "@/lib/hours";
import { ORDER_URL } from "@/lib/toast/links";

export function SiteFooter() {
  return (
    <footer className="bb-footer">
      <div className="wrap">
        <div className="bb-footer__grid">
          <div>
            <div className="bb-footer__brand">
              <Wordmark />
            </div>
            <p style={{ marginTop: 12 }}>{SITE.tagline}. Join the delicious resistance.</p>
          </div>
          <div>
            <h2>Visit</h2>
            <p>
              {SITE.address.street}<br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.zip}<br />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
          </div>
          <div>
            <h2>Hours</h2>
            <p>{HOURS_TEXT.map((h) => <span key={h.days}>{h.days} {h.time}<br /></span>)}</p>
          </div>
          <div>
            <h2>Explore</h2>
            <p>
              <Link href="/menu">Menu</Link><br />
              <Link href="/world">Bomberry World</Link><br />
              <Link href="/catering">Catering and events</Link><br />
              <Link href="/visit">Visit</Link>
            </p>
          </div>
          <div>
            <h2>Order</h2>
            <p>
              <a href={ORDER_URL}>Pickup and delivery</a><br />
              Follow Billy on Instagram: <a href={SITE.instagram}>@bomberryworld</a>
            </p>
          </div>
        </div>
        <div className="bb-footer__fine">Online orders and payments are processed by Toast. © {new Date().getFullYear()} Bomberry.</div>
      </div>
    </footer>
  );
}

import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { HOURS_TEXT } from "@/lib/hours";
import { ORDER_URL } from "@/lib/toast/links";
import { HandoffLink } from "@/components/HandoffLink";
import { Iris } from "@/components/Deco";

export const metadata: Metadata = {
  title: "Visit",
  description: "Bomberry, 1223 N Grand Ave, Walnut, CA 91789. Open Mon–Fri 7am–9pm, Sat–Sun 10am–7pm.",
};

export default function VisitPage() {
  return (
    <>
      <div className="section--rings">
        <Iris />
        <header className="bb-pagehead wrap">
          <h1 className="bb-display">Visit</h1>
          <p>Red booths, a checker floor and the counter where every bowl gets built. Come sit in, or grab it to go.</p>
        </header>
      </div>
      <section className="section section--cream">
        <div className="wrap bb-visit">
          <div>
            <h2 className="bb-display bb-visit__title">Hours and info</h2>
            <dl>
              <dt>Where</dt>
              <dd>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.region} {SITE.address.zip}</dd>
              {HOURS_TEXT.map((h) => (
                <Fragment key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></Fragment>
              ))}
              <dt>Call</dt>
              <dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd>
              <dt>Get it</dt>
              <dd>Dine in, pickup or delivery</dd>
            </dl>
            <div className="bb-hero__ctas">
              <HandoffLink href={ORDER_URL} className="bb-btn">Order ahead</HandoffLink>
              <a href={SITE.mapUrl} className="bb-btn bb-btn--ink">Get directions</a>
            </div>
            <p className="bb-visit__note"><strong>★ {SITE.rating}</strong> on DoorDash. Delivery arrives ice-packed and fresh.</p>
          </div>
          <iframe
            className="bb-map"
            title="Map to Bomberry, 1223 N Grand Ave, Walnut, CA"
            src="https://www.google.com/maps?q=1223+N+Grand+Ave,+Walnut,+CA+91789&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="wrap">
          <div className="bb-wide-photo">
            <Image src="/shop/counter-sign.webp" alt="The Bomberry counter: white wave tile, raised letters and the checker floor" width={1600} height={763} sizes="(min-width: 1180px) 1116px, 100vw" />
          </div>
        </div>
      </section>
    </>
  );
}

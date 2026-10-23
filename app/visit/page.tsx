import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { HOURS_TEXT } from "@/lib/hours";
import { ORDER_URL } from "@/lib/toast/links";
import { HandoffLink } from "@/components/HandoffLink";

export const metadata: Metadata = {
  title: "Visit",
  description: "Bomberry, 1223 N Grand Ave, Walnut, CA 91789, right by Mt. SAC. Open Mon–Fri 7am–9pm, Sat–Sun 10am–7pm.",
};

export default function VisitPage() {
  return (
    <>
      {/* ===== Come on in ===== */}
      <section className="vs-hero">
        <div className="vs-hero__copy">
          <p className="vs-hero__kicker">Walnut, California</p>
          <h1 className="bb-display vs-hero__title">Come<br />on in.</h1>
          <p>Red booths, a checker floor and Bomberry World painted on every wall, right by Mt. SAC. Come sit in, or grab it to go.</p>
          <div className="vs-hero__ctas">
            <a href={SITE.mapUrl} className="bb-btn bb-btn--cream">Get directions</a>
            <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--line">Order ahead</HandoffLink>
          </div>
        </div>
        <div className="vs-hero__photo">
          <Image src="/shop/counter-sign.webp" width={1600} height={763} alt="The Bomberry counter: raised white letters on wave tile, red subway tile above and a black-and-white checker floor" priority sizes="(min-width: 900px) 56vw, 100vw" />
        </div>
      </section>
      <div className="checker-ink" aria-hidden="true" />

      {/* ===== Find us ===== */}
      <section className="section paper" aria-labelledby="find">
        <div className="wrap vs-find">
          <div>
            <h2 id="find" className="bb-display vs-find__title">Find us in Walnut.</h2>
            <address className="vs-find__addr">
              {SITE.address.street}<br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.zip}
            </address>
            <p className="vs-find__near">Right by Mt. SAC.</p>
            <table className="vs-hours">
              <caption className="visually-hidden">Opening hours</caption>
              <tbody>
                {HOURS_TEXT.map((h) => (
                  <tr key={h.days}><th scope="row">{h.days}</th><td>{h.time}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="vs-find__phone"><a href={SITE.phoneHref}>{SITE.phone}</a></p>
            <a href={SITE.mapUrl} className="bb-btn vs-find__btn">Get directions</a>
          </div>
          <iframe
            className="vs-map"
            title="Map to Bomberry, 1223 N Grand Ave, Walnut, CA"
            src="https://www.google.com/maps?q=1223+N+Grand+Ave,+Walnut,+CA+91789&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ===== Stay a while ===== */}
      <section className="vs-band" aria-labelledby="stay">
        <div className="wrap vs-band__inner">
          <div>
            <h2 id="stay" className="bb-display vs-band__title">Stay a while. Or take it to go.</h2>
            <p>Dine in or order ahead for pickup.</p>
          </div>
          <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--cream">Order ahead</HandoffLink>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LANDS, HOME, PLATEAU } from "@/lib/world";
import { ORDER_URL } from "@/lib/toast/links";
import { SITE } from "@/lib/site";
import { HandoffLink } from "@/components/HandoffLink";
import { CheckerBand } from "@/components/Deco";

export const metadata: Metadata = {
  title: "Bomberry World",
  description:
    "The Process Plateau has processed the world. Billy the Bomberry is leading the rebellion. Explore the map painted on our walls and pick a side.",
  openGraph: { images: [{ url: "/world/og-world.jpg", width: 1200, height: 630, alt: "The map of Bomberry World" }] },
};

const pins = [
  { id: HOME.id, name: HOME.name, ...HOME.pin },
  ...LANDS.map((l) => ({ id: l.id, name: `${l.name}, ruled by ${l.boss}`, ...l.pin })),
  { id: PLATEAU.id, name: PLATEAU.name, ...PLATEAU.pin },
];

export default function WorldPage() {
  return (
    <div className="bb-world">
      <header className="bb-world__head wrap">
        <h1 className="bb-display">Bomberry World</h1>
        <p>
          A 1920s cartoon world painted across every wall of our shop. The Process Plateau, an empire of processed food,
          has invaded and processed nearly everything in it. Billy the Bomberry is leading the rebellion.
        </p>
      </header>

      <div className="wrap bb-map-scroll">
        <figure className="bb-map-art">
          <Image
            src="/world/map.webp"
            width={2400}
            height={1440}
            alt="The map of Bomberry World: Fruit Falls, Ice Cream Peaks, Soda Seas, Grease Fields, Donut Dunes and the Process Plateau factory"
            sizes="(min-width: 1180px) 1116px, 100vw"
            priority
          />
          {pins.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="bb-pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={`Jump to ${p.name}`}>
              <span aria-hidden="true" />
            </a>
          ))}
          <figcaption>Tap a pin to visit that land<span className="bb-map-swipe">. Swipe to explore</span></figcaption>
        </figure>
      </div>

      <section id={HOME.id} className="bb-land bb-land--home">
        <div className="wrap bb-land__grid">
          <div className="bb-land__art bb-land__art--plain">
            <Image src={HOME.art.src} width={HOME.art.width} height={HOME.art.height} alt={HOME.art.alt} sizes="(min-width: 900px) 420px, 70vw" />
          </div>
          <div className="bb-land__copy">
            <h2 className="bb-display">{HOME.name}</h2>
            <p className="bb-land__boss">Home of Billy the Bomberry</p>
            <p>{HOME.story}</p>
            <p>
              Billy&apos;s rule is simple: no shortcuts, ever. So everything that goes in a Bomberry bowl is made in our kitchen,
              from the Bombtella and nut butters to the almond milk, coconut milk and coconut whip.
            </p>
          </div>
        </div>
      </section>

      <section id={PLATEAU.id} className="bb-land bb-land--plateau">
        <div className="wrap">
          <h2 className="bb-display">{PLATEAU.name}</h2>
          <p className="bb-land__boss">The empire of processed food</p>
          <div className="bb-plateau">
            <figure>
              <Image src="/world/plateau-poster.webp" width={1000} height={1323} alt="A Process Plateau propaganda poster: Fruit get better when they visit Process Plateau" sizes="(min-width: 760px) 40vw, 90vw" />
              <figcaption>Their posters are everywhere.</figcaption>
            </figure>
            <figure>
              <Image src="/world/inside-factory.webp" width={1000} height={1322} alt="Inside the Process Plateau factory: tanks of preservatives, colour dyes and conveyor belts" sizes="(min-width: 760px) 40vw, 90vw" />
              <figcaption>What actually happens inside.</figcaption>
            </figure>
          </div>
          <p className="bb-plateau__text">
            “Fruit get better when they visit Process Plateau,” say the posters. They don&apos;t. Fruit goes in fresh and comes out
            dyed, preserved and shelf-stable for a decade. Four bosses hold the lands around the factory. Billy is taking them
            back one at a time.
          </p>
        </div>
      </section>

      {LANDS.map((land, i) => (
        <section key={land.id} id={land.id} className={`bb-land${i % 2 ? " bb-land--flip" : ""}`}>
          <div className="wrap bb-land__grid">
            <div className="bb-land__art">
              <Image src={land.art.src} width={land.art.width} height={land.art.height} alt={land.art.alt} sizes="(min-width: 900px) 600px, 100vw" />
            </div>
            <div className="bb-land__copy">
              <h2 className="bb-display">{land.name}</h2>
              <p className="bb-land__boss">Ruled by {land.boss}</p>
              <p>{land.story}</p>
              {land.henchmen && (
                <>
                  <h3 className="bb-land__label">Henchmen</h3>
                  <ul className="bb-land__crew">
                    {land.henchmen.map((h) => <li key={h} className="bb-sticker">{h}</li>)}
                  </ul>
                </>
              )}
              {land.counter && (
                <div className="bb-counter">
                  <h3 className="bb-land__label">Billy sends in</h3>
                  <p><strong>{land.counter.item}.</strong> {land.counter.line}</p>
                  <Link href="/menu" className="bb-btn bb-btn--sm">See it on the menu</Link>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <CheckerBand />

      <section className="bb-side">
        <div className="wrap">
          <h2 className="bb-display">Pick a side</h2>
          <div className="bb-side__grid">
            <div className="bb-side__card bb-side__card--billy">
              <Image src="/brand/billy-ball.webp" width={480} height={413} alt="" sizes="140px" />
              <h3 className="bb-display">The delicious resistance</h3>
              <p>Real fruit, made-from-scratch everything, and a booth with your name on it.</p>
              <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--cream">Start an order</HandoffLink>
            </div>
            <div className="bb-side__card bb-side__card--plateau">
              <h3 className="bb-display">The Process Plateau</h3>
              <p>Ten-year shelf life, artificial everything, and a coupon stapled to the bag.</p>
              <p className="bb-side__nope">Yeah, we didn&apos;t think so.</p>
            </div>
          </div>
          <p className="bb-side__visit">
            See the whole world up close on our walls at {SITE.address.street}, right by Mt. SAC. <Link href="/visit">Plan a visit</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

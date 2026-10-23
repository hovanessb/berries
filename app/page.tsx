import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/toast/menu";
import { getOrderingOpen } from "@/lib/toast/availability";
import { ORDER_URL } from "@/lib/toast/links";
import { FEATURED } from "@/lib/seed-menu";
import { isMorning, HOURS_TEXT } from "@/lib/hours";
import { photoFor } from "@/lib/photos";
import { getReviews } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import { HandoffLink } from "@/components/HandoffLink";
import { Price } from "@/components/OrderCard";
import { Iris } from "@/components/Deco";

export const revalidate = 600;

const MADE_IN_HOUSE = ["Bombtella", "Peanut butter", "Almond butter", "Almond milk", "Coconut milk", "Coconut whip"];

export default async function Home() {
  const [menu, reviews, open] = await Promise.all([getMenu(), getReviews(), getOrderingOpen()]);

  // Three cravings: Toast's featured items first (breakfast ones before 11am), only those we have photos for.
  const available = menu.sections.flatMap((s) => s.items).filter((i) => !i.soldOut && photoFor(i.name));
  const order = isMorning() ? ["billy's breakfast", "the heavy hitter", "bombtella bowl"] : [...FEATURED, "billy's breakfast", "bomberry classic"];
  const cravings = [
    ...order.map((n) => available.find((i) => i.name.toLowerCase() === n)),
    ...available,
  ].filter((i, idx, all) => i && all.indexOf(i) === idx).slice(0, 3) as typeof available;

  const { rating } = reviews;
  const reviewsHref = reviews.googleUri ?? SITE.mapUrl;

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hx">
        <Iris />
        <div className="wrap hx__grid">
          <div className="hx__copy">
            <p className="hx__kicker">Acai bowls &amp; smoothies</p>
            <h1 className="bb-display hx__title"><span>House-made.</span> <span>Crave-worthy.</span></h1>
            <p className="hx__sub">We make our own toppings, blend smoothies without ice filler, and serve it all in a world we created from scratch.</p>
            <div className="hx__ctas">
              <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--white">Order pickup</HandoffLink>
              <Link href="/menu" className="bb-btn bb-btn--line">See the menu</Link>
            </div>
            <p className="hx__stars">
              <span className="hx__starrow" aria-hidden="true">{"★".repeat(Math.round(Number(rating.value)) || 5)}</span>
              <span>{rating.value} stars {rating.label}</span>
            </p>
            <a href="#reviews" className="hx__link">See what people are saying →</a>
            <p className="hx__where">
              <span className={open ? "hx__open" : "hx__closed"}>{open ? "Open now" : "Closed now"}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
              <span>{SITE.address.city}, {SITE.address.region}</span>
              <span aria-hidden="true">•</span>
              <span>{SITE.address.street}</span>
            </p>
          </div>
          <div className="hx__bowl">
            <div className="hx__plate">
              <Image src="/photos/hero-classic.webp" width={900} height={900} alt="A Bomberry Classic: acai topped with strawberries, blueberries, banana and coconut in a red Bomberry cup" priority sizes="(min-width: 900px) 460px, 76vw" />
            </div>
          </div>
        </div>
      </section>
      <div className="checker-ink" aria-hidden="true" />

      {/* ===== Meet your next craving ===== */}
      <section className="section paper" aria-labelledby="cravings">
        <div className="wrap">
          <h2 id="cravings" className="bb-display hx-title">Meet your next craving.</h2>
          <ul className="cravings">
            {cravings.map((item) => {
              const photo = photoFor(item.name)!;
              return (
                <li key={item.id} className="craving">
                  <div className="craving__photo">
                    <Image src={photo.src} width={photo.width} height={photo.height} alt={item.name} sizes="(min-width: 900px) 340px, 72vw" />
                  </div>
                  <h3 className="bb-display craving__name">{item.name}</h3>
                  <p className="craving__blurb">{photo.blurb}</p>
                  <div className="craving__foot">
                    <Price item={item} />
                    <HandoffLink href={item.orderUrl} item={item.name} className="bb-btn bb-btn--sq" aria-label={`Order ${item.name} on Toast`}>Order</HandoffLink>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="cravings__more"><Link href="/menu" className="hx-link">Explore the full menu →</Link></p>
        </div>
      </section>

      {/* ===== Made in our kitchen ===== */}
      <section className="paper kitchen-wrap" aria-labelledby="kitchen">
        <div className="wrap kitchen">
          <div className="kitchen__photo">
            <Image src="/photos/bombtella-closeup.webp" width={1200} height={720} alt="House-made Bombtella with flaky salt on an acai bowl" sizes="(min-width: 900px) 640px, 100vw" />
          </div>
          <div className="kitchen__copy">
            <p className="kicker-red">Made in our kitchen</p>
            <h2 id="kitchen" className="bb-display kitchen__title">House-made.<br />You can taste it.</h2>
            <p>Our Bombtella hazelnut spread, nut butters, milks and coconut whip are made right here in our kitchen.</p>
            <h3 className="kitchen__label">Made in our kitchen</h3>
            <ul className="kitchen__list">
              {MADE_IN_HOUSE.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="paper rv-wrap" aria-labelledby="reviews-title">
        <div className="wrap rv">
          <div className="rv__head">
            <h2 id="reviews-title" className="bb-display rv__title">Reviews.</h2>
            <div className="rv__score">
              <p><span className="bb-display">{rating.value}</span> <span className="rv__stars" aria-hidden="true">{"★".repeat(Math.round(Number(rating.value)) || 5)}</span></p>
              <p className="rv__count">{rating.label.startsWith("from ") ? rating.label.slice(5) : `Rated ${rating.label}`}</p>
            </div>
          </div>
          <div className={`rv__grid rv__grid--${Math.min(reviews.reviews.length, 3)}`}>
            {reviews.reviews.slice(0, 3).map((r, i) => (
              <figure key={r.id} className={`rv__item${i === 0 ? " rv__item--lead" : ""}`}>
                <div className="rv__stars" role="img" aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}</div>
                <blockquote className={i === 0 ? "bb-display" : undefined}>“{r.quote}”</blockquote>
                <figcaption>
                  {r.href ? <a href={r.href} target="_blank" rel="noopener">{r.name}</a> : r.name}
                  <span>{r.source === "google" ? "Google" : "DoorDash"}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="rv__cta">
            <a href={reviewsHref} className="bb-btn" target="_blank" rel="noopener">Read Google reviews →</a>
          </p>
        </div>
      </section>

      {/* ===== Pull up a booth ===== */}
      <section className="booth" aria-labelledby="booth">
        <div className="wrap booth__grid">
          <div className="booth__photo">
            <Image src="/shop/booths.webp" width={1400} height={934} alt="Inside Bomberry: red booths, cartoon murals and a black-and-white checker floor" sizes="(min-width: 900px) 560px, 100vw" />
          </div>
          <div className="booth__copy">
            <h2 id="booth" className="bb-display hx-title hx-title--left">Pull up a booth.</h2>
            <p>{SITE.address.street}, {SITE.address.city}</p>
            <p>{HOURS_TEXT.map((h) => `${h.days} ${h.time.replace(/ /g, "")}`).join(" • ")}</p>
            <div className="booth__ctas">
              <a href={SITE.mapUrl} className="bb-btn bb-btn--white bb-btn--sq">Get directions</a>
            </div>
            <Link href="/world" className="hx-link hx-link--light">Explore Bomberry World →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

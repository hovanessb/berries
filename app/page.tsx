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
import { ReviewMarquee } from "@/components/ReviewSlip";
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
  const fromGoogle = Boolean(reviews.googleUri);
  const reviewsHref = reviews.googleUri ?? SITE.mapUrl;

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hx">
        <Iris />
        <div className="wrap hx__grid">
          <div className="hx__copy">
            <p className="hx__kicker">Acai bowls &amp; smoothies</p>
            <h1 className="bb-display hx__title">One bite.<br />Boom.</h1>
            <p className="hx__sub">Fresh fruit. House-made spreads. Seriously good bowls.</p>
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
              <Image src="/photos/bombtella-hero.webp" width={1000} height={1000} alt="A Bombtella Bowl: acai with house-made Bombtella drizzle, strawberries and banana in a red Bomberry cup" priority sizes="(min-width: 900px) 460px, 76vw" />
            </div>
            <Image className="hx__billy" src="/brand/billy-full.webp" width={520} height={456} alt="" sizes="(min-width: 900px) 170px, 120px" />
          </div>
        </div>
      </section>
      <div className="checker-red" aria-hidden="true" />

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
                    <Image src={photo.src} width={640} height={640} alt={`${item.name} in a red Bomberry cup`} sizes="(min-width: 900px) 340px, 72vw" />
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

      {/* ===== No shortcuts ===== */}
      <section className="shortcuts paper" aria-labelledby="shortcuts">
        <div className="shortcuts__photo">
          <Image src="/photos/bombtella-closeup.webp" width={1200} height={720} alt="Close-up of house-made Bombtella with flaky salt on an acai bowl" sizes="(min-width: 900px) 55vw, 100vw" />
        </div>
        <div className="shortcuts__copy">
          <h2 id="shortcuts" className="bb-display hx-title hx-title--left">No shortcuts. Ever.</h2>
          <p>We make our Bombtella, nut butters, milks and coconut whip in our own kitchen.</p>
          <ul className="chips">
            {MADE_IN_HOUSE.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="section paper reviews" aria-labelledby="reviews-title">
        <div className="wrap">
          <h2 id="reviews-title" className="bb-display hx-title">
            {fromGoogle ? `${rating.value} stars. ${rating.label.replace(/^from /, "")}.` : `${rating.value} stars. One Bomberry.`}
          </h2>
          <p className="reviews__sub">{fromGoogle ? "See what people are saying on Google." : "Here's what people are saying."}</p>
        </div>
        <ReviewMarquee reviews={reviews.reviews} />
        <p className="reviews__cta">
          <a href={reviewsHref} className="bb-btn bb-btn--sq" target="_blank" rel="noopener">Read Google reviews</a>
        </p>
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

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/toast/menu";
import { ORDER_URL } from "@/lib/toast/links";
import { FEATURED } from "@/lib/seed-menu";
import { isMorning, HOURS_TEXT } from "@/lib/hours";
import { SITE } from "@/lib/site";
import { HandoffLink } from "@/components/HandoffLink";
import { OrderCard } from "@/components/OrderCard";
import { ReviewMarquee } from "@/components/ReviewSlip";
import { getReviews } from "@/lib/reviews";
import { CheckerBand, Iris } from "@/components/Deco";

export const revalidate = 600;

export default async function Home() {
  const [menu, reviews] = await Promise.all([getMenu(), getReviews()]);
  const all = menu.sections.flatMap((s) => s.items).filter((i) => !i.soldOut);
  const morning = isMorning();
  // Before 11am lead with breakfast; otherwise Toast's featured items. Bombtella's wide art leads when it's in.
  const order = morning ? ["billy's breakfast", "the heavy hitter", "bomberry classic"] : FEATURED;
  const featured = order.map((n) => all.find((i) => i.name.toLowerCase() === n)).filter((i) => i != null);
  const picks = (featured.length >= 3 ? featured : all).slice(0, 3).sort((a, b) => Number(!!b.art?.wide) - Number(!!a.art?.wide));

  return (
    <>
      <section className="bb-hero">
        <Iris />
        <div className="wrap bb-hero__grid">
          <div className="bb-hero__copy">
            <h1 className="bb-display bb-hero__title">{SITE.tagline}</h1>
            <p className="bb-hero__sub">
              Acai bowls and smoothies with everything made in-house, from the Bombtella to the coconut whip. Welcome to the delicious resistance.
            </p>
            <div className="bb-hero__ctas">
              <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--cream">Start an order</HandoffLink>
              <Link href="/menu" className="bb-btn bb-btn--line">See the menu</Link>
            </div>
            <p className="bb-hero__proof"><strong>★ {SITE.rating}</strong> on DoorDash, with pickup and delivery</p>
          </div>
          <div className="bb-spot">
            <Image src="/brand/billy-circle.webp" alt="Billy, the Bomberry berry, marching in with a fist in the air" width={720} height={720} priority sizes="(min-width: 900px) 520px, 70vw" />
          </div>
        </div>
      </section>

      <CheckerBand />

      <section className="section section--rings" aria-labelledby="favorites">
        <Iris />
        <div className="wrap">
          <h2 id="favorites" className="bb-display section-title">{morning ? "Breakfast's ready" : "Fan favorites"}</h2>
          <div className="bb-grid bb-grid--feature">
            {picks.map((item, i) => <OrderCard key={item.id} item={item} priority={i === 0} />)}
          </div>
          <div className="bb-more">
            <Link href="/menu" className="bb-btn bb-btn--cream">See all {all.length} items</Link>
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="story">
        <div className="wrap bb-story">
          <div className="bb-story__billy">
            <Image src="/brand/billy-outline.webp" width={600} height={536} alt="" sizes="(min-width: 900px) 380px, 60vw" />
          </div>
          <div>
            <h2 id="story" className="bb-display section-title">No shortcuts, ever</h2>
            <p>
              Two brothers noticed that food that&apos;s good for you is usually boring, and food that&apos;s fun is usually junk.
              So they built Bomberry: a short menu done properly, inside a world of its own.
            </p>
            <h3 className="bb-story__label">Made in our kitchen</h3>
            <ul className="bb-story__list">
              {["Bombtella", "Peanut butter", "Almond butter", "Almond milk", "Coconut milk", "Coconut whip"].map((x) => (
                <li key={x} className="bb-sticker">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bb-teaser" aria-labelledby="world">
        <Link href="/world" className="bb-teaser__link">
          <Image src="/world/map.webp" width={2400} height={1440} alt="" sizes="100vw" className="bb-teaser__img" />
          <span className="bb-teaser__copy wrap">
            <span id="world" className="bb-display bb-teaser__title">Pick a side</span>
            <span className="bb-teaser__text">The Process Plateau has processed the world. Billy is leading the rebellion. Explore Bomberry World.</span>
            <span className="bb-btn bb-btn--cream">Enter Bomberry World</span>
          </span>
        </Link>
      </section>

      <section className="section section--cream" aria-labelledby="reviews">
        <div className="wrap">
          <h2 id="reviews" className="bb-display section-title">Word from the booths</h2>
        </div>
        <ReviewMarquee reviews={reviews.reviews} />
        <div className="wrap">
          <p className="bb-rating">
            <strong>★ {reviews.rating.value}</strong> {reviews.rating.label}. Delivery arrives ice-packed and fresh.
            {reviews.googleUri && <> <a href={reviews.googleUri} rel="noopener" target="_blank">Read more on Google</a></>}
          </p>
        </div>
      </section>

      <CheckerBand />

      <section className="section section--cream" aria-labelledby="visit-home">
        <div className="wrap bb-visit">
          <div className="bb-visit__photo">
            <Image src="/shop/booths.webp" alt="Inside Bomberry: red booths, cartoon murals and a black-and-white checker floor" width={1400} height={934} sizes="(min-width: 760px) 50vw, 100vw" />
          </div>
          <div>
            <h2 id="visit-home" className="bb-display bb-visit__title">Pull up a booth</h2>
            <dl>
              <dt>Where</dt>
              <dd>{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.zip}</dd>
              {HOURS_TEXT.map((h) => (
                <Fragment key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></Fragment>
              ))}
              <dt>Call</dt>
              <dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd>
            </dl>
            <div className="bb-hero__ctas">
              <HandoffLink href={ORDER_URL} className="bb-btn">Order pickup</HandoffLink>
              <a href={SITE.mapUrl} className="bb-btn bb-btn--ink">Get directions</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

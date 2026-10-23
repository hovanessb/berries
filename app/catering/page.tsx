import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { getReviews } from "@/lib/reviews";
import { Iris, CheckerBand } from "@/components/Deco";
import { ReviewMarquee } from "@/components/ReviewSlip";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Catering and events",
  description:
    "Bring Bomberry to your party, campus event, office or team. Acai bowls and smoothies with everything made in-house. Request a quote.",
  openGraph: { images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Bomberry smoothies lined up" }] },
};

export const revalidate = 3600;

const STEPS = [
  { title: "Inquire", text: "Tell us the date, the place, how many people and what you're celebrating." },
  { title: "Reserve", text: "We send a quote. Pay the deposit and the date is yours." },
  { title: "Enjoy", text: "We show up early, set up, and keep the bowls and smoothies coming." },
];

const INCLUDED = [
  { title: "Built fresh, on the spot", text: "Acai bowls and smoothies made to order, so nothing sits around getting sad." },
  { title: "Made in-house", text: "The same Bombtella, nut butters, almond and coconut milks and coconut whip we make for the shop." },
  { title: "A focused menu", text: "A short list of our best, chosen with you for your crowd and your timing." },
  { title: "Our crew", text: "The people who build bowls at the counter every day, handling setup to clean-up." },
];

const FOR = ["Birthdays and parties", "Mt. SAC clubs and campus events", "Office and team lunches", "Sports teams", "Weddings and showers", "School events"];

export default async function CateringPage() {
  const reviews = await getReviews();
  return (
    <>
      <section className="ct-hero paper">
        <div className="wrap ct-hero__grid">
          <div>
            <p className="kicker-red kicker-red--wide">Catering</p>
            <h1 className="bb-display ct-hero__title">Bring Bomberry to your event.</h1>
            <p className="ct-hero__sub">Açaí bowls and smoothies for parties, campus events, offices and teams around Walnut and the San Gabriel Valley.</p>
            <div className="ct-hero__ctas">
              <a href="#quote" className="bb-btn">Request a quote</a>
              <a href={SITE.phoneHref} className="ct-hero__call">Call {SITE.phone}</a>
            </div>
          </div>
          <div className="ct-hero__bowls">
            <Image src="/photos/cutout-bowls.webp" width={1200} height={637} alt="Four Bomberry acai bowls: Bombtella, Billy's Breakfast, Bomberry Classic and Tropic Boom" priority sizes="(min-width: 900px) 640px, 100vw" />
          </div>
        </div>
      </section>

      <CheckerBand />

      <section className="section section--cream" aria-labelledby="how">
        <div className="wrap">
          <h2 id="how" className="bb-display section-title">How it works</h2>
          <ol className="bb-steps">
            {STEPS.map((s) => (
              <li key={s.title}>
                <h3 className="bb-display">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--rings" aria-labelledby="included">
        <Iris />
        <div className="wrap">
          <h2 id="included" className="bb-display section-title">What you get</h2>
          <div className="bb-included">
            {INCLUDED.map((x) => (
              <div key={x.title} className="bb-included__item">
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            ))}
          </div>
          <div className="bb-gallery">
            <Image src="/events/smoothie-lineup.webp" width={1200} height={800} alt="Five Bomberry smoothies in a row, each cup with Billy's face" sizes="(min-width: 760px) 50vw, 100vw" />
            <Image src="/events/bowls-four.webp" width={1200} height={800} alt="Four acai bowls in red Bomberry cups" sizes="(min-width: 760px) 50vw, 100vw" />
          </div>
          <h3 className="bb-for__title">Good for</h3>
          <ul className="bb-for">
            {FOR.map((f) => <li key={f} className="bb-sticker">{f}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="ev-reviews">
        <div className="wrap">
          <h2 id="ev-reviews" className="bb-display section-title">Word from the booths</h2>
        </div>
        <ReviewMarquee reviews={reviews.reviews} />
      </section>

      <CheckerBand />

      <section id="quote" className="section section--cream" aria-labelledby="quote-title">
        <div className="wrap bb-quote">
          <div>
            <h2 id="quote-title" className="bb-display section-title">Request a quote</h2>
            <p>Tell us about your event and we&apos;ll get back to you with availability and a quote. The more detail, the better the plan.</p>
          </div>
          <InquiryForm phone={SITE.phone} phoneHref={SITE.phoneHref} />
        </div>
      </section>
    </>
  );
}

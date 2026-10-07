import "server-only";
import { SITE } from "./site";

export interface Review {
  id: string;
  quote: string;
  name: string;
  /** Link to the review or the author's profile, when the source provides one. */
  href?: string;
  /** e.g. "2 weeks ago" */
  when?: string;
  /** 1–5 stars. */
  stars: number;
  source: "google" | "doordash";
}

export interface ReviewData {
  reviews: Review[];
  /** The rating shown under the reviews. */
  rating: { value: string; label: string };
  /** Google requires attribution when its reviews are shown. */
  googleUri?: string;
}

/** How often to pull fresh reviews from Google, in seconds. */
export const REVIEWS_REVALIDATE = 3600;

const KEY = process.env.GOOGLE_PLACES_API_KEY || "";
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "";

interface GooglePlace {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name: string;
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text: string };
    originalText?: { text: string };
    authorAttribution?: { displayName?: string; uri?: string };
    googleMapsUri?: string;
  }[];
}

const curated: Review[] = SITE.reviews.map((r) => ({ id: `dd-${r.name}`, quote: r.quote, name: r.name, stars: 5, source: "doordash" }));

const fallback: ReviewData = {
  reviews: curated,
  rating: { value: SITE.rating, label: "on DoorDash" },
};

/**
 * Recent Google reviews (Places API, up to 5, 4★ and up) plus our curated DoorDash quotes.
 * Cached for REVIEWS_REVALIDATE seconds; POST /api/revalidate refreshes them immediately.
 * Without GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID, or if Google fails, the curated quotes show.
 */
export async function getReviews(): Promise<ReviewData> {
  if (!KEY || !PLACE_ID) return fallback;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`, {
      headers: {
        "X-Goog-Api-Key": KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: REVIEWS_REVALIDATE, tags: ["reviews"] },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}`);
    const place = (await res.json()) as GooglePlace;

    const google: Review[] = (place.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4)
      .map((r) => ({
        id: r.name,
        quote: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        name: r.authorAttribution?.displayName ?? "Google reviewer",
        href: r.googleMapsUri ?? r.authorAttribution?.uri,
        when: r.relativePublishTimeDescription,
        stars: Math.round(r.rating ?? 5),
        source: "google" as const,
      }))
      .filter((r) => r.quote.length > 0);

    return {
      reviews: [...google, ...curated],
      rating: place.rating
        ? { value: place.rating.toFixed(1), label: `from ${place.userRatingCount ?? "many"} Google reviews` }
        : fallback.rating,
      googleUri: google.length ? place.googleMapsUri : undefined,
    };
  } catch (err) {
    console.error("[reviews] Google Places failed, showing curated quotes", err);
    return fallback;
  }
}

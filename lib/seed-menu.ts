import type { MenuData } from "./toast/types";
import { itemOrderUrl } from "./toast/links";
import { artFor } from "./art";

/**
 * Fallback menu, copied from Bomberry's Toast online ordering page (Oct 2026).
 * Used until Toast API credentials are added, or if Toast is unreachable.
 * Prices are Toast pickup prices; "+" means size options change the price.
 */
/**
 * Stickers are a site decision, not Toast data. Keyed by lowercase item name. At most one per card.
 * The Heavy Hitter has none: its designer art already shouts "50g of protein!".
 */
export const STICKERS: Record<string, string> = {
  "nutty knockout": "House-made PB",
  "bombtella bowl": "Fan favorite",
  "billy's breakfast": "Fan favorite",
};

const item = (
  name: string,
  description: string,
  price: number,
  priceFrom: boolean,
  opts: { guid?: string; sticker?: string } = {},
) => ({
  id: opts.guid ?? name,
  name,
  description,
  price,
  priceFrom,
  soldOut: false,
  orderUrl: itemOrderUrl(name, opts.guid),
  sticker: opts.sticker ?? STICKERS[name.toLowerCase()],
  art: artFor(name),
});

export const SEED_MENU: MenuData = {
  source: "seed",
  sections: [
    {
      id: "bowls",
      title: "Signature Acai Bowls",
      items: [
        item("Bomberry Classic", "Organic Acai, OG Granola, Banana, Strawberry, Blueberry, Organic Unsweetened Coconut, Honey", 12.5, true),
        item("Billy's Breakfast", "Organic Acai, Original Granola, Chia Pudding, Maple Cold Oats, Organic Toasted Coconut, Banana, Strawberry, House-Made Almond Butter, Organic Date Syrup", 14.5, true),
        item("Bombtella Bowl", "Organic Acai, Original Granola, Banana, Strawberry, Unsweetened Coconut Shreds, Honey, Bombtella, Maldon Salt", 14, true),
        item("Tropic Boom", "Organic Acai, OG Granola, Mango, Pineapple, Kiwi, Unsweetened Coconut Shreds, Honey", 13, true),
        item("Nutty Knockout", "Organic Acai, Original Granola, Double House-Made Peanut Butter, Banana, Organic Cacao Nibs, Honey", 13.5, true),
      ],
    },
    {
      id: "smoothies",
      title: "Crafted Smoothies",
      items: [
        item("Strawberry Smash", "Whole Milk, Strawberry, Banana, Dates, Organic Agave", 10, false),
        item("Baja Blitz", "House-Made Coconut Milk, Mango, Pineapple, Banana, Organic Blue Spirulina, Organic Agave", 10, false),
        item("The Heavy Hitter", "Whole Milk, House-Made Peanut Butter, Banana, Whey Protein, Organic Maple, Organic Vanilla", 12.5, false),
        item("Midnight Ube", "Whole Milk, Ube Base, Banana, Organic Maple", 10, false, { guid: "2d558960-b1aa-458b-9a56-b5cdb2599751" }),
        item("Mango Mayhem", "Organic Coconut Water, Mango, Passionfruit Base, Agave", 10, false),
      ],
    },
  ],
};

/** The three items Toast lists as Featured — shown first on the home page. */
export const FEATURED = ["bombtella bowl", "nutty knockout", "the heavy hitter"];

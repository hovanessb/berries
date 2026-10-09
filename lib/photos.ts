/**
 * Clean product photos (from Photos/, cropped square) and one-line blurbs for the
 * home page's "Meet your next craving". Keyed by lowercase item name. Blurbs only
 * use what the menu says is in the item.
 */
export interface ItemPhoto {
  src: string;
  blurb: string;
}

export const ITEM_PHOTOS: Record<string, ItemPhoto> = {
  "bombtella bowl": { src: "/photos/bombtella-bowl.webp", blurb: "Our house-made Bombtella with strawberry, banana and a pinch of Maldon salt." },
  "the heavy hitter": { src: "/photos/the-heavy-hitter.webp", blurb: "House-made peanut butter, banana and whey. 50g of protein." },
  "billy's breakfast": { src: "/photos/billys-breakfast.webp", blurb: "Chia pudding, maple cold oats and house-made almond butter." },
  "bomberry classic": { src: "/photos/bomberry-classic.webp", blurb: "The one that started it: strawberry, blueberry, banana and honey." },
  "tropic boom": { src: "/photos/tropic-boom.webp", blurb: "Mango, pineapple and kiwi over organic acai." },
};

export const photoFor = (name: string): ItemPhoto | undefined => ITEM_PHOTOS[name.toLowerCase().replace(/’/g, "'")];

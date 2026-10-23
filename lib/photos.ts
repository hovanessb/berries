/**
 * Transparent product cutouts ("Product images/Isolated *.png") and one-line blurbs
 * for the home page's "Meet your next craving". Keyed by lowercase item name.
 * Blurbs only use what the menu and the brand say is in the item.
 */
export interface ItemPhoto {
  src: string;
  width: number;
  height: number;
  blurb: string;
}

export const ITEM_PHOTOS: Record<string, ItemPhoto> = {
  "bombtella bowl": { src: "/photos/cutout-bombtella.webp", width: 640, height: 572, blurb: "Our house-made Bombtella with strawberry, banana and a pinch of Maldon salt." },
  "the heavy hitter": { src: "/photos/cutout-heavy-hitter.webp", width: 516, height: 640, blurb: "House-made peanut butter, banana and whey. 50g of protein." },
  "billy's breakfast": { src: "/photos/cutout-billys-breakfast.webp", width: 640, height: 590, blurb: "Chia pudding, maple cold oats and house-made almond butter." },
};

export const photoFor = (name: string): ItemPhoto | undefined => ITEM_PHOTOS[name.toLowerCase().replace(/’/g, "'")];

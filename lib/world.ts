/**
 * Bomberry World: the 1920s cartoon universe painted on the shop's walls.
 * Lands and bosses come from the map and the Food Brief (04_Visual World/); the
 * story lines are site copy in Billy's voice — edit freely.
 */
export interface Land {
  id: string;
  name: string;
  boss?: string;
  /** Art in /public/world. */
  art: { src: string; width: number; height: number; alt: string };
  story: string;
  henchmen?: string[];
  /** The menu item Billy sends in, by exact menu name. */
  counter?: { item: string; line: string };
  /** Pin position on the map, in % of the map image. */
  pin: { x: number; y: number };
}

const scene = (src: string, alt: string) => ({ src, width: 1600, height: 960, alt });

export const LANDS: Land[] = [
  {
    id: "soda-seas",
    name: "Soda Seas",
    boss: "King Cola",
    art: scene("/world/soda-seas.webp", "King Cola, a giant soda-fountain crab, rises from a sea of cola while Billy hops across bottle caps"),
    story:
      "Once a clear blue bay. Then King Cola rolled in with his syrup pumps and turned every wave fizzy. His fountain-crab body shoots sugar slush at anything that swims, and his goblins cap every spring they find.",
    henchmen: ["Bubble Goblins", "Rootbeer Rumbler", "Syrup Crystal Golem", "Grape Pop Ghoul"],
    counter: { item: "Mango Mayhem", line: "Coconut water, mango and passionfruit. Real hydration, no syrup pump required." },
    pin: { x: 53, y: 4 },
  },
  {
    id: "grease-fields",
    name: "Grease Fields",
    boss: "The Big Grease",
    art: scene("/world/grease-fields.webp", "The Big Grease on a burger throne above fields of fries, cheese rivers and angry sliders"),
    story:
      "Rolling hills of fries, rivers of melted cheese, and The Big Grease on a throne of patties. Everything here is fried twice and called a meal. His Sludgeburger Twins guard the only road through.",
    henchmen: ["Sludgeburger Twins", "Bacon Wranglers", "Cheddar Melt Golem", "Greaselings"],
    counter: { item: "The Heavy Hitter", line: "50g of protein from whey and house-made peanut butter. Billy brought a bigger punch." },
    pin: { x: 52, y: 33 },
  },
  {
    id: "ice-cream-peaks",
    name: "Ice Cream Peaks",
    boss: "Queen Frosty",
    art: scene("/world/ice-cream-peaks.webp", "Queen Frosty, a towering soft-serve queen, swings a giant cone at Billy on a snowy sprinkle mountain"),
    story:
      "Snowcapped and sparkly, and absolutely freezing. Queen Frosty swirls a sprinkle blizzard over anyone who climbs her mountain, and her Scooplings stack the drifts higher every night.",
    henchmen: ["Sprinkle Stormers", "Scooplings", "The Soft-Serve Serpent", "Yeti Yogurts"],
    counter: { item: "Midnight Ube", line: "Creamy, purple and properly cold. Billy fights frost with frost." },
    pin: { x: 27.5, y: 7 },
  },
  {
    id: "donut-dunes",
    name: "Donut Dunes",
    boss: "Mr. Glaze",
    art: scene("/world/donut-dunes.webp", "Billy punches a giant pink-frosted donut across a desert of cake and churro cacti"),
    story:
      "A desert of sponge cake where the cacti are churros and the sun never stops glazing. Mr. Glaze rolls over travellers and leaves them sticky. His Shortstackers ambush from behind every pancake butte.",
    henchmen: ["Shortstackers", "Churro Chomper", "Croissant Crawlers", "Butter Puffs"],
    counter: { item: "Bombtella Bowl", line: "Our house-made Bombtella, Maldon salt and fresh fruit. The treat, minus the takeover." },
    pin: { x: 84, y: 44 },
  },
];

export const HOME: Land = {
  id: "fruit-falls",
  name: "Fruit Falls",
  art: { src: "/brand/billy-outline.webp", width: 600, height: 536, alt: "Billy the Bomberry marching with a fist in the air" },
  story:
    "Where the fruit grows wild and the water runs clean. Billy's hometown, and the last place the Process Plateau hasn't processed. It's where the rebellion started.",
  pin: { x: 29, y: 60 },
};

export const PLATEAU = {
  id: "process-plateau",
  name: "Process Plateau",
  pin: { x: 69, y: 12.5 },
};

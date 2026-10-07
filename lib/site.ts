export const SITE = {
  name: "Bomberry",
  tagline: "Explosively good fuel",
  description: "Organic acai bowls and crafted smoothies with house-made nut butters and coconut milk. 1223 N Grand Ave, Walnut, CA.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  address: { street: "1223 N Grand Ave", city: "Walnut", region: "CA", zip: "91789" },
  phone: "(626) 494-0992",
  phoneHref: "tel:+16264940992",
  instagram: "https://www.instagram.com/bomberryworld/",
  mapUrl: "https://maps.google.com/?q=Bomberry+1223+N+Grand+Ave+Walnut+CA+91789",
  rating: "4.9",
  reviews: [
    { quote: "Delicious food and brilliant packaging! Everything arrived perfectly fresh, thanks to the ice packs.", name: "Simon L." },
    { quote: "delicious. i cannot wait to buy another Bomberry bowl tomorrow.", name: "Sabrina G." },
  ],
};

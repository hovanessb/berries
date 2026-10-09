import type { Metadata, Viewport } from "next";
import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OrderBar } from "@/components/OrderBar";
import { CheckerBand } from "@/components/Deco";
import { ORDER_URL } from "@/lib/toast/links";
import { SITE } from "@/lib/site";

// Google Fonts. Anton is the heavy condensed display face from the homepage mockup;
// Montserrat is the designer's own text and price face.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--ff-display", display: "swap" });
const montserrat = Montserrat({ weight: ["500", "600", "700", "800", "900"], subsets: ["latin"], variable: "--ff-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · Acai Bowls & Smoothies in Walnut, CA`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: `${SITE.name}: ${SITE.tagline}`, description: SITE.description, type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Bomberry smoothies lined up on the counter" }] },
};

export const viewport: Viewport = {
  themeColor: "#3f0306",
};

// Re-check Toast's online-ordering status about every 10 minutes.
export const revalidate = 600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  servesCuisine: ["Acai bowls", "Smoothies"],
  telephone: SITE.phone,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "19:00" },
  ],
  hasMenu: ORDER_URL,
  potentialAction: { "@type": "OrderAction", target: ORDER_URL },
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${montserrat.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <CheckerBand />
        <SiteFooter />
        <OrderBar />
      </body>
    </html>
  );
}

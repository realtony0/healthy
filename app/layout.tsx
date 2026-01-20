import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://healthy.sn'),
  title: {
    default: "Healthy Dakar | Nutrition & Repas Équilibrés 100% Halal",
    template: "%s | Healthy Dakar"
  },
  description: "Découvrez Healthy Dakar, votre partenaire nutrition au Sénégal. Livraison de repas équilibrés, frais et 100% halal à Dakar. Commande à la carte ou abonnements sur mesure.",
  keywords: ["Healthy Dakar", "Nutrition Sénégal", "Repas équilibré Dakar", "Livraison repas Dakar", "Halal Food Dakar", "Abonnement repas sain", "Cree ton bowl Dakar"],
  authors: [{ name: "Healthy Dakar" }],
  creator: "Healthy Dakar",
  publisher: "Healthy Dakar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://healthy.sn",
    siteName: "Healthy Dakar",
    title: "Healthy Dakar | Nutrition & Repas Équilibrés 100% Halal",
    description: "Mangez mieux, vivez bien. Vos repas healthy livrés chaque jour partout à Dakar.",
    images: [
      {
        url: "/img/Bowl de poulet au Maïs Doré.jpeg",
        width: 1200,
        height: 630,
        alt: "Healthy Dakar - Repas Équilibrés",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthy Dakar | Nutrition & Repas Équilibrés 100% Halal",
    description: "Mangez mieux, vivez bien. Vos repas healthy livrés chaque jour partout à Dakar.",
    images: ["/img/Bowl de poulet au Maïs Doré.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased font-sans">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        
        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Healthy Dakar",
              "image": "https://healthy.sn/img/logo.jpeg",
              "@id": "https://healthy.sn",
              "url": "https://healthy.sn",
              "telephone": "+221770000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dakar",
                "addressLocality": "Dakar",
                "addressCountry": "SN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 14.7167,
                "longitude": -17.4677
              },
              "servesCuisine": "Healthy, International, Halal",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "20:00"
              }
            })
          }}
        />
      </body>
    </html>
  );
}

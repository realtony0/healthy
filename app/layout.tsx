import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PWARegister from "@/components/PWARegister";
import { Analytics } from '@vercel/analytics/react';

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
  icons: {
    icon: [
      { url: '/img/logo.jpeg?v=3', type: 'image/jpeg', sizes: '32x32' },
      { url: '/icon.svg?v=3', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/img/logo.jpeg?v=3', type: 'image/jpeg', sizes: '180x180' },
    ],
    shortcut: '/img/logo.jpeg?v=3',
  },
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
        url: "/img/bowl-poulet-mais.jpeg",
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
    images: ["/img/bowl-poulet-mais.jpeg"],
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
      <head>
        <link rel="icon" type="image/jpeg" href="/img/logo.jpeg?v=2" />
        <link rel="shortcut icon" type="image/jpeg" href="/img/logo.jpeg?v=2" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=2" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a472a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Healthy Dakar" />
        <link rel="apple-touch-icon" href="/img/logo.jpeg?v=2" />
      </head>
      <body className="antialiased font-sans">
        <Providers>
          <PWARegister />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        
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
              "telephone": "+221785987143",
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
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "06:00",
                "closes": "23:00"
              }
            })
          }}
        />
      </body>
    </html>
  );
}

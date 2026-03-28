import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/cursor/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mariavictoriarealestate.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/logo-mv.png",
    apple: "/logo-mv.png",
  },
  title: {
    default: "María Victoria · Real Estate & Dirección Fotográfica | Buenos Aires",
    template: "%s | María Victoria Real Estate",
  },
  description:
    "Especialista en real estate premium en zona norte y oeste de Buenos Aires. Propiedades en San Diego, Lagoon Pilar, Nordelta y CABA. Dirección fotográfica profesional incluida.",
  keywords:
    "real estate Buenos Aires, propiedades en venta Buenos Aires, casas en venta San Diego, Lagoon Pilar propiedades, Nordelta casas en venta, fotografía inmobiliaria, Coldwell Banker Wings, real estate premium zona norte, agente inmobiliaria Buenos Aires",
  authors: [{ name: "María Victoria" }],
  creator: "María Victoria Real Estate",
  openGraph: {
    title: "María Victoria · Real Estate & Dirección Fotográfica",
    description:
      "El valor de una propiedad no está solo en su ubicación. Está en cómo se percibe. Especialista en propiedades premium en zona norte y oeste de Buenos Aires.",
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "María Victoria Real Estate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "María Victoria Real Estate - Propiedades Premium Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "María Victoria · Real Estate Buenos Aires",
    description: "Propiedades premium en zona norte y oeste de Buenos Aires. Dirección fotográfica incluida.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#agent`,
      name: "María Victoria",
      description:
        "Especialista en real estate premium y dirección fotográfica. Zona norte y oeste de Buenos Aires.",
      url: siteUrl,
      telephone: "+5491133616566",
      email: "victoria.gazzo@coldwellbanker.com.ar",
      image: `${siteUrl}/maria-victoria.jpg`,
      logo: `${siteUrl}/logo-mv.png`,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      areaServed: [
        { "@type": "Place", name: "Country Banco Provincia, Buenos Aires" },
        { "@type": "Place", name: "Terravista, Buenos Aires" },
        { "@type": "Place", name: "Campos de Alvarez, Buenos Aires" },
        { "@type": "Place", name: "Haras María Eugenia, Buenos Aires" },
        { "@type": "Place", name: "Parque Leloir, Buenos Aires" },
      ],
      memberOf: {
        "@type": "Organization",
        name: "Coldwell Banker Wings",
      },
      sameAs: [
        "https://www.instagram.com/victoriagazzorealestate",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "María Victoria Real Estate",
      inLanguage: "es-AR",
      publisher: { "@id": `${siteUrl}/#agent` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-cream text-obsidian">
        <CustomCursor />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

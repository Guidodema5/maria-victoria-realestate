import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import FocusSection from "@/components/home/FocusSection";
import ContactSection from "@/components/home/ContactSection";
import { getFeaturedProperties } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "María Victoria · Real Estate & Dirección Fotográfica | Buenos Aires",
  description:
    "Especialista en real estate premium en zona norte y oeste de Buenos Aires. Propiedades en San Diego, Lagoon Pilar, Nordelta y CABA con dirección fotográfica profesional incluida.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturedProperties properties={featuredProperties} />
      <FocusSection />
      <ContactSection />
    </>
  );
}

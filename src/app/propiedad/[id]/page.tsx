import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyById, getRelatedProperties } from "@/lib/supabase/queries";
import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyCard from "@/components/properties/PropertyCard";
import {
  formatPrice,
  formatSurface,
  getWhatsAppUrl,
} from "@/lib/utils";
import {
  PROPERTY_TYPE_LABELS,
  PROPERTY_OPERATION_LABELS,
} from "@/types";
import {
  BedDouble,
  Bath,
  Car,
  Maximize2,
  Calendar,
  Home,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface PageProps {
  params: { id: string };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mariavictoriarealestate.com";

export async function generateMetadata({ params }: PageProps) {
  const property = await getPropertyById(params.id);
  if (!property) return { title: "Propiedad no encontrada" };

  const mainImage = property.property_images?.find((i) => i.is_main) ?? property.property_images?.[0];
  const descBase = property.description?.slice(0, 155) || `${PROPERTY_TYPE_LABELS[property.type]} ${PROPERTY_OPERATION_LABELS[property.operation].toLowerCase()} en ${property.zone}, Buenos Aires.`;

  return {
    title: `${property.title} | ${property.zone} · María Victoria Real Estate`,
    description: descBase,
    alternates: { canonical: `/propiedad/${property.id}` },
    openGraph: {
      title: property.title,
      description: descBase,
      type: "article",
      url: `${siteUrl}/propiedad/${property.id}`,
      images: mainImage ? [{ url: mainImage.url, alt: property.title }] : [],
    },
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const property = await getPropertyById(params.id);
  if (!property) notFound();

  const related = await getRelatedProperties(property.id, property.zone, property.type);

  const images = property.property_images ?? [];
  const whatsappUrl = getWhatsAppUrl(property.title);

  const specs = [
    { icon: Home, label: "Tipo", value: PROPERTY_TYPE_LABELS[property.type] },
    { icon: Home, label: "Operación", value: PROPERTY_OPERATION_LABELS[property.operation] },
    property.rooms ? { icon: Home, label: "Ambientes", value: `${property.rooms}` } : null,
    property.bedrooms ? { icon: BedDouble, label: "Dormitorios", value: `${property.bedrooms}` } : null,
    property.bathrooms ? { icon: Bath, label: "Baños", value: `${property.bathrooms}` } : null,
    property.parking ? { icon: Car, label: "Cocheras", value: `${property.parking}` } : null,
    property.total_surface ? { icon: Maximize2, label: "Superficie total", value: formatSurface(property.total_surface) } : null,
    property.covered_surface ? { icon: Maximize2, label: "Sup. cubierta", value: formatSurface(property.covered_surface) } : null,
    property.age != null ? { icon: Calendar, label: "Antigüedad", value: property.age === 0 ? "A estrenar" : `${property.age} años` } : null,
    property.expenses ? { icon: Home, label: "Expensas", value: `$${property.expenses.toLocaleString("es-AR")}/mes` } : null,
  ].filter(Boolean) as { icon: typeof Home; label: string; value: string }[];

  return (
    <>
      {/* Gallery */}
      <div className="pt-20">
        <PropertyGallery images={images} title={property.title} />
      </div>

      <div className="container-site py-12 md:py-16">
        {/* Back */}
        <Link
          href={`/${property.operation}`}
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase text-navy/40 hover:text-navy transition-colors duration-300 mb-10 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Volver a {property.operation === "venta" ? "ventas" : "alquileres"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase bg-navy text-cream px-3 py-1">
                  {PROPERTY_OPERATION_LABELS[property.operation]}
                </span>
                {property.status === "reservada" && (
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase bg-gold text-obsidian px-3 py-1">
                    Reservada
                  </span>
                )}
                <span className="font-sans text-xs text-cool-gray">{property.zone}</span>
              </div>
              <h1
                className="font-serif text-navy leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                {property.title}
              </h1>
              <p className="font-serif text-3xl md:text-4xl text-gold font-semibold">
                {formatPrice(property.price, property.currency)}
              </p>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-4">
                  Descripción
                </h2>
                <p className="font-sans text-cool-gray text-base leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {/* Specs grid */}
            <div>
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-6">
                Ficha técnica
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border border-navy/8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-1 p-4 border-b border-r border-navy/8"
                  >
                    <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-navy/40">
                      {spec.label}
                    </span>
                    <span className="font-serif text-navy text-base font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — contact sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6 bg-white p-6 md:p-8 border border-navy/8">
              <div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-2">
                  ¿Te interesa?
                </p>
                <p className="font-serif text-xl text-navy mb-1">{property.title}</p>
                <p className="font-sans text-sm text-cool-gray">{property.zone}</p>
              </div>

              <div className="h-px bg-navy/8" />

              <p className="font-serif text-2xl text-gold font-semibold">
                {formatPrice(property.price, property.currency)}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-sans text-sm font-medium tracking-wide hover:bg-[#20bc5a] transition-colors duration-300"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>

              <Link
                href="/#contacto"
                className="flex items-center justify-center w-full py-4 border border-navy text-navy font-sans text-sm tracking-[0.08em] uppercase hover:bg-navy hover:text-cream transition-all duration-300"
              >
                Enviar formulario
              </Link>

              <p className="font-sans text-[10px] text-center text-cool-gray/60">
                María Victoria te responde a la brevedad
              </p>
            </div>
          </div>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <div className="mt-20 pt-16 border-t border-navy/8">
            <h2 className="font-serif text-2xl md:text-3xl text-navy mb-10">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

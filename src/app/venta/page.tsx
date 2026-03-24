import { Suspense } from "react";
import { getProperties } from "@/lib/supabase/queries";
import PropertyGrid from "@/components/properties/PropertyGrid";
import PropertyFilters from "@/components/properties/PropertyFilters";
import type { PropertyFilters as Filters } from "@/types";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export const metadata = {
  title: "Propiedades en Venta | Casas y Departamentos Premium Buenos Aires",
  description:
    "Propiedades premium en venta en San Diego, Lagoon Pilar, Nordelta, Morón y CABA. Casas, departamentos y terrenos con dirección fotográfica profesional. Consultá con María Victoria.",
  keywords:
    "propiedades en venta Buenos Aires, casas en venta San Diego, Lagoon Pilar venta, Nordelta casas en venta, departamentos Buenos Aires, real estate premium zona norte",
  alternates: { canonical: "/venta" },
  openGraph: {
    title: "Propiedades en Venta · María Victoria Real Estate",
    description: "Propiedades premium en venta en zona norte y oeste de Buenos Aires.",
    type: "website",
  },
};

export default async function VentaPage({ searchParams }: PageProps) {
  const filters: Filters = {
    operation: "venta",
    type: searchParams.type as Filters["type"],
    zone: searchParams.zone,
    rooms: searchParams.rooms ? parseInt(searchParams.rooms) : undefined,
    currency: searchParams.currency as Filters["currency"],
  };

  const properties = await getProperties(filters);

  return (
    <>
      {/* Hero de sección */}
      <section className="bg-navy pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container-site">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">
            Operación
          </p>
          <h1
            className="font-serif text-cream"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Propiedades
            <br />
            <em className="not-italic text-gold">en venta</em>
          </h1>
          <p className="font-sans text-cream/40 text-sm mt-4">
            {properties.length} propiedad{properties.length !== 1 ? "es" : ""} disponible
            {properties.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Filters */}
      <Suspense>
        <PropertyFilters operation="venta" />
      </Suspense>

      {/* Grid */}
      <section className="container-site section-py">
        <PropertyGrid properties={properties} />
      </section>
    </>
  );
}

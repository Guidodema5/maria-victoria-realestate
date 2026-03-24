import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PropertyFormClient from "../PropertyFormClient";

interface PageProps {
  params: { id: string };
}

export default async function EditarPropiedad({ params }: PageProps) {
  const supabase = await createClient();
  const { data: property } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("id", params.id)
    .single();

  if (!property) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-navy mb-2">Editar propiedad</h1>
      <p className="font-sans text-sm text-gray-400 mb-8">{property.title}</p>
      <PropertyFormClient property={property} />
    </div>
  );
}

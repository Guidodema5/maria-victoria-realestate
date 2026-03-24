"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Upload, Star, X } from "lucide-react";
import { ZONES } from "@/types";
import type { Property } from "@/types";

const schema = z.object({
  title: z.string().min(3),
  type: z.enum(["casa", "departamento", "ph", "lote", "local"]),
  operation: z.enum(["venta", "alquiler"]),
  zone: z.string().min(1),
  price: z.coerce.number().positive(),
  currency: z.enum(["USD", "ARS"]),
  rooms: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  parking: z.coerce.number().optional(),
  total_surface: z.coerce.number().optional(),
  covered_surface: z.coerce.number().optional(),
  age: z.coerce.number().optional(),
  expenses: z.coerce.number().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(["activa", "reservada", "vendida", "pausada"]),
});

type FormData = z.infer<typeof schema>;

interface PropertyFormClientProps {
  property?: Property;
}

const inputClass = "w-full border border-gray-200 rounded px-3 py-2 font-sans text-sm text-navy outline-none focus:border-navy transition-colors";
const labelClass = "font-sans text-xs text-gray-500 block mb-1";

export default function PropertyFormClient({ property }: PropertyFormClientProps) {
  const router = useRouter();
  const isEditing = !!property;
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [images, setImages] = useState<{ url: string; is_main: boolean; id?: string }[]>(
    property?.property_images?.map((img) => ({ url: img.url, is_main: img.is_main, id: img.id })) ?? []
  );
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: property?.title ?? "",
      type: property?.type ?? "casa",
      operation: property?.operation ?? "venta",
      zone: property?.zone ?? "",
      price: property?.price ?? 0,
      currency: property?.currency ?? "USD",
      rooms: property?.rooms ?? undefined,
      bedrooms: property?.bedrooms ?? undefined,
      bathrooms: property?.bathrooms ?? undefined,
      parking: property?.parking ?? 0,
      total_surface: property?.total_surface ?? undefined,
      covered_surface: property?.covered_surface ?? undefined,
      age: property?.age ?? undefined,
      expenses: property?.expenses ?? undefined,
      description: property?.description ?? "",
      featured: property?.featured ?? false,
      status: property?.status ?? "activa",
    },
  });

  const featured = watch("featured");

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    const supabase = createClient();

    if (isEditing) {
      await supabase.from("properties").update(data).eq("id", property!.id);
      // Update images
      await supabase.from("property_images").delete().eq("property_id", property!.id);
      if (images.length > 0) {
        await supabase.from("property_images").insert(
          images.map((img, i) => ({
            property_id: property!.id,
            url: img.url,
            is_main: img.is_main,
            order: i,
          }))
        );
      }
    } else {
      const { data: newProp } = await supabase.from("properties").insert([data]).select().single();
      if (newProp && images.length > 0) {
        await supabase.from("property_images").insert(
          images.map((img, i) => ({
            property_id: newProp.id,
            url: img.url,
            is_main: img.is_main,
            order: i,
          }))
        );
      }
    }

    setSaving(false);
    router.push("/admin/propiedades");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!property || !confirm("¿Eliminar esta propiedad? Esta acción no se puede deshacer.")) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("properties").delete().eq("id", property.id);
    router.push("/admin/propiedades");
    router.refresh();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(filename, file, { upsert: false });

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage.from("property-images").getPublicUrl(filename);
        setImages((prev) => [...prev, { url: publicUrl, is_main: prev.length === 0 }]);
      }
    }
    setUploading(false);
    e.target.value = "";
  };

  const setMainImage = (index: number) => {
    setImages((prev) => prev.map((img, i) => ({ ...img, is_main: i === index })));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length > 0 && !next.some((img) => img.is_main)) {
        next[0].is_main = true;
      }
      return next;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      {/* Básicos */}
      <div className="bg-white rounded border border-gray-100 p-6 space-y-4">
        <h2 className="font-sans text-sm font-medium text-navy mb-4">Información básica</h2>

        <div>
          <label className={labelClass}>Título *</label>
          <input {...register("title")} className={inputClass} placeholder="Casa con jardín en San Diego..." />
          {errors.title && <p className="text-red-500 text-xs mt-1">Requerido</p>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Tipo *</label>
            <select {...register("type")} className={inputClass}>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="ph">PH</option>
              <option value="lote">Lote</option>
              <option value="local">Local</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Operación *</label>
            <select {...register("operation")} className={inputClass}>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Estado *</label>
            <select {...register("status")} className={inputClass}>
              <option value="activa">Activa</option>
              <option value="reservada">Reservada</option>
              <option value="vendida">Vendida</option>
              <option value="pausada">Pausada</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Zona *</label>
            <select {...register("zone")} className={inputClass}>
              <option value="">Seleccioná</option>
              {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Precio *</label>
            <input {...register("price")} type="number" className={inputClass} placeholder="250000" />
          </div>
          <div>
            <label className={labelClass}>Moneda *</label>
            <select {...register("currency")} className={inputClass}>
              <option value="USD">USD</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Descripción</label>
          <textarea {...register("description")} rows={4} className={inputClass} placeholder="Descripción completa de la propiedad..." />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setValue("featured", !featured)}
            className={`flex items-center gap-2 px-3 py-2 rounded border text-sm font-sans transition-all ${featured ? "border-gold bg-gold/10 text-gold" : "border-gray-200 text-gray-400"}`}
          >
            <Star size={14} fill={featured ? "currentColor" : "none"} />
            {featured ? "Destacada" : "No destacada"}
          </button>
          <p className="font-sans text-xs text-gray-400">Las destacadas aparecen en la home</p>
        </div>
      </div>

      {/* Ficha técnica */}
      <div className="bg-white rounded border border-gray-100 p-6">
        <h2 className="font-sans text-sm font-medium text-navy mb-4">Ficha técnica</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "rooms", label: "Ambientes" },
            { name: "bedrooms", label: "Dormitorios" },
            { name: "bathrooms", label: "Baños" },
            { name: "parking", label: "Cocheras" },
            { name: "total_surface", label: "Sup. total (m²)" },
            { name: "covered_surface", label: "Sup. cubierta (m²)" },
            { name: "age", label: "Antigüedad (años)" },
            { name: "expenses", label: "Expensas ($/mes)" },
          ].map((field) => (
            <div key={field.name}>
              <label className={labelClass}>{field.label}</label>
              <input
                {...register(field.name as keyof FormData)}
                type="number"
                className={inputClass}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white rounded border border-gray-100 p-6">
        <h2 className="font-sans text-sm font-medium text-navy mb-4">
          Imágenes ({images.length}/20)
        </h2>

        <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-navy transition-colors w-fit mb-4">
          <Upload size={16} className="text-gray-400" />
          <span className="font-sans text-sm text-gray-500">
            {uploading ? "Subiendo..." : "Subir imágenes"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading || images.length >= 20}
          />
        </label>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="w-full h-full object-cover rounded border border-gray-100" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-2">
                  <button type="button" onClick={() => setMainImage(i)} title="Principal"
                    className={`p-1.5 rounded-full ${img.is_main ? "bg-gold text-white" : "bg-white/80 text-gray-600 hover:bg-gold hover:text-white"} transition-colors`}>
                    <Star size={12} fill={img.is_main ? "white" : "none"} />
                  </button>
                  <button type="button" onClick={() => removeImage(i)} title="Eliminar"
                    className="p-1.5 rounded-full bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                </div>
                {img.is_main && (
                  <div className="absolute bottom-1 left-1 bg-gold text-white font-sans text-[8px] px-1.5 py-0.5 rounded">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-navy text-cream font-sans text-sm hover:bg-navy/80 transition-colors rounded disabled:opacity-50"
          >
            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear propiedad"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/propiedades")}
            className="px-6 py-3 border border-gray-200 text-gray-500 font-sans text-sm hover:border-gray-400 transition-colors rounded"
          >
            Cancelar
          </button>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-3 text-red-500 font-sans text-sm hover:bg-red-50 transition-colors rounded border border-red-200"
          >
            <Trash2 size={14} />
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        )}
      </div>
    </form>
  );
}

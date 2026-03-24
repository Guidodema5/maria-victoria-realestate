import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils";
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS } from "@/types";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  activa: "bg-green-100 text-green-700",
  reservada: "bg-yellow-100 text-yellow-700",
  vendida: "bg-gray-100 text-gray-500",
  pausada: "bg-red-100 text-red-600",
};

export default async function AdminPropiedades() {
  const supabase = await createClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("*, property_images(url, is_main)")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-navy">Propiedades</h1>
          <p className="font-sans text-sm text-gray-500 mt-1">
            {properties?.length ?? 0} propiedades en total
          </p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="flex items-center gap-2 px-4 py-2.5 bg-navy text-cream font-sans text-sm hover:bg-navy/80 transition-colors rounded"
        >
          <Plus size={16} />
          Nueva propiedad
        </Link>
      </div>

      <div className="bg-white rounded border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {["Propiedad", "Tipo", "Operación", "Precio", "Estado", "Destac.", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-sans text-[10px] tracking-widest uppercase text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties?.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-sans text-sm text-navy font-medium line-clamp-1 max-w-xs">{p.title}</p>
                    <p className="font-sans text-xs text-gray-400 mt-0.5">{p.zone}</p>
                  </td>
                  <td className="px-4 py-3 font-sans text-xs text-gray-600">
                    {PROPERTY_TYPE_LABELS[p.type as keyof typeof PROPERTY_TYPE_LABELS]}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-sans text-[10px] tracking-wide uppercase px-2 py-1 rounded",
                      p.operation === "venta" ? "bg-navy/10 text-navy" : "bg-gold/10 text-gold"
                    )}>
                      {p.operation}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-gray-700 whitespace-nowrap">
                    {formatPrice(p.price, p.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-sans text-[10px] tracking-wide uppercase px-2 py-1 rounded",
                      statusColors[p.status] ?? "bg-gray-100 text-gray-500"
                    )}>
                      {PROPERTY_STATUS_LABELS[p.status as keyof typeof PROPERTY_STATUS_LABELS]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.featured && (
                      <span className="font-sans text-[10px] text-gold">★</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/propiedades/${p.id}`}
                      className="inline-flex items-center gap-1.5 font-sans text-xs text-gray-400 hover:text-navy transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

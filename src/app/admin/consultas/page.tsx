import { createClient } from "@/lib/supabase/server";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkReadButton from "./MarkReadButton";

export default async function AdminConsultas() {
  const supabase = await createClient();
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*, properties(title)")
    .order("created_at", { ascending: false });

  const statusColors: Record<string, string> = {
    nueva: "bg-red-100 text-red-600",
    leida: "bg-yellow-100 text-yellow-700",
    respondida: "bg-green-100 text-green-700",
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-navy">Consultas</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          {contacts?.length ?? 0} consultas recibidas
        </p>
      </div>

      <div className="space-y-3">
        {contacts?.length === 0 && (
          <div className="bg-white rounded border border-gray-100 p-12 text-center">
            <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="font-sans text-sm text-gray-400">No hay consultas todavía</p>
          </div>
        )}

        {contacts?.map((c) => (
          <div
            key={c.id}
            className={cn(
              "bg-white rounded border p-5 transition-all",
              c.status === "nueva" ? "border-red-200" : "border-gray-100"
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-sans font-medium text-sm text-navy">{c.name}</span>
                  <span className={cn(
                    "font-sans text-[9px] tracking-widest uppercase px-2 py-0.5 rounded",
                    statusColors[c.status]
                  )}>
                    {c.status}
                  </span>
                  {c.status === "nueva" && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
                  <a href={`mailto:${c.email}`} className="font-sans text-xs text-blue-600 hover:underline">
                    {c.email}
                  </a>
                  {c.phone && (
                    <a href={`tel:${c.phone}`} className="font-sans text-xs text-gray-500 hover:underline">
                      {c.phone}
                    </a>
                  )}
                </div>

                <p className="font-sans text-sm text-gray-600 leading-relaxed">{c.message}</p>

                {c.properties && (
                  <p className="font-sans text-xs text-gold mt-2">
                    Propiedad: {(c.properties as { title: string }).title}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="font-sans text-[10px] text-gray-400">
                  {new Date(c.created_at).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <MarkReadButton id={c.id} status={c.status} />
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola ${c.name}, te escribo en respuesta a tu consulta.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-wide uppercase text-green-600 hover:text-green-700 transition-colors"
                >
                  Responder WA
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

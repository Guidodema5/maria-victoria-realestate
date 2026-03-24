import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Home, TrendingUp, MessageSquare, Eye } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: totalActive },
    { count: totalVenta },
    { count: totalAlquiler },
    { count: consultasNuevas },
  ] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("status", "activa"),
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("operation", "venta").eq("status", "activa"),
    supabase.from("properties").select("*", { count: "exact", head: true }).eq("operation", "alquiler").eq("status", "activa"),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "nueva"),
  ]);

  const stats = [
    { label: "Propiedades activas", value: totalActive ?? 0, icon: Home, href: "/admin/propiedades", color: "bg-navy" },
    { label: "En venta", value: totalVenta ?? 0, icon: TrendingUp, href: "/admin/propiedades?op=venta", color: "bg-gold" },
    { label: "En alquiler", value: totalAlquiler ?? 0, icon: Eye, href: "/admin/propiedades?op=alquiler", color: "bg-navy/70" },
    { label: "Consultas nuevas", value: consultasNuevas ?? 0, icon: MessageSquare, href: "/admin/consultas", color: "bg-red-500" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-navy">Dashboard</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">Resumen general del sitio</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded border border-gray-100 p-5 hover:shadow-sm transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} p-2 rounded`}>
                <stat.icon size={16} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
            <p className="font-serif text-3xl text-navy mb-1">{stat.value}</p>
            <p className="font-sans text-xs text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded border border-gray-100 p-6">
        <h2 className="font-sans text-sm font-medium text-navy mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/propiedades/nueva"
            className="px-4 py-2 bg-navy text-cream font-sans text-xs tracking-wide uppercase hover:bg-navy/80 transition-colors rounded"
          >
            + Nueva propiedad
          </Link>
          <Link
            href="/admin/consultas"
            className="px-4 py-2 border border-navy text-navy font-sans text-xs tracking-wide uppercase hover:bg-navy hover:text-cream transition-all rounded"
          >
            Ver consultas
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 border border-gray-200 text-gray-500 font-sans text-xs tracking-wide uppercase hover:border-gray-400 transition-colors rounded"
          >
            Ver sitio ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ZONES, PROPERTY_TYPE_LABELS, type PropertyOperation } from "@/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyFiltersProps {
  operation: PropertyOperation;
}

const selectClass =
  "appearance-none w-full bg-transparent border-b border-navy/20 focus:border-navy py-3 pr-8 font-sans text-sm text-navy/70 outline-none transition-colors duration-300 cursor-pointer";

export default function PropertyFilters({ operation }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      {children}
      <ChevronDown
        size={14}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none"
      />
    </div>
  );

  return (
    <div className="bg-white border-b border-navy/8 sticky top-[72px] z-40">
      <div className="container-site py-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-end">
          {/* Label */}
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold flex-shrink-0 self-center sm:self-auto">
            Filtrar por
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 flex-1">
            {/* Zona */}
            <div>
              <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-navy/40 block mb-1">
                Zona
              </label>
              <SelectWrapper>
                <select
                  className={selectClass}
                  value={searchParams.get("zone") || ""}
                  onChange={(e) => updateFilter("zone", e.target.value)}
                >
                  <option value="">Todas</option>
                  {ZONES.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </div>

            {/* Tipo */}
            <div>
              <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-navy/40 block mb-1">
                Tipo
              </label>
              <SelectWrapper>
                <select
                  className={selectClass}
                  value={searchParams.get("type") || ""}
                  onChange={(e) => updateFilter("type", e.target.value)}
                >
                  <option value="">Todos</option>
                  {Object.entries(PROPERTY_TYPE_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </div>

            {/* Ambientes */}
            <div>
              <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-navy/40 block mb-1">
                Ambientes
              </label>
              <SelectWrapper>
                <select
                  className={selectClass}
                  value={searchParams.get("rooms") || ""}
                  onChange={(e) => updateFilter("rooms", e.target.value)}
                >
                  <option value="">Todos</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n === 5 ? "5+" : n} amb.
                    </option>
                  ))}
                </select>
              </SelectWrapper>
            </div>

            {/* Moneda / Precio */}
            <div>
              <label className="font-sans text-[9px] tracking-[0.15em] uppercase text-navy/40 block mb-1">
                Moneda
              </label>
              <SelectWrapper>
                <select
                  className={selectClass}
                  value={searchParams.get("currency") || ""}
                  onChange={(e) => updateFilter("currency", e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
              </SelectWrapper>
            </div>
          </div>

          {/* Clear filters */}
          {searchParams.toString() && (
            <button
              onClick={() => router.push(`/${operation}`, { scroll: false })}
              className="font-sans text-[10px] tracking-[0.1em] uppercase text-navy/40 hover:text-navy transition-colors duration-300 underline underline-offset-4 flex-shrink-0"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

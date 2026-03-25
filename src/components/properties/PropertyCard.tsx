"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { cn, formatPrice, getMainImage } from "@/lib/utils";
import { PROPERTY_TYPE_LABELS, type Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  priority?: boolean;
  className?: string;
}

export default function PropertyCard({ property, priority = false, className }: PropertyCardProps) {
  const mainImage = getMainImage(property.property_images);

  return (
    <Link
      href={`/propiedad/${property.id}`}
      className={cn("group block relative overflow-hidden bg-white", className)}
      data-cursor="hover"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage}
          alt={property.title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status badge */}
        {property.status === "reservada" && (
          <div className="absolute top-4 left-4 bg-gold text-obsidian font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1">
            Reservada
          </div>
        )}

        {/* Operation badge */}
        <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur-sm text-cream font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1">
          {property.operation === "venta" ? "Venta" : "Alquiler"}
        </div>

        {/* Hover info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex items-center gap-4 text-cream">
            {property.bedrooms && (
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <BedDouble size={13} strokeWidth={1.5} />
                {property.bedrooms} dorm.
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <Bath size={13} strokeWidth={1.5} />
                {property.bathrooms} baños
              </span>
            )}
            {property.total_surface && (
              <span className="flex items-center gap-1.5 font-sans text-xs">
                <Maximize2 size={13} strokeWidth={1.5} />
                {property.total_surface} m²
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 md:p-6 border border-t-0 border-navy/10">
        {/* Zone */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={11} className="text-gold flex-shrink-0" strokeWidth={1.5} />
          <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-cool-gray">
            {property.zone}
          </span>
        </div>

        {/* Type + Rooms + Surface */}
        <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-navy/40 mb-2">
          {PROPERTY_TYPE_LABELS[property.type]}
          {property.rooms ? ` · ${property.rooms} amb.` : ""}
          {property.total_surface ? ` · ${property.total_surface} m²` : ""}
        </p>

        {/* Title */}
        <h3 className="font-serif text-lg text-navy leading-snug mb-2 group-hover:text-navy/80 transition-colors duration-300 line-clamp-2">
          {property.title}
        </h3>

        {/* Short description */}
        {property.description && (
          <p className="font-sans text-xs text-cool-gray leading-relaxed mb-3 line-clamp-1">
            {property.description.slice(0, 70)}
          </p>
        )}

        {/* Price */}
        <p className="font-serif text-gold font-semibold text-xl mt-auto">
          {formatPrice(property.price, property.currency)}
        </p>
      </div>
    </Link>
  );
}

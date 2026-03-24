"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn } from "lucide-react";
import type { PropertyImage } from "@/types";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const sorted = [...images].sort((a, b) => {
    if (a.is_main) return -1;
    if (b.is_main) return 1;
    return a.order - b.order;
  });

  const slides = sorted.map((img) => ({ src: img.url, alt: title }));
  const main = sorted[0];
  const rest = sorted.slice(1, 5);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[50vh] md:h-[60vh] max-h-[600px]">
        {/* Main image — spans 3 cols and full height */}
        <button
          className="col-span-4 md:col-span-3 row-span-2 relative overflow-hidden group"
          onClick={() => { setIndex(0); setOpen(true); }}
          aria-label="Ver galería"
        >
          <Image
            src={main.url}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
          <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-500 flex items-center justify-center">
            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>

        {/* Thumbnails — right column, hidden on mobile */}
        {rest.map((img, i) => (
          <button
            key={img.id}
            className="hidden md:block relative overflow-hidden group"
            onClick={() => { setIndex(i + 1); setOpen(true); }}
            aria-label={`Ver foto ${i + 2}`}
          >
            <Image
              src={img.url}
              alt={`${title} - foto ${i + 2}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
            {/* Last thumb overlay: "ver todas" */}
            {i === rest.length - 1 && images.length > 5 && (
              <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center">
                <span className="font-sans text-xs text-white tracking-widest uppercase">
                  +{images.length - 5} fotos
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile: show photo count */}
      <button
        className="md:hidden w-full text-center font-sans text-xs text-navy/50 tracking-wider uppercase py-3 border border-navy/10 mt-2"
        onClick={() => { setIndex(0); setOpen(true); }}
      >
        Ver todas las fotos ({images.length})
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(10,10,10,0.97)" },
        }}
      />
    </>
  );
}

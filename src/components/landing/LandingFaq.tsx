"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export default function LandingFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy/10">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-6 py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-serif text-navy text-lg leading-snug group-hover:text-gold transition-colors duration-200">
              {item.q}
            </span>
            <span className="mt-1 flex-shrink-0 text-navy/35 group-hover:text-gold transition-colors duration-200">
              {open === i ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {open === i && (
            <p className="font-sans text-sm text-cool-gray leading-relaxed pb-5 pr-8">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

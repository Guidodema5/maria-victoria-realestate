"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Show after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-show tooltip after button appears
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setTooltipOpen(true), 800);
    const hide = setTimeout(() => setTooltipOpen(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div
        className={`
          relative bg-white text-navy rounded-lg px-4 py-3 shadow-xl text-sm font-sans leading-snug max-w-[220px]
          transition-all duration-300
          ${tooltipOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        `}
      >
        <button
          onClick={() => setTooltipOpen(false)}
          className="absolute top-1.5 right-2 text-navy/40 hover:text-navy transition-colors"
          aria-label="Cerrar"
        >
          <X size={12} />
        </button>
        <p className="font-medium text-navy/90 pr-4">¿Buscás o vendés una propiedad?</p>
        <p className="text-navy/60 text-xs mt-0.5">Escribime por WhatsApp y te respondo al instante.</p>
      </div>

      {/* Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group relative w-14 h-14 bg-[#25D366] hover:bg-[#20bc5a] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle size={26} className="text-white relative z-10" fill="white" strokeWidth={0} />
      </a>
    </div>
  );
}

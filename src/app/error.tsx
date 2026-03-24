"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">Error</p>
      <h1 className="font-serif text-4xl text-navy mb-4">Algo salió mal</h1>
      <p className="font-sans text-cool-gray text-sm mb-8">
        Ocurrió un error inesperado. Intentá de nuevo.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-navy text-cream font-sans text-xs tracking-widest uppercase hover:bg-navy/80 transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-navy text-navy font-sans text-xs tracking-widest uppercase hover:bg-navy hover:text-cream transition-all"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

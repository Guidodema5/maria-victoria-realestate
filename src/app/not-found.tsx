import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mb-4">404</p>
      <h1 className="font-serif text-5xl text-navy mb-4">Página no encontrada</h1>
      <p className="font-sans text-cool-gray text-sm mb-8 max-w-sm">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-navy text-cream font-sans text-xs tracking-widest uppercase hover:bg-navy/80 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

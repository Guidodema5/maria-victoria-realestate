import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import LogoMV from "@/components/logo/LogoMV";
import LogoColdwell from "@/components/logo/LogoColdwell";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream/70">
      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div className="space-y-5">
            <LogoMV height={80} />
            <p className="font-sans text-sm leading-relaxed text-cream/50 max-w-xs">
              Especialista en real estate y fotógrafa profesional. Zona oeste y norte de Buenos Aires.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-cream/30">Asociada a</span>
              <LogoColdwell height={32} className="opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold">Navegación</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/venta", label: "Propiedades en Venta" },
                { href: "/alquiler", label: "Propiedades en Alquiler" },
                { href: "/#sobre-mi", label: "Sobre mí" },
                { href: "/#contacto", label: "Contacto" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 link-underline w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Zones */}
          <div className="space-y-4">
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold">Zonas de operación</p>
            <div className="space-y-2 text-sm text-cream/60 font-sans">
              <p>San Diego · Zona Oeste</p>
              <p>Lagoon Pilar · Zona Norte</p>
              <p>Nordelta · Zona Norte</p>
              <p>Morón · AMBA</p>
              <p>CABA</p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/30">
            © {year} María Victoria. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <LogoColdwell height={28} className="opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}

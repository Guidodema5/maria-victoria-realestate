"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoMV from "@/components/logo/LogoMV";

const links = [
  { href: "/venta", label: "En Venta" },
  { href: "/alquiler", label: "En Alquiler" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-navy shadow-[0_2px_20px_rgba(0,0,0,0.3)] py-3"
            : "bg-navy/90 backdrop-blur-md py-5"
        )}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <LogoMV height={56} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[12px] tracking-[0.1em] uppercase transition-colors duration-300 relative group",
                    isActive ? "text-gold" : "text-cream/70 hover:text-cream"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/5491144709617"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 border border-gold/40 text-gold font-sans text-[11px] tracking-[0.12em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            WhatsApp
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-cream transition-colors duration-300"
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-navy flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-3xl text-cream hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
              >
                <a
                  href="https://wa.me/5491144709617"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-obsidian font-sans text-xs font-semibold tracking-[0.12em] uppercase mt-4"
                >
                  WhatsApp
                </a>
              </motion.div>
            </nav>

            <div className="absolute bottom-10 text-cream/20 font-sans text-[10px] tracking-[0.3em] uppercase">
              María Victoria · Real Estate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

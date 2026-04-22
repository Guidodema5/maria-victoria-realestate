import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Search, HandshakeIcon, FileCheck, MapPin, Phone, Mail, Instagram, ArrowRight, CheckCircle } from "lucide-react";
import LandingContactForm from "@/components/landing/LandingContactForm";
import LandingFaq from "@/components/landing/LandingFaq";
import type { FaqItem } from "@/components/landing/LandingFaq";
import LogoMV from "@/components/logo/LogoMV";
import LogoColdwell from "@/components/logo/LogoColdwell";

export const metadata: Metadata = {
  title: "Encontrá tu propiedad ideal en Buenos Aires | María Victoria Real Estate",
  description:
    "Te ayudo a encontrar y cerrar la propiedad que mejor se adapta a tus objetivos. Zona norte y oeste de Buenos Aires. Acceso a propiedades publicadas y fuera de mercado.",
  keywords:
    "comprar propiedad Buenos Aires, invertir en inmuebles, casas en venta zona oeste, propiedades zona norte Buenos Aires, Coldwell Banker, Country Banco Provincia",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://victoriagazzorealestate.com.ar/invertir-en-propiedades",
  },
  openGraph: {
    title: "Encontrá tu propiedad ideal en Buenos Aires",
    description:
      "Acceso a propiedades publicadas y fuera de mercado en las mejores zonas de Buenos Aires.",
    url: "https://victoriagazzorealestate.com.ar/invertir-en-propiedades",
    type: "website",
  },
};

// ── Schema markup ─────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Compra e inversión en propiedades — María Victoria Real Estate",
  description:
    "Asesoramiento personalizado para compra de propiedades en zona norte y oeste de Buenos Aires. Acceso a listings publicados y fuera de mercado.",
  provider: {
    "@type": "RealEstateAgent",
    name: "María Victoria",
    telephone: "+5491133616566",
    email: "victoria.gazzo@coldwellbanker.com.ar",
    url: "https://victoriagazzorealestate.com.ar",
  },
  areaServed: "Buenos Aires, Argentina",
  serviceType: "Real Estate Buyer Representation",
};

// ── FAQ data ──────────────────────────────────────────────────────────
const faqs: FaqItem[] = [
  {
    q: "¿Cuánto cuesta el servicio para compradores?",
    a: "La comisión estándar es del 3% + IVA sobre el precio final, abonada al momento de la escritura. No hay costos previos ni cargos por consultas.",
  },
  {
    q: "¿Podés ayudarme a encontrar propiedades que no están publicadas?",
    a: "Sí. Además de las propiedades en portales, tengo acceso a listings fuera de mercado y una red activa de colegas. Muchas operaciones se cierran antes de llegar a ZonaProp.",
  },
  {
    q: "¿Cómo es el proceso de compra en Argentina?",
    a: "El proceso tiene varios pasos: búsqueda → oferta → boleto de compraventa (con seña) → escritura pública. Te explico cada etapa con claridad y te acompaño en todas.",
  },
  {
    q: "¿Podés ayudarme a negociar el precio?",
    a: "Absolutamente. Negociar con conocimiento del mercado local es uno de los mayores beneficios de trabajar con un agente profesional. A veces ahorrás más de lo que cuesta la comisión.",
  },
  {
    q: "¿Ofrecés opciones de financiamiento?",
    a: "No soy banco, pero trabajo con brokers hipotecarios que pueden asesorarte sobre créditos disponibles. También puedo guiarte sobre las opciones actuales del mercado para compradores.",
  },
];

// ── Zones data ────────────────────────────────────────────────────────
const zones = [
  {
    name: "Country Banco Provincia",
    desc: "Barrio cerrado familiar con todas las comodidades. Seguridad, espacios verdes y excelente calidad de vida.",
  },
  {
    name: "Terravista",
    desc: "Barrio privado de alta gama en zona oeste. Excelente conectividad y propiedades con diseño premium.",
  },
  {
    name: "Campos de Alvarez",
    desc: "Entorno natural único con lotes y casas de alto estándar. Una de las zonas de mayor crecimiento.",
  },
  {
    name: "Haras María Eugenia",
    desc: "Barrio privado con ambiente campestre y equino. Propiedades exclusivas para un estilo de vida diferente.",
  },
  {
    name: "Parque Leloir",
    desc: "Zona consolidada de alto valor en AMBA Oeste. Excelente calidad de vida, arbolado y tranquilidad.",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────
const testimonials = [
  {
    text: "Encontramos exactamente lo que buscábamos en Campos de Alvarez. El proceso fue claro, sin sorpresas y con mucho profesionalismo.",
    name: "Laura y Marcos M.",
    zone: "Campos de Alvarez",
  },
  {
    text: "Como compradores por primera vez, María Victoria nos explicó cada paso del proceso. Sentimos que teníamos una aliada real en la negociación.",
    name: "Sofía T.",
    zone: "Haras María Eugenia",
  },
  {
    text: "Encontró propiedades que no estaban en ningún portal. Terminamos comprando algo que ni sabíamos que existía en esa zona.",
    name: "Roberto C. y familia",
    zone: "Terravista",
  },
];

export default function InvertirEnPropiedadesPage() {
  return (
    <>
      {/* GTM / Analytics placeholder — agregar script aquí */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-[70px] bg-cream">

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 1 — HERO
        ───────────────────────────────────────────────────────────── */}
        <section
          className="relative w-full overflow-hidden bg-navy"
          style={{ minHeight: "92svh" }}
          aria-label="Encontrá tu propiedad ideal"
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=85"
            alt="Propiedad premium en Buenos Aires"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/35 to-transparent hidden lg:block" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="container-site pt-28 pb-16 md:pb-20 lg:pb-24">
              <div className="max-w-xl lg:max-w-2xl">

                {/* Tag */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-5 h-px bg-gold" />
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/90">
                    Propiedades en venta · Buenos Aires
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="font-serif text-cream mb-5 leading-[1.08]"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  Encontrá la propiedad<br />
                  <span className="text-gold italic">ideal para vos.</span>
                </h1>

                {/* Sub */}
                <p
                  className="font-sans text-cream/65 mb-8 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
                >
                  Te acompaño en cada paso: búsqueda, negociación y cierre. Acceso a propiedades publicadas y fuera de mercado en las mejores zonas de Buenos Aires.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-obsidian font-sans text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold/90 active:scale-95 transition-all duration-300 group"
                  >
                    Quiero que me contactes
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/venta"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/25 text-cream/80 font-sans text-[11px] font-medium tracking-[0.14em] uppercase hover:border-cream/60 hover:text-cream active:scale-95 transition-all duration-300"
                  >
                    Ver propiedades disponibles
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-cream/10">
                  {[
                    { n: "+100", l: "Operaciones cerradas" },
                    { n: "5+",   l: "Años activa" },
                    { n: "100%", l: "Asesoramiento personalizado" },
                  ].map((s) => (
                    <div key={s.n} className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl text-gold leading-none">{s.n}</span>
                      <span className="font-sans text-[10px] text-cream/45 uppercase tracking-wide">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 2 — ZONAS
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Dónde operamos
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                Las mejores zonas para<br className="hidden md:block" />
                <span className="italic text-gold/80"> vivir e invertir.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {zones.map((zone, i) => (
                <div
                  key={zone.name}
                  className={`group bg-white border border-navy/8 p-7 hover:border-gold/40 hover:shadow-lg transition-all duration-400 ${i === zones.length - 1 && zones.length % 3 !== 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin size={16} className="text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <h3 className="font-serif text-navy text-lg leading-tight">{zone.name}</h3>
                  </div>
                  <p className="font-sans text-sm text-cool-gray leading-relaxed">{zone.desc}</p>
                </div>
              ))}
              {/* CABA extra card */}
              <div className="group bg-navy/[0.04] border border-navy/8 p-7 hover:border-gold/40 hover:shadow-lg transition-all duration-400">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={16} className="text-gold mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <h3 className="font-serif text-navy text-lg leading-tight">CABA</h3>
                </div>
                <p className="font-sans text-sm text-cool-gray leading-relaxed">
                  Palermo, Recoleta, Belgrano y otras zonas premium de la Ciudad Autónoma de Buenos Aires.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 3 — POR QUÉ CONMIGO
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-navy/[0.04] py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Mi propuesta
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                ¿Por qué comprar<br />con mi representación?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  Icon: Search,
                  title: "Acceso ampliado al mercado",
                  body: "Además de las propiedades publicadas en portales, tengo acceso a listings fuera de mercado y una red activa de colegas. Más opciones para encontrar lo que buscás.",
                },
                {
                  Icon: HandshakeIcon,
                  title: "Negociación profesional",
                  body: "Negocio en tu nombre con conocimiento real del mercado local. Un buen agente puede ahorrarte más de lo que cuesta la comisión en la primera oferta.",
                },
                {
                  Icon: FileCheck,
                  title: "Proceso claro y sin burocracia",
                  body: "Me encargo de los trámites, coordino visitas, reviso documentación y te explico cada paso del proceso de compra. Sin sorpresas.",
                },
              ].map(({ Icon, title, body }) => (
                <div
                  key={title}
                  className="group bg-white border border-navy/8 p-8 hover:border-gold/40 hover:shadow-lg transition-all duration-400"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gold/10 mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon size={20} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-navy text-xl mb-3">{title}</h3>
                  <p className="font-sans text-sm text-cool-gray leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 4 — PROCESO DE COMPRA
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Paso a paso
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                ¿Cómo es el proceso de compra?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  n: "01",
                  title: "Consulta inicial",
                  body: "Me contás qué buscás: tipo de propiedad, zona, presupuesto y prioridades. Definimos juntos el perfil ideal.",
                },
                {
                  n: "02",
                  title: "Búsqueda activa",
                  body: "Accedo a propiedades publicadas y fuera de mercado que se ajusten a tu criterio. Te presento opciones concretas.",
                },
                {
                  n: "03",
                  title: "Visitas y selección",
                  body: "Coordinamos visitas, analizamos cada opción y evaluamos el precio de mercado para que tomes la mejor decisión.",
                },
                {
                  n: "04",
                  title: "Oferta y cierre",
                  body: "Negocio en tu nombre, te acompaño en el boleto de compraventa y en la escritura hasta la entrega de llaves.",
                },
              ].map((step) => (
                <div key={step.n} className="relative bg-white border border-navy/8 p-7">
                  <span className="font-serif text-5xl text-gold/20 leading-none block mb-4">
                    {step.n}
                  </span>
                  <h3 className="font-serif text-navy text-lg mb-2">{step.title}</h3>
                  <p className="font-sans text-sm text-cool-gray leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 5 — SOBRE MÍ
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-navy py-20 md:py-28">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Text */}
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                    Sobre mí
                  </p>
                  <h2
                    className="font-serif text-cream leading-tight"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
                  >
                    Hola, soy<br />
                    <span className="text-gold italic">María Victoria.</span>
                  </h2>
                </div>
                <p className="font-sans text-cream/60 text-base leading-relaxed">
                  Soy agente inmobiliaria asociada a <strong className="text-cream">Coldwell Banker Wings</strong>, con más de 5 años de experiencia y más de 100 operaciones cerradas en zona norte y oeste de Buenos Aires.
                </p>
                <p className="font-sans text-cream/60 text-base leading-relaxed">
                  Si estás buscando una propiedad para vivir o invertir, te ayudo a encontrar la opción correcta, a negociar el mejor precio y a cerrar la operación sin complicaciones.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    "Acceso a propiedades publicadas y fuera de mercado",
                    "Conocimiento profundo del mercado local",
                    "Acompañamiento en toda la operación",
                    "Fotografía profesional en cada propiedad",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-cream/65">
                      <CheckCircle size={15} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 pt-3">
                  <LogoMV height={65} />
                  <span className="w-px h-8 bg-cream/15" />
                  <LogoColdwell height={32} className="opacity-60" />
                </div>
              </div>

              {/* Image */}
              <div className="relative order-first lg:order-last">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                    alt="María Victoria — Agente Inmobiliaria"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 hidden md:block bg-gold p-5 text-obsidian">
                  <p className="font-serif text-3xl font-medium leading-none">5+</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase mt-1">Años activa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 6 — TESTIMONIOS
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Clientes
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                Propiedades encontradas,<br />
                <span className="text-gold italic">operaciones cerradas.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white border border-navy/8 p-7 flex flex-col gap-5"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-cool-gray leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-navy/8">
                    <p className="font-serif text-navy text-base">{t.name}</p>
                    <p className="font-sans text-[11px] text-gold/70 mt-0.5">{t.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 7 — FAQ
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-navy/[0.04] py-20 md:py-28">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
              <div>
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                  FAQ
                </p>
                <h2
                  className="font-serif text-navy leading-tight mb-6"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
                >
                  Preguntas<br />frecuentes
                </h2>
                <p className="font-sans text-cool-gray text-sm leading-relaxed">
                  Todo lo que necesitás saber antes de empezar a buscar. Si tenés alguna duda extra, escribime directamente.
                </p>
                <a
                  href="https://wa.me/5491133616566?text=Hola%20Mar%C3%ADa%20Victoria%2C%20tengo%20una%20consulta%20sobre%20la%20compra%20de%20una%20propiedad."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 font-sans text-[11px] tracking-[0.12em] uppercase text-gold hover:text-gold/70 transition-colors duration-300 group"
                >
                  Preguntá por WhatsApp
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              <div>
                <LandingFaq items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 8 — FORMULARIO
        ───────────────────────────────────────────────────────────── */}
        <section id="formulario" className="bg-navy py-20 md:py-28">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">

              {/* Left — copy + contact */}
              <div className="space-y-8">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                    Empezá ahora
                  </p>
                  <h2
                    className="font-serif text-cream leading-tight"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
                  >
                    Contame qué<br />
                    <span className="text-gold italic">estás buscando.</span>
                  </h2>
                </div>
                <p className="font-sans text-cream/60 text-sm leading-relaxed max-w-sm">
                  Completá el formulario y en menos de 24 horas te presento opciones que se ajusten a tu búsqueda. Sin compromiso.
                </p>

                {/* Checklist */}
                <ul className="space-y-3">
                  {[
                    "Propiedades publicadas y fuera de mercado",
                    "Búsqueda personalizada según tus criterios",
                    "Negociación profesional en tu nombre",
                    "Acompañamiento hasta la escritura",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-cream/70">
                      <CheckCircle size={16} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Contact links */}
                <div className="pt-4 border-t border-cream/10 space-y-3">
                  <a
                    href="https://wa.me/5491133616566"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                  >
                    <Phone size={14} className="text-gold/60" />
                    +54 9 11 3361-6566
                  </a>
                  <a
                    href="mailto:victoria.gazzo@coldwellbanker.com.ar"
                    className="flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300 break-all"
                  >
                    <Mail size={14} className="text-gold/60 flex-shrink-0" />
                    victoria.gazzo@coldwellbanker.com.ar
                  </a>
                  <a
                    href="https://www.instagram.com/victoriagazzorealestate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                  >
                    <Instagram size={14} className="text-gold/60" />
                    @victoriagazzorealestate
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <div>
                <LandingContactForm
                  variant="comprar"
                  redirectTo="/invertir-en-propiedades/gracias"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CTA STRIP — ver propiedades
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-gold py-10">
          <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-serif text-obsidian text-xl">
              ¿Querés ver las propiedades disponibles ahora?
            </p>
            <Link
              href="/venta"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-obsidian text-cream font-sans text-[11px] font-semibold tracking-[0.12em] uppercase hover:bg-navy transition-all duration-300 group flex-shrink-0"
            >
              Ver propiedades
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            FOOTER MINIMAL
        ───────────────────────────────────────────────────────────── */}
        <footer className="bg-navy border-t border-cream/10 py-8">
          <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoMV height={60} />
              <span className="w-px h-5 bg-cream/15" />
              <LogoColdwell height={28} className="opacity-50" />
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/venta"
                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300 tracking-wide"
              >
                Ver propiedades
              </Link>
              <Link
                href="/"
                className="font-sans text-xs text-cream/40 hover:text-gold transition-colors duration-300 tracking-wide"
              >
                Inicio
              </Link>
            </div>
            <p className="font-sans text-[10px] text-cream/25">
              © {new Date().getFullYear()} María Victoria Real Estate
            </p>
          </div>
        </footer>

      </main>
    </>
  );
}

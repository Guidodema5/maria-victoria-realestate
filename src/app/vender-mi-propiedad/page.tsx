import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Camera, Megaphone, Users, CheckCircle, MapPin, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import LandingContactForm from "@/components/landing/LandingContactForm";
import LandingFaq from "@/components/landing/LandingFaq";
import type { FaqItem } from "@/components/landing/LandingFaq";
import LogoMV from "@/components/logo/LogoMV";
import LogoColdwell from "@/components/logo/LogoColdwell";

export const metadata: Metadata = {
  title: "Vendé tu propiedad al mejor precio | María Victoria Real Estate",
  description:
    "Tasación gratuita, fotografía profesional incluida y estrategia de venta personalizada. Agente inmobiliaria especialista en zona norte y oeste de Buenos Aires.",
  keywords:
    "vender propiedad Buenos Aires, tasación gratuita, venta inmuebles zona oeste, Coldwell Banker, agente inmobiliaria Buenos Aires",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://victoriagazzorealestate.com.ar/vender-mi-propiedad",
  },
  openGraph: {
    title: "Vendé tu propiedad al mejor precio",
    description:
      "Tasación gratuita + fotografía profesional incluida. Especialista en zona norte y oeste de Buenos Aires.",
    url: "https://victoriagazzorealestate.com.ar/vender-mi-propiedad",
    type: "website",
  },
};

// ── Schema markup ─────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Venta de propiedades — María Victoria Real Estate",
  description:
    "Tasación gratuita, fotografía profesional y estrategia de venta para propiedades en zona norte y oeste de Buenos Aires.",
  provider: {
    "@type": "RealEstateAgent",
    name: "María Victoria",
    telephone: "+5491133616566",
    email: "victoria.gazzo@coldwellbanker.com.ar",
    url: "https://victoriagazzorealestate.com.ar",
  },
  areaServed: "Buenos Aires, Argentina",
  serviceType: "Real Estate Sales",
};

// ── FAQ data ──────────────────────────────────────────────────────────
const faqs: FaqItem[] = [
  {
    q: "¿Cuánto cuesta la tasación?",
    a: "La tasación es completamente gratuita y sin compromiso. Realizo un análisis de mercado detallado y te entrego un valor real y fundamentado para tu propiedad.",
  },
  {
    q: "¿Cuánto tiempo demora en venderse una propiedad?",
    a: "Depende del precio, la presentación y la zona. Con una estrategia bien diseñada, el tiempo promedio en las zonas donde opero es de 60 a 120 días.",
  },
  {
    q: "¿Qué incluye el servicio de venta?",
    a: "Tasación gratuita, fotografía profesional, publicación en ZonaProp, Argenprop y MercadoLibre, difusión en redes sociales y base de compradores activa, gestión de consultas, coordinación de visitas y acompañamiento hasta la escritura.",
  },
  {
    q: "¿Cuál es la comisión?",
    a: "La comisión estándar del mercado es del 3% + IVA sobre el precio final de venta, abonada al momento de la escritura. No hay costos previos.",
  },
  {
    q: "¿Trabajás en mi zona?",
    a: "Opero principalmente en Country Banco Provincia, Terravista, Campos de Alvarez, Haras María Eugenia, Parque Leloir y CABA. Si tu propiedad está en otra zona, contáctame y lo evaluamos juntos.",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────
const testimonials = [
  {
    text: "Las fotos que hizo de nuestra casa la transformaron completamente. En 3 semanas ya teníamos el boleto firmado y al precio que pedíamos.",
    name: "Martín y Cecilia R.",
    zone: "Parque Leloir",
  },
  {
    text: "Después de 4 meses con otra inmobiliaria sin resultados, con María Victoria vendimos en 6 semanas. Su estrategia de marketing es otra categoría.",
    name: "Alejandra G.",
    zone: "Terravista",
  },
  {
    text: "Muy profesional, siempre disponible y con mucho conocimiento del mercado. La fotografía profesional marcó la diferencia en las consultas.",
    name: "Diego F.",
    zone: "Country Banco Provincia",
  },
];

export default function VenderMiPropiedadPage() {
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
          aria-label="Vendé tu propiedad"
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
            alt="Interior de propiedad premium en Buenos Aires"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent hidden lg:block" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="container-site pt-28 pb-16 md:pb-20 lg:pb-24">
              <div className="max-w-xl lg:max-w-2xl">

                {/* Tag */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-5 h-px bg-gold" />
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/90">
                    Agente Inmobiliaria · Buenos Aires
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="font-serif text-cream mb-5 leading-[1.08]"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  Vendé tu propiedad<br />
                  <span className="text-gold italic">al mejor precio.</span>
                </h1>

                {/* Sub */}
                <p
                  className="font-sans text-cream/65 mb-8 leading-relaxed"
                  style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
                >
                  Tasación gratuita · fotografía profesional incluida · estrategia de venta personalizada.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-12">
                  <a
                    href="#formulario"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-obsidian font-sans text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-gold/90 active:scale-95 transition-all duration-300 group"
                  >
                    Quiero mi tasación gratuita
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://wa.me/5491133616566?text=Hola%20Mar%C3%ADa%20Victoria%2C%20quisiera%20una%20tasaci%C3%B3n%20gratuita%20de%20mi%20propiedad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/25 text-cream/80 font-sans text-[11px] font-medium tracking-[0.14em] uppercase hover:border-cream/60 hover:text-cream active:scale-95 transition-all duration-300"
                  >
                    <Phone size={13} />
                    WhatsApp directo
                  </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 border-t border-cream/10">
                  {[
                    { n: "+100", l: "Operaciones cerradas" },
                    { n: "5+",   l: "Años activa" },
                    { n: "100%", l: "Fotografía profesional" },
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
            SECCIÓN 2 — DIFERENCIADORES
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                ¿Por qué trabajar conmigo?
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                Una venta exitosa comienza por cómo<br className="hidden md:block" />
                <span className="italic text-gold/80"> se presenta</span> la propiedad.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  Icon: Camera,
                  title: "Fotografía profesional incluida",
                  body: "Cada propiedad que tomo en cartera recibe una sesión fotográfica profesional sin costo adicional. Las fotos de calidad reducen el tiempo de venta y maximizan el precio.",
                },
                {
                  Icon: Megaphone,
                  title: "Estrategia de marketing multicanal",
                  body: "Publicación en ZonaProp, Argenprop y MercadoLibre, más difusión activa en redes sociales y una base de compradores calificados. Más exposición, más consultas.",
                },
                {
                  Icon: Users,
                  title: "Acompañamiento hasta el final",
                  body: "Desde la tasación hasta la firma de escritura estoy presente en cada etapa. Gestiono consultas, coordino visitas y negocio en tu nombre.",
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
            SECCIÓN 3 — PROCESO
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-navy/[0.04] py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Paso a paso
              </p>
              <h2
                className="font-serif text-navy leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                ¿Cómo es el proceso de venta?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  n: "01",
                  title: "Tasación gratuita",
                  body: "Analizamos el mercado y definimos el precio justo para tu propiedad, sin ningún compromiso.",
                },
                {
                  n: "02",
                  title: "Estrategia de venta",
                  body: "Planificamos juntos la presentación, el precio y los canales de difusión más efectivos.",
                },
                {
                  n: "03",
                  title: "Fotografía y publicación",
                  body: "Realizamos la sesión fotográfica profesional y publicamos en los principales portales.",
                },
                {
                  n: "04",
                  title: "Gestión y cierre",
                  body: "Gestionamos consultas, coordinamos visitas y te acompañamos hasta la escritura.",
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
            SECCIÓN 4 — SOBRE MÍ
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28" id="sobre-mi">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                    alt="María Victoria — Agente Inmobiliaria"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -right-5 hidden md:block bg-gold p-5 text-obsidian">
                  <p className="font-serif text-3xl font-medium leading-none">+100</p>
                  <p className="font-sans text-[10px] tracking-widest uppercase mt-1">Operaciones</p>
                </div>
              </div>

              {/* Text */}
              <div className="space-y-6">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                    Sobre mí
                  </p>
                  <h2
                    className="font-serif text-navy leading-tight"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
                  >
                    Hola, soy<br />
                    <span className="italic">María Victoria.</span>
                  </h2>
                </div>
                <p className="font-sans text-cool-gray text-base leading-relaxed">
                  Soy agente inmobiliaria asociada a <strong className="text-navy">Coldwell Banker Wings</strong>, con más de 5 años de experiencia y más de 100 operaciones cerradas en zona norte y oeste de Buenos Aires.
                </p>
                <p className="font-sans text-cool-gray text-base leading-relaxed">
                  Mi diferencial es la <strong className="text-navy">fotografía profesional</strong> que incluyo en cada tasación y el acompañamiento personalizado en cada operación. Sé cómo presentar tu propiedad para que se venda al precio correcto, en el menor tiempo posible.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <LogoMV height={70} />
                  <span className="w-px h-8 bg-navy/15" />
                  <LogoColdwell height={36} className="opacity-70" />
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  {["Country Banco Provincia", "Terravista", "Campos de Alvarez", "Haras Mª Eugenia", "Parque Leloir"].map((z) => (
                    <span key={z} className="inline-flex items-center gap-1.5 font-sans text-[11px] text-cool-gray">
                      <MapPin size={10} className="text-gold/70" />
                      {z}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 5 — TESTIMONIOS
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-navy py-20 md:py-28">
          <div className="container-site">
            <div className="max-w-xl mb-14">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Clientes
              </p>
              <h2
                className="font-serif text-cream leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
              >
                Resultados que<br />
                <span className="text-gold italic">hablan por sí solos.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white/[0.05] border border-cream/10 p-7 flex flex-col gap-5"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="font-sans text-sm text-cream/70 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-cream/10">
                    <p className="font-serif text-cream text-base">{t.name}</p>
                    <p className="font-sans text-[11px] text-gold/70 mt-0.5">{t.zone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECCIÓN 6 — FAQ
        ───────────────────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
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
                  ¿Tenés dudas sobre el proceso de venta? Acá respondemos las más comunes. Si no encontrás tu respuesta, escribime directamente.
                </p>
                <a
                  href="https://wa.me/5491133616566?text=Hola%20Mar%C3%ADa%20Victoria%2C%20tengo%20una%20consulta%20sobre%20la%20venta%20de%20mi%20propiedad."
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
            SECCIÓN 7 — FORMULARIO
        ───────────────────────────────────────────────────────────── */}
        <section id="formulario" className="bg-navy py-20 md:py-28">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">

              {/* Left — copy + contact */}
              <div className="space-y-8">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                    Tasación gratuita
                  </p>
                  <h2
                    className="font-serif text-cream leading-tight"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
                  >
                    Solicitá tu<br />
                    <span className="text-gold italic">tasación gratuita.</span>
                  </h2>
                </div>
                <p className="font-sans text-cream/60 text-sm leading-relaxed max-w-sm">
                  Completá el formulario y te contacto en menos de 24 horas con una valuación real de tu propiedad. Sin compromiso.
                </p>

                {/* Checklist */}
                <ul className="space-y-3">
                  {[
                    "Análisis de mercado comparativo",
                    "Fotografía profesional incluida",
                    "Estrategia de publicación personalizada",
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
                  variant="vender"
                  redirectTo="/vender-mi-propiedad/gracias"
                />
              </div>
            </div>
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

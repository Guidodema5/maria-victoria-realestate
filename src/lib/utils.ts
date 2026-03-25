import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PropertyCurrency } from '@/types';

// Merge de clases Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formato de precio
export function formatPrice(price: number, currency: PropertyCurrency): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

// Formato de superficie
export function formatSurface(surface: number | null): string {
  if (!surface) return '—';
  return `${surface} m²`;
}

// Obtener imagen principal de una propiedad
export function getMainImage(images: { url: string; is_main: boolean }[] | undefined): string {
  if (!images || images.length === 0) {
    return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
  }
  const main = images.find((img) => img.is_main);
  return main ? main.url : images[0].url;
}

// URL de WhatsApp con mensaje predefinido
export function getWhatsAppUrl(propertyTitle?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491133616566';
  const message = propertyTitle
    ? `Hola María Victoria, me interesa la propiedad: "${propertyTitle}". ¿Podemos hablar?`
    : 'Hola María Victoria, me gustaría recibir más información sobre sus propiedades.';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Slug simple para URLs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

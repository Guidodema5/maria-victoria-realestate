// ============================================================
// TIPOS PRINCIPALES — María Victoria Real Estate
// ============================================================

export type PropertyType = 'casa' | 'departamento' | 'ph' | 'lote' | 'local';
export type PropertyOperation = 'venta' | 'alquiler';
export type PropertyCurrency = 'USD' | 'ARS';
export type PropertyStatus = 'activa' | 'reservada' | 'vendida' | 'pausada';
export type ContactStatus = 'nueva' | 'leida' | 'respondida';

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  is_main: boolean;
  order: number;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  operation: PropertyOperation;
  zone: string;
  price: number;
  currency: PropertyCurrency;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number;
  total_surface: number | null;
  covered_surface: number | null;
  age: number | null;
  expenses: number | null;
  description: string | null;
  featured: boolean;
  status: PropertyStatus;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
  // Joined
  property_images?: PropertyImage[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  property_id: string | null;
  status: ContactStatus;
  created_at: string;
  // Joined
  properties?: Pick<Property, 'id' | 'title'> | null;
}

// ============================================================
// TIPOS PARA FORMULARIOS
// ============================================================

export interface PropertyFilters {
  operation?: PropertyOperation;
  type?: PropertyType;
  zone?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  currency?: PropertyCurrency;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  property_id?: string;
  intent?: string;
}

// ============================================================
// UTILIDADES DE DISPLAY
// ============================================================

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  casa: 'Casa',
  departamento: 'Departamento',
  ph: 'PH',
  lote: 'Lote',
  local: 'Local',
};

export const PROPERTY_OPERATION_LABELS: Record<PropertyOperation, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  activa: 'Activa',
  reservada: 'Reservada',
  vendida: 'Vendida',
  pausada: 'Pausada',
};

export const ZONES = [
  'Country Banco Provincia',
  'Terravista',
  'Campos de Alvarez',
  'Haras María Eugenia',
  'Parque Leloir',
  'San Diego, Zona Oeste',
  'Lagoon Pilar, Zona Norte',
  'Nordelta, Zona Norte',
  'Morón, AMBA Oeste',
  'CABA — Palermo',
  'CABA — Recoleta',
  'CABA — Belgrano',
  'CABA — Otro',
  'Otro',
] as const;

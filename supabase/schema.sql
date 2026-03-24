-- ============================================================
-- MARIA VICTORIA REAL ESTATE — Supabase Schema
-- Ejecutar en: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ============================================================
-- EXTENSIONES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================
CREATE TYPE property_type AS ENUM ('casa', 'departamento', 'ph', 'lote', 'local');
CREATE TYPE property_operation AS ENUM ('venta', 'alquiler');
CREATE TYPE property_currency AS ENUM ('USD', 'ARS');
CREATE TYPE property_status AS ENUM ('activa', 'reservada', 'vendida', 'pausada');
CREATE TYPE contact_status AS ENUM ('nueva', 'leida', 'respondida');

-- ============================================================
-- TABLA: properties
-- ============================================================
CREATE TABLE IF NOT EXISTS properties (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  type            property_type NOT NULL,
  operation       property_operation NOT NULL,
  zone            TEXT NOT NULL,
  price           NUMERIC(14, 2) NOT NULL,
  currency        property_currency NOT NULL DEFAULT 'USD',
  rooms           INTEGER,
  bedrooms        INTEGER,
  bathrooms       INTEGER,
  parking         INTEGER DEFAULT 0,
  total_surface   NUMERIC(10, 2),
  covered_surface NUMERIC(10, 2),
  age             INTEGER,
  expenses        NUMERIC(10, 2),
  description     TEXT,
  featured        BOOLEAN NOT NULL DEFAULT false,
  status          property_status NOT NULL DEFAULT 'activa',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_properties_operation ON properties(operation);
CREATE INDEX idx_properties_status    ON properties(status);
CREATE INDEX idx_properties_featured  ON properties(featured);
CREATE INDEX idx_properties_zone      ON properties(zone);
CREATE INDEX idx_properties_type      ON properties(type);
CREATE INDEX idx_properties_created   ON properties(created_at DESC);

-- Trigger: actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- TABLA: property_images
-- ============================================================
CREATE TABLE IF NOT EXISTS property_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  is_main     BOOLEAN NOT NULL DEFAULT false,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_is_main     ON property_images(property_id, is_main);

-- ============================================================
-- TABLA: contacts
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status      contact_status NOT NULL DEFAULT 'nueva',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_status     ON contacts(status);
CREATE INDEX idx_contacts_created    ON contacts(created_at DESC);
CREATE INDEX idx_contacts_property   ON contacts(property_id);

-- ============================================================
-- STORAGE BUCKET: property-images
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Properties: lectura pública, escritura solo autenticados
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "properties_public_read"
  ON properties FOR SELECT
  TO anon, authenticated
  USING (status = 'activa' OR status = 'reservada');

CREATE POLICY "properties_admin_all"
  ON properties FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Property images: lectura pública, escritura solo autenticados
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "property_images_public_read"
  ON property_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "property_images_admin_all"
  ON property_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contacts: inserción pública (formulario), lectura/gestión solo autenticados
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contacts_public_insert"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "contacts_admin_all"
  ON contacts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage: subida solo autenticados, lectura pública
CREATE POLICY "storage_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'property-images');

CREATE POLICY "storage_admin_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "storage_admin_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-images');

-- ============================================================
-- DATOS DE EJEMPLO (propiedades placeholder para desarrollo)
-- ============================================================
INSERT INTO properties (title, type, operation, zone, price, currency, rooms, bedrooms, bathrooms, parking, total_surface, covered_surface, age, description, featured, status)
VALUES
  (
    'Casa con jardín en San Diego Country Club',
    'casa', 'venta', 'San Diego, Zona Oeste',
    285000, 'USD', 4, 3, 2, 2, 450, 280, 8,
    'Espectacular casa de categoría en San Diego Country Club. Amplios espacios, jardín con parrilla y piscina. Terminaciones de primera calidad, luminosidad excepcional. Ideal para familia.',
    true, 'activa'
  ),
  (
    'Departamento premium en Nordelta Centro',
    'departamento', 'venta', 'Nordelta, Zona Norte',
    195000, 'USD', 3, 2, 2, 1, 120, 110, 3,
    'Departamento de diseño en el corazón de Nordelta. Vistas al lago, amenities de lujo, seguridad 24hs. Cocina integrada, balcón amplio, materiales de primera selección.',
    true, 'activa'
  ),
  (
    'Casa en Lagoon Pilar — frente al espejo de agua',
    'casa', 'venta', 'Lagoon Pilar, Zona Norte',
    420000, 'USD', 5, 4, 3, 2, 600, 350, 2,
    'Propiedad única frente al espejo de agua de Lagoon Pilar. Arquitectura contemporánea, acceso directo al lago, materiales importados. Una oportunidad excepcional en el segmento más exclusivo.',
    true, 'activa'
  ),
  (
    'PH con terraza en Morón Centro',
    'ph', 'venta', 'Morón, AMBA Oeste',
    145000, 'USD', 4, 3, 2, 1, 180, 150, 5,
    'PH de categoría con terraza privada de 30m². Doble altura en living, cocina americana equipada, dormitorio en suite. Ubicación privilegiada a metros del centro de Morón.',
    false, 'activa'
  ),
  (
    'Casa en alquiler — San Diego, pileta y parrilla',
    'casa', 'alquiler', 'San Diego, Zona Oeste',
    850000, 'ARS', 4, 3, 2, 2, 380, 240, 10,
    'Casa con todos los servicios en San Diego. Pileta, parrilla, jardín. Zona tranquila con acceso controlado. Ideal para familia que busca calidad de vida en country.',
    false, 'activa'
  ),
  (
    'Departamento 2 ambientes en CABA — Palermo',
    'departamento', 'alquiler', 'CABA — Palermo',
    320000, 'ARS', 2, 1, 1, 0, 55, 52, 6,
    'Moderno departamento en Palermo. Luminoso, con balcón y vistas despejadas. Excelente estado de conservación, edificio con amenities.',
    false, 'activa'
  );

-- Imágenes placeholder (Unsplash — propiedades premium)
INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', true, 0
FROM properties WHERE title = 'Casa con jardín en San Diego Country Club';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', false, 1
FROM properties WHERE title = 'Casa con jardín en San Diego Country Club';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', true, 0
FROM properties WHERE title = 'Departamento premium en Nordelta Centro';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', false, 1
FROM properties WHERE title = 'Departamento premium en Nordelta Centro';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', true, 0
FROM properties WHERE title = 'Casa en Lagoon Pilar — frente al espejo de agua';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', false, 1
FROM properties WHERE title = 'Casa en Lagoon Pilar — frente al espejo de agua';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', true, 0
FROM properties WHERE title = 'PH con terraza en Morón Centro';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', true, 0
FROM properties WHERE title = 'Casa en alquiler — San Diego, pileta y parrilla';

INSERT INTO property_images (property_id, url, is_main, "order")
SELECT id, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80', true, 0
FROM properties WHERE title = 'Departamento 2 ambientes en CABA — Palermo';

-- ============================================================
-- FIN DEL SCHEMA
-- ============================================================

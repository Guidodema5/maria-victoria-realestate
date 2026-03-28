import { createClient } from "./server";
import type { Property, PropertyFilters } from "@/types";

export async function getFeaturedProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(*)`)
    .eq("featured", true)
    .eq("status", "activa")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
  return data ?? [];
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select(`*, property_images(*)`)
    .eq("status", "activa")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (filters.operation) query = query.eq("operation", filters.operation);
  if (filters.type) query = query.eq("type", filters.type);
  if (filters.zone) query = query.eq("zone", filters.zone);
  if (filters.rooms) query = query.gte("rooms", filters.rooms);
  if (filters.minPrice) query = query.gte("price", filters.minPrice);
  if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
  return data ?? [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(*)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }
  return data;
}

export async function getRelatedProperties(
  propertyId: string,
  zone: string,
  type: string
): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(*)`)
    .eq("status", "activa")
    .neq("id", propertyId)
    .or(`zone.eq.${zone},type.eq.${type}`)
    .limit(3);

  if (error) return [];
  return data ?? [];
}

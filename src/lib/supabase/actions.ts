"use server";

import { createClient } from "./server";
import type { ContactFormData } from "@/types";

export async function updatePropertySortOrder(
  updates: { id: string; sort_order: number }[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  for (const { id, sort_order } of updates) {
    const { error } = await supabase
      .from("properties")
      .update({ sort_order })
      .eq("id", id);
    if (error) {
      console.error("Error updating sort_order:", error);
      return { success: false, error: "No se pudo guardar el orden." };
    }
  }
  return { success: true };
}

export async function submitContact(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("contacts").insert([
    {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      message: data.message.trim(),
      property_id: data.property_id || null,
      ...(data.intent ? { intent: data.intent } : {}),
    },
  ]);

  if (error) {
    console.error("Error submitting contact:", error);
    return { success: false, error: "No pudimos enviar tu mensaje. Intentá de nuevo." };
  }

  return { success: true };
}

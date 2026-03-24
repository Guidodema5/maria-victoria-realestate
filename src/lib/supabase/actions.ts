"use server";

import { createClient } from "./server";
import type { ContactFormData } from "@/types";

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
    },
  ]);

  if (error) {
    console.error("Error submitting contact:", error);
    return { success: false, error: "No pudimos enviar tu mensaje. Intentá de nuevo." };
  }

  return { success: true };
}

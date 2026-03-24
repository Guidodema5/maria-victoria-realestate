"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Status = "nueva" | "leida" | "respondida";

const nextStatus: Record<Status, Status> = {
  nueva: "leida",
  leida: "respondida",
  respondida: "nueva",
};

const labels: Record<Status, string> = {
  nueva: "Marcar leída",
  leida: "Marcar respondida",
  respondida: "Reabrir",
};

export default function MarkReadButton({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const current = status as Status;

  const handleClick = async () => {
    const supabase = createClient();
    await supabase
      .from("contacts")
      .update({ status: nextStatus[current] })
      .eq("id", id);
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="font-sans text-[10px] tracking-wide uppercase text-gray-400 hover:text-navy transition-colors border border-gray-200 hover:border-navy px-2 py-1 rounded"
    >
      {labels[current]}
    </button>
  );
}

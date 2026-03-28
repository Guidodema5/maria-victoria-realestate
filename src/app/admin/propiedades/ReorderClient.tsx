"use client";

import { useState, useTransition } from "react";
import { ArrowUp, ArrowDown, Save, GripVertical } from "lucide-react";
import { updatePropertySortOrder } from "@/lib/supabase/actions";

interface ReorderItem {
  id: string;
  title: string;
  zone: string;
  operation: string;
}

interface Props {
  properties: ReorderItem[];
}

export default function ReorderClient({ properties }: Props) {
  const [items, setItems] = useState<ReorderItem[]>(properties);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setItems(next);
    setSaved(false);
  }

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    setOverIndex(index);
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    move(dragIndex, index);
    setDragIndex(null);
    setOverIndex(null);
  }

  function handleSave() {
    startTransition(async () => {
      const updates = items.map((item, i) => ({ id: item.id, sort_order: i + 1 }));
      const result = await updatePropertySortOrder(updates);
      if (result.success) setSaved(true);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-sans text-sm text-gray-500">
          Arrastrá o usá las flechas para reordenar. El orden se aplica en la web.
        </p>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-navy text-cream font-sans text-sm rounded hover:bg-navy/80 disabled:opacity-50 transition-colors"
        >
          <Save size={14} />
          {isPending ? "Guardando..." : saved ? "✓ Guardado" : "Guardar orden"}
        </button>
      </div>

      <div className="bg-white rounded border border-gray-100 divide-y divide-gray-50">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              overIndex === index ? "bg-gold/10" : "hover:bg-gray-50"
            } ${dragIndex === index ? "opacity-50" : ""}`}
          >
            <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
            <span className="font-sans text-xs text-gray-300 w-5 text-right flex-shrink-0">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-navy font-medium truncate">{item.title}</p>
              <p className="font-sans text-xs text-gray-400">{item.zone}</p>
            </div>
            <span className={`font-sans text-[10px] uppercase px-2 py-0.5 rounded flex-shrink-0 ${
              item.operation === "venta" ? "bg-navy/10 text-navy" : "bg-gold/10 text-gold"
            }`}>
              {item.operation}
            </span>
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              <button
                onClick={() => move(index, index - 1)}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-navy disabled:opacity-20 transition-colors"
                aria-label="Subir"
              >
                <ArrowUp size={13} />
              </button>
              <button
                onClick={() => move(index, index + 1)}
                disabled={index === items.length - 1}
                className="p-1 text-gray-400 hover:text-navy disabled:opacity-20 transition-colors"
                aria-label="Bajar"
              >
                <ArrowDown size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

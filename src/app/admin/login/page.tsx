"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-serif text-2xl text-cream font-semibold">MARIA VICTORIA</p>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold mt-1">
            panel de administración
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream/40 block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-b border-cream/20 focus:border-gold py-3 font-sans text-sm text-cream placeholder-cream/20 outline-none transition-colors duration-300"
              placeholder="admin@mariavictoria.com"
            />
          </div>

          <div>
            <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-cream/40 block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-cream/20 focus:border-gold py-3 font-sans text-sm text-cream placeholder-cream/20 outline-none transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-sans text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold text-obsidian font-sans text-sm font-medium tracking-[0.08em] uppercase hover:bg-gold/90 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

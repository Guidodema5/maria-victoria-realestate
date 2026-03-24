"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoMVProps {
  className?: string;
  height?: number;
  linkWrapper?: boolean;
}

function LogoFallback({ height }: { height: number }) {
  return (
    <span
      className="font-serif tracking-tight leading-none select-none text-cream"
      style={{ fontSize: height * 0.45, letterSpacing: "-0.02em" }}
    >
      MV<span className="text-gold">·</span>RE
    </span>
  );
}

export default function LogoMV({ className, height = 52, linkWrapper = true }: LogoMVProps) {
  const [error, setError] = useState(false);

  const content = error ? (
    <LogoFallback height={height} />
  ) : (
    <Image
      src="/logo-mv.png"
      alt="Maria Victoria Real Estate"
      height={height}
      width={height * 1.6}
      className={cn("object-contain", className)}
      priority
      onError={() => setError(true)}
    />
  );

  if (!linkWrapper) return content;

  return (
    <Link href="/" aria-label="María Victoria Real Estate — Inicio">
      {content}
    </Link>
  );
}

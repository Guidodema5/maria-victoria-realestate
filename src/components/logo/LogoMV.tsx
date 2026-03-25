"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoMVProps {
  className?: string;
  height?: number;
  linkWrapper?: boolean;
}

export default function LogoMV({ className, height = 52, linkWrapper = true }: LogoMVProps) {
  const [imgError, setImgError] = useState(false);

  const content = (
    <span className={`inline-flex items-center ${className ?? ""}`}>
      {!imgError ? (
        <Image
          src="/logo-mv.png"
          alt="María Victoria Real Estate"
          height={height}
          width={height}
          priority
          style={{ height: `${height}px`, width: `${height}px`, objectFit: "contain", flexShrink: 0 }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex flex-col leading-none select-none gap-0.5">
          <span className="font-serif text-cream tracking-[0.13em] uppercase" style={{ fontSize: 17 }}>
            Maria Victoria
          </span>
          <span className="font-sans text-gold tracking-[0.26em] uppercase" style={{ fontSize: 10 }}>
            real estate
          </span>
        </span>
      )}
    </span>
  );

  if (!linkWrapper) return content;

  return (
    <Link href="/" aria-label="María Victoria Real Estate — Inicio">
      {content}
    </Link>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoMVProps {
  className?: string;
  height?: number;
  linkWrapper?: boolean;
  variant?: "dark" | "light";
}

function LogoSVG({ height, variant = "dark" }: { height: number; variant?: "dark" | "light" }) {
  const textColor = variant === "dark" ? "#F5F0EB" : "#1B2A4A";
  const gold = "#C9A96E";
  const w = height * 5.5;

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="María Victoria Real Estate"
      role="img"
    >
      {/* Double-peak roof icon — matches actual logo */}
      {/* Back roof peak (smaller, offset right) */}
      <polyline
        points={`${height * 0.32},${height * 0.52} ${height * 0.54},${height * 0.22} ${height * 0.76},${height * 0.52}`}
        stroke={textColor}
        strokeWidth={height * 0.038}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
      {/* Front roof peak (main, wider) */}
      <polyline
        points={`${height * 0.14},${height * 0.58} ${height * 0.44},${height * 0.20} ${height * 0.74},${height * 0.58}`}
        stroke={textColor}
        strokeWidth={height * 0.042}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Horizontal base line */}
      <line
        x1={height * 0.14}
        y1={height * 0.58}
        x2={height * 0.76}
        y2={height * 0.58}
        stroke={textColor}
        strokeWidth={height * 0.038}
        strokeLinecap="round"
      />
      {/* Small chimney */}
      <rect
        x={height * 0.38}
        y={height * 0.10}
        width={height * 0.075}
        height={height * 0.12}
        fill={textColor}
        rx={height * 0.01}
      />

      {/* MARIA VICTORIA */}
      <text
        x={height * 0.88}
        y={height * 0.46}
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="600"
        fill={textColor}
        style={{ fontSize: height * 0.32 }}
        letterSpacing="0.14em"
      >
        MARIA VICTORIA
      </text>

      {/* real estate */}
      <text
        x={height * 0.88}
        y={height * 0.78}
        fontFamily="'Inter', sans-serif"
        fontWeight="300"
        fill={gold}
        style={{ fontSize: height * 0.22 }}
        letterSpacing="0.28em"
      >
        real estate
      </text>
    </svg>
  );
}

export default function LogoMV({ className, height = 52, linkWrapper = true, variant = "dark" }: LogoMVProps) {
  const [usePNG, setUsePNG] = useState(true);

  // If PNG is transparent and loads fine, use it. Otherwise fallback to SVG.
  const content = usePNG ? (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {/* PNG icon — compact */}
      <Image
        src="/logo-mv.png"
        alt=""
        height={height * 0.75}
        width={height * 0.75}
        priority
        style={{ height: `${height * 0.75}px`, width: `${height * 0.75}px`, objectFit: "contain", flexShrink: 0, opacity: 0.92 }}
        onError={() => setUsePNG(false)}
      />
      {/* Text — fixed sizes for readability regardless of height */}
      <span className="flex flex-col leading-none select-none gap-0.5">
        <span className="font-serif text-cream tracking-[0.13em] uppercase" style={{ fontSize: 17 }}>
          Maria Victoria
        </span>
        <span className="font-sans text-gold tracking-[0.26em] uppercase" style={{ fontSize: 10 }}>
          real estate
        </span>
      </span>
    </span>
  ) : (
    <span className={className}>
      <LogoSVG height={height} variant={variant} />
    </span>
  );

  if (!linkWrapper) return content;

  return (
    <Link href="/" aria-label="María Victoria Real Estate — Inicio">
      {content}
    </Link>
  );
}

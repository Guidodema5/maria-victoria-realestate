"use client";

import Link from "next/link";

interface LogoMVProps {
  className?: string;
  height?: number;
  linkWrapper?: boolean;
  /** dark = blanco sobre transparente (para navbar/footer navy), light = navy sobre transparente (para fondo claro) */
  variant?: "dark" | "light";
}

function LogoSVG({ height, variant = "dark" }: { height: number; variant?: "dark" | "light" }) {
  const textColor = variant === "dark" ? "#F5F0EB" : "#1B2A4A";
  const gold = "#C9A96E";
  const w = height * 3.2;

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
      {/* Roof icon */}
      <polyline
        points={`${height * 0.28},${height * 0.45} ${height * 0.5},${height * 0.18} ${height * 0.72},${height * 0.45}`}
        stroke={gold}
        strokeWidth={height * 0.045}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1={height * 0.35}
        y1={height * 0.45}
        x2={height * 0.35}
        y2={height * 0.68}
        stroke={gold}
        strokeWidth={height * 0.04}
        strokeLinecap="round"
      />
      <line
        x1={height * 0.65}
        y1={height * 0.45}
        x2={height * 0.65}
        y2={height * 0.68}
        stroke={gold}
        strokeWidth={height * 0.04}
        strokeLinecap="round"
      />
      <line
        x1={height * 0.28}
        y1={height * 0.68}
        x2={height * 0.72}
        y2={height * 0.68}
        stroke={gold}
        strokeWidth={height * 0.04}
        strokeLinecap="round"
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
  const content = (
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

import Image from "next/image";

interface LogoColdwellProps {
  height?: number;
  className?: string;
}

export default function LogoColdwell({ height = 48, className }: LogoColdwellProps) {
  return (
    <Image
      src="/logo-coldwell.png"
      alt="Coldwell Banker Wings"
      height={height}
      width={height * 3}
      className={className}
      style={{ height: `${height}px`, width: "auto", objectFit: "contain" }}
    />
  );
}

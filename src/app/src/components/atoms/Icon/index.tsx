import React from "react";

export interface IconProps {
  name?: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 16 }: IconProps) {
  // Simple placeholder icon — replace with your real SVGs later.
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      role="img"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default Icon;

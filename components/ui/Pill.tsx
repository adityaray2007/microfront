import React from "react";

interface PillProps {
  children: React.ReactNode;
  dot?: boolean;
  variant?: "outline" | "critical" | "high" | "medium" | "accent" | "muted";
  className?: string;
}

export function Pill({
  children,
  dot = false,
  variant = "outline",
  className = "",
}: PillProps) {
  let styleClasses = "border-[#e5e5e5] bg-[#f4f4f5] text-[#525252]";

  switch (variant) {
    case "critical":
      // Critical = solid black with white text in light theme
      styleClasses = "border-black bg-black text-white font-semibold";
      break;
    case "high":
      // High = black outline with black text
      styleClasses = "border-black bg-transparent text-black font-semibold";
      break;
    case "medium":
      // Medium = grey outline with grey text
      styleClasses = "border-[#a1a1aa] bg-transparent text-[#71717a]";
      break;
    case "accent":
      // Accent = orange border / text
      styleClasses = "border-[#ff3000]/30 bg-[#ff3000]/10 text-[#ff3000] font-medium";
      break;
    case "outline":
    default:
      styleClasses = "border-[#e5e5e5] bg-[#f4f4f5] text-[#525252]";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${styleClasses} ${className}`}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#ff3000] inline-block animate-pulse"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

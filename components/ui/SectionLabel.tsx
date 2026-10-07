"use client";

import React from "react";

interface SectionLabelProps {
  num: string;
  label: string;
  className?: string;
}

export function SectionLabel({ num, label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-3.5 ${className}`}>
      <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff3000]">
        {num}.
      </span>
      <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#71717a]">
        {label}
      </span>
    </div>
  );
}

export default SectionLabel;

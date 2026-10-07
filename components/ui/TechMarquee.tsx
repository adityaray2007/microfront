"use client";

import React from "react";

interface TechMarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_MARQUEE_ITEMS = [
  "100% Offline",
  "Sub-50ms Rust Engine",
  "Shannon Entropy (4.2+ Bits)",
  "Zero Telemetry",
  "70+ Secret Detectors",
  "Pre-Commit Git Hook",
  "GitHub Actions CI/CD",
  "SARIF 2.1.0 Compliant",
  "Rotate-First Remediation",
  "Zero Cloud Calls",
  "Git History Exposure Scan",
  "Single Static Binary",
];

export function TechMarquee({
  items = DEFAULT_MARQUEE_ITEMS,
  className = "",
}: TechMarqueeProps) {
  // Duplicate list to achieve continuous infinite looping
  const trackItems = [...items, ...items, ...items];

  return (
    <div
      className={`border-y-2 border-black bg-white overflow-hidden py-0 select-none relative z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="flex overflow-hidden">
        <div
          className="swiss-marquee-track flex items-center whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {trackItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 py-3.5 text-xs font-mono font-black uppercase tracking-widest text-[#09090b]"
            >
              <span>{item}</span>
              <span className="text-[#ff3000] font-black text-sm select-none">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechMarquee;

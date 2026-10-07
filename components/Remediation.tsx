import React from "react";
import { REMEDIATION_STEPS, SAFETY_STRIP_CHIPS } from "@/lib/content";
import { Pill } from "./ui/Pill";
import { SectionLabel } from "./ui/SectionLabel";

export function Remediation() {
  return (
    <section className="pt-20 md:pt-28 pb-8 md:pb-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel num="05" label="REMEDIATION PROTOCOL" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090b] mb-3">
            Found a secret? Do this, in this order.
          </h2>
          <p className="text-base text-[#71717a]">
            Remediation is an operational protocol, not just a git commit.
          </p>
        </div>

        {/* 4 Numbered Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {REMEDIATION_STEPS.map((step) => (
            <div
              key={step.num}
              className={`swiss-zone-card rounded-lg p-6 flex flex-col justify-between transition-all ${
                step.doFirst
                  ? "bg-white border-2 border-[#ff3000] shadow-[0_4px_24px_rgba(255,48,0,0.15)]"
                  : "bg-[#fafafa] border border-[#e5e5e5] hover:border-[#a1a1aa] shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#71717a] font-medium">
                    STEP {step.num}
                  </span>
                  {step.doFirst && (
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#ff3000]/10 text-[#ff3000] border border-[#ff3000]/40 font-bold">
                      DO THIS FIRST
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-[#09090b] font-mono mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#525252] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Strip (3 small outlined chips) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-[#e5e5e5]">
          {SAFETY_STRIP_CHIPS.map((chip) => (
            <Pill key={chip} variant="outline">
              {chip}
            </Pill>
          ))}
        </div>
      </div>
    </section>
  );
}

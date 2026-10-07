import React from "react";
import { ArrowRight } from "lucide-react";
import { PROBLEM_CONTENT } from "@/lib/content";
import { SectionLabel } from "./ui/SectionLabel";

export function Problem() {
  return (
    <section className="py-20 md:py-28 border-b border-[#e5e5e5] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <SectionLabel num="01" label={PROBLEM_CONTENT.label} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090b] mb-4">
            {PROBLEM_CONTENT.title}
          </h2>
          <p className="text-base text-[#525252] leading-relaxed">
            {PROBLEM_CONTENT.intro}
          </p>
        </div>

        {/* 3 Timeline Cards with Arrow Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {PROBLEM_CONTENT.cards.map((card, idx) => (
            <div key={card.step} className="relative flex flex-col">
              <div
                className={`swiss-zone-card flex-1 rounded-lg p-6 flex flex-col justify-between transition-all ${
                  card.isCritical
                    ? "bg-white border-2 border-[#ff3000] shadow-[0_4px_24px_rgba(255,48,0,0.15)]"
                    : "bg-[#fafafa] border border-[#e5e5e5] hover:border-[#a1a1aa]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#71717a] font-medium">
                      STEP {card.step}
                    </span>
                    {card.isCritical && (
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#ff3000] text-white font-semibold shadow-xs">
                        Critical Threat
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#09090b] mb-2 font-mono">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#525252] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Arrow indicator between cards on desktop */}
              {idx < PROBLEM_CONTENT.cards.length - 1 && (
                <div
                  className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#e5e5e5] items-center justify-center text-[#71717a] shadow-sm"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

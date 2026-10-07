import React from "react";
import { Zap, Lock, Crosshair, RefreshCw } from "lucide-react";
import { FEATURES_DATA } from "@/lib/content";
import { SectionLabel } from "./ui/SectionLabel";

const ICON_MAP = {
  zap: Zap,
  lock: Lock,
  target: Crosshair,
  refresh: RefreshCw,
};

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 border-b border-[#e5e5e5] bg-[#fafafa] scroll-mt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel num="02" label="CORE CAPABILITIES" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090b] mb-3">
            Why developers choose secgrep
          </h2>
          <p className="text-base text-[#71717a]">
            Designed for local developer workflows with enterprise-grade rigor.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat) => {
            const IconComponent = ICON_MAP[feat.icon as keyof typeof ICON_MAP] || Zap;

            return (
              <div
                key={feat.title}
                className="swiss-zone-card rounded-lg border border-[#e5e5e5] bg-white p-6 flex flex-col justify-between hover:border-[#ff3000] transition-all shadow-xs group"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg border border-[#e5e5e5] bg-[#f4f4f5] flex items-center justify-center text-[#09090b] mb-5 group-hover:border-[#ff3000]/40 group-hover:text-[#ff3000] group-hover:bg-[#ff3000]/5 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#09090b] font-mono mb-2 group-hover:text-[#ff3000] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#525252] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

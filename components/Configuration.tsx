import React from "react";
import { Check } from "lucide-react";
import { CONFIG_BULLETS, CONFIG_TOML } from "@/lib/content";
import { CodeBlock } from "./ui/CodeBlock";

export function Configuration() {
  return (
    <section
      className="py-20 md:py-28 bg-[#070707] text-white border-t border-white/10 relative overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (Bullets) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff5500]">09.</span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40">REPO-LEVEL CONFIG</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
                Configure it your way
              </h2>
              <p className="text-base text-white/60">
                Optional repo-level configuration in plain TOML.
              </p>
            </div>

            <ul className="space-y-4">
              {CONFIG_BULLETS.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#ff3000]/40 bg-[#200e06] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(255,48,0,0.25)]">
                    <Check className="w-3 h-3 text-[#ff3000]" />
                  </div>
                  <span className="text-sm text-white/75 leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (TOML Code Box) */}
          <div className="lg:col-span-7">
            <CodeBlock code={CONFIG_TOML} filename="secgrep.toml" />
          </div>
        </div>
      </div>
    </section>
  );
}

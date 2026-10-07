"use client";

import React, { useState } from "react";
import { Anchor, Shield } from "lucide-react";
import {
  CI_WORKFLOW_YAML,
  HOOK_COMMAND,
  DEFENSE_IN_DEPTH_CARDS,
} from "@/lib/content";
import { CodeBlock } from "./ui/CodeBlock";

export function CICD() {
  const [activeTab, setActiveTab] = useState<"github" | "hooks">("github");

  return (
    <section
      id="ci-cd"
      className="py-20 md:py-28 bg-[#070707] text-white scroll-mt-16 relative overflow-hidden border-t border-white/10"
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
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff5500]">08.</span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40">PIPELINE ENFORCEMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Block leaks locally and in CI
          </h2>
          <p className="text-base text-white/60">
            Layered defense prevents mistakes on laptops and enforces rules on the server.
          </p>
        </div>

        {/* 2 Tabs */}
        <div className="mb-8">
          <div
            role="tablist"
            aria-label="CI/CD Integration Modes"
            className="flex items-center gap-2 border-b border-white/10 pb-3"
          >
            <button
              type="button"
              role="tab"
              id="tab-ci-github"
              aria-selected={activeTab === "github"}
              aria-controls="panel-ci-github"
              onClick={() => setActiveTab("github")}
              className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "github"
                  ? "bg-gradient-to-r from-[#241006] to-[#180a03] text-white border-2 border-[#ff3000] shadow-[0_0_20px_rgba(255,48,0,0.22)]"
                  : "border border-[#ff3000]/20 bg-[#120804] text-white/60 hover:text-white hover:border-[#ff3000]/50"
              }`}
            >
              GitHub Actions
            </button>
            <button
              type="button"
              role="tab"
              id="tab-ci-hooks"
              aria-selected={activeTab === "hooks"}
              aria-controls="panel-ci-hooks"
              onClick={() => setActiveTab("hooks")}
              className={`px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "hooks"
                  ? "bg-gradient-to-r from-[#241006] to-[#180a03] text-white border-2 border-[#ff3000] shadow-[0_0_20px_rgba(255,48,0,0.22)]"
                  : "border border-[#ff3000]/20 bg-[#120804] text-white/60 hover:text-white hover:border-[#ff3000]/50"
              }`}
            >
              Local Git Hooks
            </button>
          </div>

          {/* Tab Panels */}
          <div className="mt-4">
            {activeTab === "github" && (
              <div
                id="panel-ci-github"
                role="tabpanel"
                aria-labelledby="tab-ci-github"
              >
                <CodeBlock
                  code={CI_WORKFLOW_YAML}
                  filename=".github/workflows/secretguard.yml"
                />
              </div>
            )}
            {activeTab === "hooks" && (
              <div
                id="panel-ci-hooks"
                role="tabpanel"
                aria-labelledby="tab-ci-hooks"
              >
                <CodeBlock code={HOOK_COMMAND} />
              </div>
            )}
          </div>
        </div>

        {/* 2 Defense in Depth Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {DEFENSE_IN_DEPTH_CARDS.map((card) => {
            const Icon = card.icon === "anchor" ? Anchor : Shield;
            return (
              <div
                key={card.title}
                className="swiss-zone-card rounded-xl border border-[#ff3000]/25 bg-[#120804] p-6 flex flex-col justify-between hover:border-[#ff3000]/60 transition-all shadow-md"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg border border-[#ff3000]/30 bg-[#220e06] flex items-center justify-center text-[#ff8855] mb-4 shadow-xs">
                    <Icon className="w-4 h-4 text-[#ff5500]" />
                  </div>
                  <h3 className="text-base font-bold text-white font-mono mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {card.desc}
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

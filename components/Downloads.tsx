"use client";

import React from "react";
import { Download, Laptop, ExternalLink, Box } from "lucide-react";
import { DOWNLOAD_CARDS, SETUP_HINT_COMMAND, ALT_INSTALLS } from "@/lib/content";
import { RELEASES_PAGE_URL } from "@/lib/constants";
import { CopyButton } from "./ui/CopyButton";
import { OrangeTerminal } from "./ui/OrangeTerminal";
import { useOS } from "@/hooks/useOS";

export function Downloads() {
  const { osId } = useOS();

  return (
    <section
      id="downloads"
      className="py-20 md:py-28 bg-[#070707] text-white scroll-mt-16 relative overflow-hidden border-t-0"
      style={{ background: "#070707" }}
    >
      {/* Subtle dot grid pattern from Project EEG */}
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
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff5500]">06.</span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40">INSTALLATION &amp; BINARIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Download secgrep
          </h2>
          <p className="text-base text-white/60">
            Single static binary. No Python, no Node, no runtime.
          </p>
        </div>

        {/* 4 Download Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {DOWNLOAD_CARDS.map((card) => {
            const isRecommended = osId === card.id;

            return (
              <div
                key={card.id}
                className={`swiss-zone-card relative rounded-lg bg-[#0d0d0d] p-5 flex flex-col justify-between transition-all ${
                  isRecommended
                    ? "border-2 border-[#ff3000] shadow-[0_0_30px_rgba(255,48,0,0.18)]"
                    : "border border-white/10 hover:border-white/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Laptop className="w-5 h-5 text-white" />
                    {isRecommended && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff3000]/15 text-[#ff5500] border border-[#ff3000]/40 font-semibold">
                        Recommended for you
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {card.platform}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 mb-3 font-mono">
                    {card.arch}
                  </p>
                  <code className="block text-[11px] font-mono text-[#ffedd5] bg-[#160b06] p-2 rounded border border-[#ff3000]/30 truncate mb-4">
                    {card.filename}
                  </code>
                </div>

                <a
                  href={card.url}
                  download
                  className={`inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff3000] cursor-pointer ${
                    isRecommended
                      ? "bg-[#ff3000] text-white hover:bg-[#e02a00] shadow-sm"
                      : "border border-white/15 bg-black/50 text-white hover:bg-white/10 hover:border-white/40"
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Setup Hint Box with Orange Terminal */}
        <div className="mb-8">
          <OrangeTerminal
            title="terminal ~ verify binary &amp; permissions"
            badge="bash"
            copyText={SETUP_HINT_COMMAND}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 font-mono text-xs sm:text-sm">
              <span className="text-[#ff5500] font-black select-none text-sm sm:text-base mr-1">$</span>
              <span className="text-[#ff8844] font-bold">chmod</span>
              <span className="text-[#ffb088] font-semibold">+x</span>
              <span className="text-[#ffedd5] font-medium">secgrep</span>
              <span className="text-[#ff5500] font-bold mx-1">&amp;&amp;</span>
              <span className="text-[#ff8844] font-bold">./secgrep</span>
              <span className="text-[#ffb088] font-semibold">--version</span>
              <span className="inline-block w-2 h-4 bg-[#ff5500] animate-pulse align-middle ml-1 shrink-0" />
            </div>
          </OrangeTerminal>
        </div>

        {/* Alternative Installs (2 cards with Coming Soon tag) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {ALT_INSTALLS.map((alt) => (
            <div
              key={alt.label}
              className="swiss-zone-card rounded-lg border border-[#ff3000]/25 bg-[#120804] p-4 flex items-center justify-between gap-4 hover:border-[#ff3000]/60 transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Box className="w-4 h-4 text-[#ff8855] shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[#ffedd5] font-medium truncate">
                    {alt.command}
                  </div>
                  <div className="text-[11px] font-mono text-white/50">
                    {alt.label}
                  </div>
                </div>
              </div>
              <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border border-[#ff3000]/30 bg-[#220e06] text-[#ff9955] font-semibold">
                {alt.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote Link */}
        <div className="text-center sm:text-left">
          <a
            href={RELEASES_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-[#ff3000] transition-colors"
          >
            <span>View all releases on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Download } from "lucide-react";
import { GithubIcon } from "./ui/GithubIcon";
import { HERO_CONTENT } from "@/lib/content";
import { REPO_URL } from "@/lib/constants";
import { CopyButton } from "./ui/CopyButton";

import { OrangeTerminal } from "./ui/OrangeTerminal";

export function FinalCTA() {
  const handleScrollToDownloads = (e: React.MouseEvent) => {
    e.preventDefault();
    const downloads = document.getElementById("downloads");
    if (downloads) {
      downloads.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-24 md:py-32 bg-[#070707] text-center border-t border-white/10 relative overflow-hidden"
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

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff5500]">10.</span>
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40">READY TO SCAN?</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Stop the next leak before it ships.
        </h2>
        <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
          Integrate secgrep into your local Git workflows or CI pipeline in less than two minutes.
        </p>

        {/* 2 Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#downloads"
            onClick={handleScrollToDownloads}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ff3000] text-white font-mono text-sm font-semibold hover:bg-[#e02a00] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#ff3000] shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download secgrep</span>
          </a>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-transparent text-white font-mono text-sm font-medium hover:border-[#ff3000] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff3000]"
          >
            <GithubIcon className="w-4 h-4 text-white" />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* Orange-Themed Terminal Install Box */}
        <div className="w-full max-w-2xl text-left">
          <OrangeTerminal
            title="terminal ~ curl installer"
            badge="zsh"
            copyText={HERO_CONTENT.installCommand}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 font-mono text-xs sm:text-sm whitespace-nowrap">
              <span className="text-[#ff5500] font-black select-none text-sm sm:text-base mr-1 shrink-0">$</span>
              <span className="text-[#ff8844] font-bold shrink-0">curl</span>
              <span className="text-[#ffb088] font-semibold shrink-0">-sSL</span>
              <span className="text-[#ffedd5] font-medium shrink-0">https://raw.githubusercontent.com/HR-Shekhar/secgrep/main/install.sh</span>
              <span className="text-[#ff5500] font-bold mx-1 shrink-0">|</span>
              <span className="text-[#ffaa44] font-bold shrink-0">bash</span>
              <span className="inline-block w-2 h-4 bg-[#ff5500] animate-pulse align-middle ml-1 shrink-0" />
            </div>
          </OrangeTerminal>
        </div>
      </div>
    </section>
  );
}

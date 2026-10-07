"use client";

import React from "react";
import { CopyButton } from "./CopyButton";

interface OrangeTerminalProps {
  title?: string;
  badge?: string;
  copyText?: string;
  children: React.ReactNode;
  className?: string;
}

export function OrangeTerminal({
  title = "terminal ~ zsh",
  badge,
  copyText,
  children,
  className = "",
}: OrangeTerminalProps) {
  return (
    <div
      className={`rounded-xl border-2 border-[#ff3000]/45 bg-gradient-to-b from-[#180c06] via-[#120803] to-[#0a0402] shadow-[0_0_35px_rgba(255,48,0,0.18),0_12px_32px_rgba(0,0,0,0.7)] hover:border-[#ff3000]/75 hover:shadow-[0_0_45px_rgba(255,48,0,0.28)] transition-all duration-300 overflow-hidden relative ${className}`}
    >
      {/* Top subtle orange glow edge */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/80 to-transparent pointer-events-none" />

      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-[#220e06] via-[#1a0a04] to-[#140702] border-b border-[#ff3000]/25 select-none">
        {/* Left: Window Dots + Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#ff3000] shadow-[0_0_8px_rgba(255,48,0,0.9)] inline-block"
              title="Close"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#ff9800] shadow-[0_0_8px_rgba(255,152,0,0.6)] inline-block"
              title="Minimize"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)] inline-block"
              title="Expand"
            />
          </div>

          <div className="h-3 w-[1px] bg-[#ff3000]/30 shrink-0 hidden sm:block" />

          <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#ffb088] tracking-wide truncate">
            {title}
          </span>
        </div>

        {/* Right: Badge & Copy Button */}
        <div className="flex items-center gap-2 shrink-0">
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#ff3000]/30 bg-[#ff3000]/15 text-[#ff9955] font-semibold uppercase tracking-wider">
              {badge}
            </span>
          )}
          {copyText && (
            <CopyButton
              textToCopy={copyText}
              dark={true}
              className="border-[#ff5500]/40 bg-[#251006] text-[#ffedd5] hover:text-white hover:border-[#ff5500] hover:bg-[#381608] shadow-xs text-[11px] py-0.5 px-2"
            />
          )}
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-[#ffedd5] leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

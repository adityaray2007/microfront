"use client";

import React from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

// Orange-themed syntax highlighter
function highlightLine(line: string) {
  // Comment line
  if (line.trim().startsWith("#")) {
    return <span className="text-amber-200/40 italic">{line}</span>;
  }

  // Tokenize words and symbols
  const tokens = line.split(/(\s+|--[a-zA-Z0-9_-]+|-[a-zA-Z0-9]|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[.,:;{}()[\\]])/g);

  return (
    <>
      {tokens.map((token, idx) => {
        if (!token) return null;
        if (token === "secgrep") {
          return (
            <span key={idx} className="text-[#ff5500] font-bold drop-shadow-[0_0_8px_rgba(255,85,0,0.4)]">
              {token}
            </span>
          );
        }
        if (token.startsWith("--") || (token.startsWith("-") && token.length > 1 && !token.startsWith("---"))) {
          return (
            <span key={idx} className="text-[#ff9955] font-semibold">
              {token}
            </span>
          );
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return (
            <span key={idx} className="text-[#ffeedd]">
              {token}
            </span>
          );
        }
        if (token.startsWith("#")) {
          return (
            <span key={idx} className="text-amber-200/40 italic">
              {token}
            </span>
          );
        }
        return (
          <span key={idx} className="text-[#ffedd5]/90">
            {token}
          </span>
        );
      })}
    </>
  );
}

export function CodeBlock({ code, filename, className = "" }: CodeBlockProps) {
  const lines = code.trim().split("\n");

  return (
    <div
      className={`relative rounded-xl border-2 border-[#ff3000]/45 bg-gradient-to-b from-[#180c06] via-[#120803] to-[#0a0402] shadow-[0_0_35px_rgba(255,48,0,0.18),0_12px_32px_rgba(0,0,0,0.7)] hover:border-[#ff3000]/70 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Top subtle orange glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500]/80 to-transparent pointer-events-none" />

      {/* Terminal Titlebar with Dots */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-[#220e06] via-[#1a0a04] to-[#140702] border-b border-[#ff3000]/25 select-none">
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
            {filename || "terminal ~ bash"}
          </span>
        </div>

        <CopyButton
          textToCopy={code}
          dark={true}
          className="border-[#ff5500]/40 bg-[#251006] text-[#ffedd5] hover:text-white hover:border-[#ff5500] hover:bg-[#381608] shadow-xs text-[11px] py-0.5 px-2"
        />
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto text-[#ffedd5]">
        <pre className="leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="min-h-[1.5em]">
                {highlightLine(line)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

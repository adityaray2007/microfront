"use client";

import React, { useEffect, useState } from "react";
import { CopyButton } from "./ui/CopyButton";

export function TerminalMockup() {
  const [displayedLines, setDisplayedLines] = useState<number>(10);

  const rawText = `$ secgrep scan .

CRITICAL  aws-access-key  config/settings.py:14
  value:       AKIA...WXYZ
  fingerprint: sha256:9f2c...a41e
  Confidence:  0.94
  Why:         pattern match (0.95) + entropy 4.2 bits (+0.15) + path: config (+0.10)
  Action:      -> Rotate this key FIRST. Deleting the line does not revoke it.

✖ 1 secret found. Exit code 1.`;

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (motionQuery.matches) {
        setDisplayedLines(10);
        return;
      }
    }

    // Gentle typing effect
    setDisplayedLines(1);
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setDisplayedLines(current);
      if (current >= 10) {
        clearInterval(interval);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-xl border-2 border-[#ff3000]/45 bg-gradient-to-b from-[#180c06] via-[#120803] to-[#0a0402] overflow-hidden shadow-[0_0_35px_rgba(255,48,0,0.18)]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#ff3000]/25 px-4 py-2.5 bg-gradient-to-r from-[#220e06] via-[#1a0a04] to-[#140702]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff3000] shadow-[0_0_8px_rgba(255,48,0,0.9)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff9800] shadow-[0_0_8px_rgba(255,152,0,0.6)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          <span className="ml-2 text-xs font-mono text-[#ffb088]">~/project</span>
        </div>
        <CopyButton textToCopy={rawText} dark={true} />
      </div>

      {/* Terminal Content */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-[#ffedd5]">
        <pre className="space-y-1">
          {displayedLines >= 1 && (
            <div className="flex items-center gap-2">
              <span className="text-[#ff5500] font-bold">$</span>
              <span className="text-[#ff5500] font-bold">secgrep</span>
              <span className="text-white">scan .</span>
            </div>
          )}
          {displayedLines >= 2 && <div className="h-2" />}
          {displayedLines >= 3 && (
            <div>
              <span className="text-[#ff5500] font-bold">CRITICAL</span>{" "}
              <span className="text-white">aws-access-key</span>{" "}
              <span className="text-amber-200/50">config/settings.py:14</span>
            </div>
          )}
          {displayedLines >= 4 && (
            <div className="text-amber-200/60">
              {"  "}value: <span className="text-[#ffeedd]">AKIA...WXYZ</span>
            </div>
          )}
          {displayedLines >= 5 && (
            <div className="text-amber-200/60">
              {"  "}fingerprint: <span className="text-[#ffeedd]">sha256:9f2c...a41e</span>
            </div>
          )}
          {displayedLines >= 6 && (
            <div>
              <span className="text-amber-200/60">{"  "}Confidence: </span>
              <span className="text-[#ff5500] font-semibold">0.94</span>
            </div>
          )}
          {displayedLines >= 7 && (
            <div className="text-amber-200/60">
              {"  "}Why: pattern match (0.95) + entropy 4.2 bits (+0.15) + path: config (+0.10)
            </div>
          )}
          {displayedLines >= 8 && (
            <div className="text-amber-200/60">
              {"  "}Action: -&gt; Rotate this key FIRST. Deleting the line does not revoke it.
            </div>
          )}
          {displayedLines >= 9 && <div className="h-2" />}
          {displayedLines >= 10 && (
            <div className="text-[#ff5500] font-bold">
              ✖ 1 secret found. Exit code 1.
            </div>
          )}
        </pre>
      </div>
    </div>
  );
}

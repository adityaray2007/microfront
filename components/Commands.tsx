"use client";

import React, { useState } from "react";
import { COMMANDS_DATA, COMMAND_CHIPS } from "@/lib/content";
import { CopyButton } from "./ui/CopyButton";
import { OrangeTerminal } from "./ui/OrangeTerminal";

export function Commands() {
  const [activeTabId, setActiveTabId] = useState(COMMANDS_DATA[0].id);

  const activeCommand =
    COMMANDS_DATA.find((c) => c.id === activeTabId) || COMMANDS_DATA[0];

  return (
    <section
      id="commands"
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
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff5500]">07.</span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/40">COMMAND CHEAT SHEET</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Six commands. That's the whole workflow.
          </h2>
          <p className="text-base text-white/60">
            Interactive cheat sheet for common developer and CI tasks.
          </p>
        </div>

        {/* 6 Tabs (Left) + Content Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tabs List */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Commands List"
            className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar"
          >
            {COMMANDS_DATA.map((item) => {
              const isActive = item.id === activeTabId;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setActiveTabId(item.id)}
                  className={`p-3.5 text-left rounded-lg font-mono text-xs sm:text-sm transition-all border cursor-pointer shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? "border-2 border-[#ff3000] bg-gradient-to-r from-[#241006] to-[#180a03] text-white shadow-[0_0_20px_rgba(255,48,0,0.22)] font-semibold"
                      : "border border-[#ff3000]/20 bg-[#120804] text-white/60 hover:text-white hover:border-[#ff3000]/50"
                  }`}
                >
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{item.tabLabel}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ff3000] shadow-[0_0_6px_#ff3000]" />}
                  </div>
                  <div className="text-[11px] text-[#ffb088]/80 truncate mt-1">
                    {item.command}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Panel */}
          <div
            id={`panel-${activeCommand.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCommand.id}`}
            className="lg:col-span-8 rounded-xl border border-[#ff3000]/25 bg-[#100804]/90 p-5 sm:p-6 shadow-xl backdrop-blur-xs flex flex-col gap-4"
          >
            {/* Orange Terminal Command Box */}
            <OrangeTerminal
              title={`secgrep ~ ${activeCommand.id}`}
              badge="COMMAND"
              copyText={activeCommand.command}
            >
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 font-mono text-xs sm:text-sm">
                <span className="text-[#ff5500] font-black select-none text-sm sm:text-base mr-1">$</span>
                <span className="text-[#ff5500] font-bold">secgrep</span>
                <span className="text-amber-100 font-medium">
                  {activeCommand.command.replace(/^secgrep\s*/, "")}
                </span>
                <span className="inline-block w-2 h-4 bg-[#ff5500] animate-pulse align-middle ml-1 shrink-0" />
              </div>
            </OrangeTerminal>

            {/* Description */}
            <p className="text-sm text-white/80 leading-relaxed px-1">
              {activeCommand.description}
            </p>

            {/* Orange Terminal Output */}
            <div>
              <div className="text-xs font-mono text-[#ffb088] mb-2 font-medium px-1 flex items-center gap-2">
                <span>Output Console:</span>
              </div>
              <OrangeTerminal
                title="terminal ~ standard output"
                badge="STDOUT"
              >
                <pre className="leading-relaxed text-[#ffedd5]/90 overflow-x-auto font-mono text-xs">
                  <code>{activeCommand.output}</code>
                </pre>
              </OrangeTerminal>
            </div>
          </div>
        </div>

        {/* 3 Chips below panel */}
        <div className="flex flex-wrap items-center gap-2.5 mt-8">
          {COMMAND_CHIPS.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono border border-[#ff3000]/25 bg-[#1a0c05] text-[#ffb088] shadow-xs"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

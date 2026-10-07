import React from "react";
import {
  DETECTION_FORMULA,
  SIGNALS_DATA,
  ML_COMPARISON_TABLE,
} from "@/lib/content";
import { SectionLabel } from "./ui/SectionLabel";

export function Detection() {
  return (
    <section className="py-20 md:py-28 border-b border-[#e5e5e5] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <SectionLabel num="03" label="DETECTION MATHEMATICS" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090b] mb-3">
            Four signals. Zero guesswork.
          </h2>
          <p className="text-base text-[#71717a]">
            Every candidate is scored with explainable, deterministic mathematics.
          </p>
        </div>

        {/* Formula Banner */}
        <div className="w-full rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-4 sm:p-5 mb-10 font-mono text-xs sm:text-sm text-center overflow-x-auto shadow-xs">
          <span className="text-[#71717a]">Formula: </span>
          <span className="text-[#09090b] font-semibold">{DETECTION_FORMULA}</span>
          <span className="text-[#ff3000] font-semibold"> → Score (0.0 to 1.0)</span>
        </div>

        {/* 4 Signal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {SIGNALS_DATA.map((sig, idx) => (
            <div
              key={sig.title}
              className="swiss-zone-card rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-5 flex flex-col justify-between hover:border-[#ff3000] transition-all shadow-xs"
            >
              <div>
                <span className="font-mono text-xs text-[#71717a] block mb-2 font-medium">
                  SIGNAL 0{idx + 1}
                </span>
                <h3 className="text-sm font-bold text-[#09090b] font-mono mb-2">
                  {sig.title}
                </h3>
                <p className="text-xs text-[#525252] leading-relaxed mb-4">
                  {sig.desc}
                </p>

                {/* Optional Shannon formula and 3-bar graphic */}
                {sig.formula && (
                  <div className="mt-2 pt-3 border-t border-[#e5e5e5]">
                    <div className="font-mono text-[11px] text-[#09090b] bg-white p-2 rounded border border-[#e5e5e5] text-center mb-3 font-semibold shadow-xs">
                      {sig.formula}
                    </div>
                    {/* 3-bar graphic with orange highlight on high entropy */}
                    <div className="flex items-end justify-center gap-3 h-12 pt-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-5 h-4 bg-[#d4d4d8] rounded-t-sm" />
                        <span className="text-[9px] font-mono text-[#71717a]">
                          &lt;3.0
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-5 h-7 bg-[#71717a] rounded-t-sm" />
                        <span className="text-[9px] font-mono text-[#71717a]">
                          3.0-3.5
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-5 h-10 bg-[#09090b] border-2 border-[#ff3000] rounded-t-sm shadow-[0_0_10px_rgba(255,48,0,0.35)]" />
                        <span className="text-[9px] font-mono text-[#ff3000] font-bold">
                          &gt;3.5
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Banner above the table */}
        <div className="border-t border-[#e5e5e5] pt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff3000] animate-pulse" />
            <h3 className="text-lg font-mono font-bold text-[#09090b]">
              Deterministic by design. No ML, no hallucinations.
            </h3>
          </div>

          {/* Table: Requirement / ML-based tools / secgrep */}
          <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] shadow-sm">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead className="bg-[#f4f4f5] border-b border-[#e5e5e5] text-[#525252]">
                <tr>
                  <th scope="col" className="p-4 font-semibold w-1/4">Requirement</th>
                  <th scope="col" className="p-4 font-semibold w-3/8">ML-Based Tools</th>
                  <th scope="col" className="p-4 font-semibold w-3/8 text-[#09090b]">secgrep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5] bg-white">
                {ML_COMPARISON_TABLE.map((row) => (
                  <tr key={row.metric} className="hover:bg-[#fafafa] transition-colors">
                    <td className="p-4 font-medium text-[#09090b]">{row.metric}</td>
                    <td className="p-4 text-[#71717a]">{row.ml}</td>
                    <td className="p-4 text-[#09090b] font-semibold flex items-center gap-2">
                      <span className="text-[#ff3000]">✓</span>
                      <span>{row.secgrep}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

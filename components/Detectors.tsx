import React from "react";
import { DETECTORS_DATA } from "@/lib/content";
import { Pill } from "./ui/Pill";
import { SectionLabel } from "./ui/SectionLabel";

export function Detectors() {
  return (
    <section className="py-20 md:py-28 border-b border-[#e5e5e5] bg-[#fafafa]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <SectionLabel num="04" label="RULE CATALOG" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#09090b] mb-3">
            9 built-in detectors
          </h2>
          <p className="text-base text-[#71717a]">
            Curated, high-fidelity signatures targeting production credential formats.
          </p>
        </div>

        {/* Table Container with horizontal scroll */}
        <div className="rounded-lg border border-[#e5e5e5] overflow-x-auto mb-6 shadow-sm">
          <table className="w-full text-left font-mono text-xs sm:text-sm">
            <thead className="bg-[#f4f4f5] border-b border-[#e5e5e5] text-[#525252]">
              <tr>
                <th scope="col" className="p-4 font-semibold">Rule ID</th>
                <th scope="col" className="p-4 font-semibold">Category</th>
                <th scope="col" className="p-4 font-semibold">Severity</th>
                <th scope="col" className="p-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e5e5] bg-white">
              {DETECTORS_DATA.map((row) => (
                <tr key={row.ruleId} className="hover:bg-[#fafafa] transition-colors">
                  <td className="p-4 font-semibold text-[#09090b] whitespace-nowrap">
                    <code>{row.ruleId}</code>
                  </td>
                  <td className="p-4 text-[#71717a] whitespace-nowrap">
                    {row.category}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {row.severity === "Critical" && (
                      <Pill variant="critical">Critical</Pill>
                    )}
                    {row.severity === "High" && (
                      <Pill variant="high">High</Pill>
                    )}
                    {row.severity === "Medium" && (
                      <Pill variant="medium">Medium</Pill>
                    )}
                  </td>
                  <td className="p-4 text-[#3f3f46]">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note below */}
        <p className="text-xs font-mono text-[#71717a]">
          Need your own? Add custom regex rules in{" "}
          <code className="text-[#09090b] bg-white px-1.5 py-0.5 rounded border border-[#e5e5e5] font-semibold">
            secgrep.toml
          </code>
          .
        </p>
      </div>
    </section>
  );
}

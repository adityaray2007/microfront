import React from "react";
import { Shield } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer
      className="w-full bg-[#070707] py-12 border-t border-white/10 text-white relative z-10"
      style={{ background: "#070707" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg border border-white/10 bg-black flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white">secgrep</div>
              <div className="text-xs font-mono text-white/40">
                Offline secret scanning. Rotate first.
              </div>
            </div>
          </div>

          {/* Links (4) */}
          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Navigation">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-white/50 hover:text-[#ff3000] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div>© 2026 HR-Shekhar · Built with Rust</div>
          <div>All scans execute locally. No telemetry.</div>
        </div>
      </div>
    </footer>
  );
}

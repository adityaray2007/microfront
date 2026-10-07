"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Menu, X, ArrowRight } from "lucide-react";
import { GithubIcon } from "./ui/GithubIcon";
import { NAV_LINKS } from "@/lib/content";
import { REPO_URL } from "@/lib/constants";

interface NavbarProps {
  stars?: number | null;
}

export function Navbar({ stars }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const darkSection = document.getElementById("dark-section");
      const dither = document.getElementById("dither-transition");

      if (darkSection) {
        const darkRect = darkSection.getBoundingClientRect();
        // When darkSection top <= 90px, navbar has entered the dark section
        if (darkRect.top <= 90) {
          setIsDark(true);
          return;
        }
      }

      if (dither) {
        const ditherRect = dither.getBoundingClientRect();
        // As the user goes through the dither transition where the black pixels rise
        if (ditherRect.top <= 64) {
          setIsDark(true);
          return;
        }
      }

      setIsDark(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") || (href.startsWith("/#") && typeof window !== "undefined" && window.location.pathname === "/")) {
      const anchor = href.startsWith("/#") ? href.slice(1) : href;
      const target = document.querySelector(anchor);
      if (target) {
        e.preventDefault();
        setMobileMenuOpen(false);
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isDark
          ? "border-b border-white/10 bg-[#070707]/90 backdrop-blur-md text-white shadow-xl"
          : "border-b border-[#e5e5e5] bg-white/85 backdrop-blur-md text-[#09090b]"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-1 focus:ring-[#ff3000] rounded"
        >
          <div
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
              isDark
                ? "border-white/15 bg-[#141414] text-white group-hover:border-[#ff3000]/60"
                : "border-[#e5e5e5] bg-[#f4f4f5] text-black group-hover:border-[#a1a1aa]"
            }`}
          >
            <Shield className={`w-4 h-4 transition-colors ${isDark ? "text-white" : "text-black"}`} />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-mono text-base font-bold tracking-tight flex items-center gap-1.5 transition-colors ${
                isDark ? "text-white" : "text-[#09090b]"
              }`}
            >
              secgrep
            </span>
            <span
              className={`text-[10px] font-mono leading-none transition-colors ${
                isDark ? "text-white/50" : "text-[#71717a]"
              }`}
            >
              SecretGuard
            </span>
          </div>
        </Link>

        {/* Center Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="swiss-nav-link text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#ff3000] rounded px-1 py-0.5"
            >
              <span
                className={`link-default transition-colors ${
                  isDark ? "text-white/75" : "text-[#525252]"
                }`}
              >
                {link.label}
              </span>
              <span className="link-hover text-[#ff3000]" aria-hidden="true">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Right CTA Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View secgrep on GitHub"
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all focus:outline-none focus:ring-1 focus:ring-[#ff3000] ${
              isDark
                ? "border-white/15 bg-[#141414] text-white hover:border-[#ff3000]/60 hover:bg-[#1a1a1a]"
                : "border-[#e5e5e5] bg-white text-[#09090b] hover:border-[#a1a1aa] hover:bg-[#f4f4f5]"
            }`}
          >
            <GithubIcon className={`w-4 h-4 transition-colors ${isDark ? "text-white" : "text-black"}`} />
            <span>GitHub</span>
            {stars !== null && stars !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded text-[11px] font-mono transition-colors ${
                  isDark ? "bg-white/10 text-white/70" : "bg-[#f4f4f5] text-[#71717a]"
                }`}
              >
                {stars.toLocaleString()}
              </span>
            )}
          </a>
          <a
            href="#downloads"
            onClick={(e) => handleScrollTo(e, "#downloads")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold rounded-lg bg-[#ff3000] text-white hover:bg-[#e02a00] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#ff3000] shadow-[0_0_20px_rgba(255,48,0,0.25)] cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg border transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff3000] ${
            isDark
              ? "border-white/15 bg-[#141414] text-white/70 hover:text-white"
              : "border-[#e5e5e5] bg-white text-[#71717a] hover:text-black"
          }`}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 py-5 flex flex-col gap-4 shadow-xl transition-colors ${
            isDark
              ? "border-white/10 bg-[#070707] text-white"
              : "border-[#e5e5e5] bg-white text-[#09090b]"
          }`}
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-sm font-mono hover:text-[#ff3000] py-1 transition-colors ${
                  isDark ? "text-white/75" : "text-[#525252]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className={`flex flex-col gap-2 pt-3 border-t ${isDark ? "border-white/10" : "border-[#e5e5e5]"}`}>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-2 text-xs font-mono rounded-lg border transition-colors ${
                isDark
                  ? "border-white/15 bg-[#141414] text-white"
                  : "border-[#e5e5e5] bg-white text-black"
              }`}
            >
              <GithubIcon className={`w-4 h-4 ${isDark ? "text-white" : "text-black"}`} />
              <span>GitHub</span>
              {stars !== null && stars !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded text-[11px] ${
                    isDark ? "bg-white/10 text-white/70" : "bg-[#f4f4f5] text-[#71717a]"
                  }`}
                >
                  {stars}
                </span>
              )}
            </a>
            <a
              href="#downloads"
              onClick={(e) => handleScrollTo(e, "#downloads")}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-mono font-semibold rounded-lg bg-[#ff3000] text-white hover:bg-[#e02a00]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

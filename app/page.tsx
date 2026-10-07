import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Detection } from "@/components/Detection";
import { Detectors } from "@/components/Detectors";
import { Remediation } from "@/components/Remediation";
import { Downloads } from "@/components/Downloads";
import { Commands } from "@/components/Commands";
import { CICD } from "@/components/CICD";
import { Configuration } from "@/components/Configuration";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { WhiteToBlackPixelTransition } from "@/components/ui/WhiteToBlackPixelTransition";

async function getGitHubStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/HR-Shekhar/secgrep", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const stars = await getGitHubStars();

  return (
    <div className="min-h-screen bg-white text-[#09090b] flex flex-col selection:bg-[#ff3000]/20 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar stars={stars} />

      <main className="flex-1 flex flex-col">
        {/* ==================================================== */}
        {/* LIGHT SECTION (GROUP 1: TOOL OVERVIEW & EXPLANATION) */}
        {/* ==================================================== */}

        {/* Hero Section — Left completely untouched */}
        <Hero />

        {/* 1. Why This Exists (The Problem) */}
        <Reveal>
          <Problem />
        </Reveal>

        {/* Mechanical Tech Marquee from Project EEG */}
        <TechMarquee />

        {/* 2. Core Capabilities (Features) */}
        <Reveal>
          <Features />
        </Reveal>

        {/* 3. Detection Engine (4 Signals, Shannon Entropy) */}
        <Reveal>
          <Detection />
        </Reveal>

        {/* 4. Supported Credential Rules (9 Built-in Detectors) */}
        <Reveal>
          <Detectors />
        </Reveal>

        {/* 5. Remediation Protocol ("Rotate First" Operational Steps) */}
        <Reveal>
          <Remediation />
        </Reveal>

        {/* ==================================================== */}
        {/* DYNAMIC DITHER TRANSITION (WHITE → BLACK #070707)    */}
        {/* Exact math, height, and settings from Project EEG    */}
        {/* ==================================================== */}
        <div id="dither-transition">
          <WhiteToBlackPixelTransition />
        </div>

        {/* ==================================================== */}
        {/* DARK SECTION (GROUP 2: WORKFLOWS, INSTALL & DEPLOY)  */}
        {/* Matching Project EEG's dark theme (#070707)          */}
        {/* ==================================================== */}
        <div id="dark-section" className="bg-[#070707] text-white relative z-20">
          {/* 6. Installation & Binaries (Downloads) */}
          <Reveal>
            <Downloads />
          </Reveal>

          {/* 7. Developer Cheat Sheet (Commands) */}
          <Reveal>
            <Commands />
          </Reveal>

          {/* 8. Pipeline Enforcement (CI/CD & Git Hooks) */}
          <Reveal>
            <CICD />
          </Reveal>

          {/* 9. Configuration (secgrep.toml) */}
          <Reveal>
            <Configuration />
          </Reveal>

          {/* 10. Final Call to Action */}
          <Reveal>
            <FinalCTA />
          </Reveal>
        </div>
      </main>

      {/* Footer (Dark Theme) */}
      <Footer />
    </div>
  );
}

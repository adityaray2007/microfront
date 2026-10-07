"use client";

import React from "react";
import { Skiper39 } from "./ui/skiper39";
import FuzzyText from "./ui/FuzzyText";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] bg-white overflow-hidden">
      <Skiper39
        badge="ENTERPRISE SECRET DEFENSE"
        headline={
          <>
            Don&apos;t Let Your Team Walk Into a{" "}
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover={true}
              color="#09090b"
              fontSize="inherit"
              fontWeight={700}
            >
              Leaked Key
            </FuzzyText>{" "}
            Incident.
          </>
        }
        tagline="A hardcoded token pushed today lives in git history forever. secgrep guards every developer before code leaves their laptop."
      />
    </section>
  );
}

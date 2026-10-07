"use client";

import { useEffect, useState } from "react";
import { RELEASE_BASE_URL } from "@/lib/constants";

export type DetectedOS = "macos-arm64" | "macos-x86_64" | "linux-x86_64" | "windows-x86_64" | "unknown";

export interface OSInfo {
  osId: DetectedOS;
  label: string;
  downloadUrl: string | null;
  filename: string | null;
}

export function useOS(): OSInfo {
  const [os, setOS] = useState<OSInfo>({
    osId: "unknown",
    label: "Download Binary",
    downloadUrl: null,
    filename: null,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !navigator) return;

    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator.platform || "").toLowerCase();

    // Check Windows
    if (ua.includes("win") || platform.includes("win")) {
      setOS({
        osId: "windows-x86_64",
        label: "Download for Windows (x64)",
        downloadUrl: `${RELEASE_BASE_URL}/secgrep-windows-x86_64.exe`,
        filename: "secgrep-windows-x86_64.exe",
      });
      return;
    }

    // Check Linux
    if (ua.includes("linux") && !ua.includes("android")) {
      setOS({
        osId: "linux-x86_64",
        label: "Download for Linux (x64)",
        downloadUrl: `${RELEASE_BASE_URL}/secgrep-linux-x86_64`,
        filename: "secgrep-linux-x86_64",
      });
      return;
    }

    // Check Mac
    if (ua.includes("mac") || platform.includes("mac")) {
      // Heuristic for Apple Silicon: navigator.userAgentData or WebGL unmasked renderer
      let isArm = false;
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (renderer && typeof renderer === "string" && renderer.includes("Apple")) {
              isArm = true;
            }
          }
        }
      } catch {
        // fallback
      }

      // Default modern Mac heuristic: Apple Silicon is standard since 2020
      if (isArm || !ua.includes("intel")) {
        setOS({
          osId: "macos-arm64",
          label: "Download for macOS (Apple Silicon)",
          downloadUrl: `${RELEASE_BASE_URL}/secgrep-darwin-arm64`,
          filename: "secgrep-darwin-arm64",
        });
      } else {
        setOS({
          osId: "macos-x86_64",
          label: "Download for macOS (Intel)",
          downloadUrl: `${RELEASE_BASE_URL}/secgrep-darwin-x86_64`,
          filename: "secgrep-darwin-x86_64",
        });
      }
      return;
    }

    setOS({
      osId: "unknown",
      label: "Download Binary",
      downloadUrl: null,
      filename: null,
    });
  }, []);

  return os;
}

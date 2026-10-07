"use client";

import React, { useEffect, useRef } from "react";

export function WhiteToBlackPixelTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const onResize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    onResize();
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    scrollRef.current.target = window.scrollY;
    scrollRef.current.current = window.scrollY;

    let rafId = 0;
    const step = 11;

    const draw = () => {
      const s = scrollRef.current;
      const diff = s.target - s.current;
      s.current += diff * 0.22;
      s.velocity = Math.abs(diff);

      if (ctx && width > 0 && height > 0) {
        ctx.save();
        ctx.scale(dpr, dpr);

        // Container scroll progress (0: enters bottom, 1: exits top)
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        const totalTravel = vh + height;
        const rawProgress = (vh - rect.top) / totalTravel;
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Background: White #ffffff matching sections above
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // 1. Horizon & Vertical Stretch (starts slightly higher to reduce excessive top white space)
        const bandHeight = 200 + Math.sin(progress * Math.PI) * 440 + progress * 60;
        const horizonY = height * (0.88 - progress * 1.08);

        const scrollOffset = s.current * 0.0055;
        const velFactor = Math.min(16, s.velocity * 0.35);

        const getWave = (nx: number) => {
          return (
            Math.sin(nx * Math.PI * 3.4 + scrollOffset) * (20 + velFactor) +
            Math.cos(nx * Math.PI * 6.0 - scrollOffset * 0.75) * 14 +
            Math.sin(nx * Math.PI * 1.4 + scrollOffset * 0.25) * 22
          );
        };

        // 2. Multi-tier Geometric Dither Matrix (Dark shapes on White, seamless pixel grid)
        const numRows = Math.ceil(height / step) + 2;
        const numCols = Math.ceil(width / step) + 2;

        for (let r = 0; r <= numRows; r++) {
          const y = r * step;
          const isOdd = r % 2 === 1;
          const offsetX = isOdd ? step / 2 : 0;

          for (let c = -1; c <= numCols; c++) {
            const x = c * step + offsetX;
            const nx = x / width;

            const wave = getWave(nx) + Math.sin(c * 0.8 + r * 0.65 + scrollOffset * 1.4) * 3.5;
            const localHorizon = horizonY + wave;
            const dist = y - localHorizon;

            const halfBand = bandHeight * 0.5;
            const norm = (dist + halfBand) / (bandHeight || 1);

            // Above transition band: pure white #ffffff
            if (norm <= 0.01) continue;

            const bayerVal = ((c * 3 + r * 5 + (c ^ r)) % 8) / 8;
            const stippleWeight = norm + (bayerVal - 0.5) * 0.28;

            if (stippleWeight < 0.15) {
              // Level 1: Light grey micro-dots on white (#dedede -> #b8b8b8)
              const radius = 0.7 + norm * 0.8;
              ctx.fillStyle = norm < 0.08 ? "#dedede" : "#b8b8b8";
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
            } else if (stippleWeight < 0.38) {
              // Level 2: Mid-grey pluses
              const armLen = 2.0 + norm * 2.2;
              const g = Math.floor(175 - norm * 90);
              ctx.strokeStyle = `rgb(${g},${g},${g})`;
              ctx.lineWidth = 1.2;

              const angle = Math.sin(scrollOffset + c * 0.2 + r * 0.3) * 0.22;
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angle);
              ctx.beginPath();
              ctx.moveTo(-armLen, 0);
              ctx.lineTo(armLen, 0);
              ctx.moveTo(0, -armLen);
              ctx.lineTo(0, armLen);
              ctx.stroke();
              ctx.restore();
            } else if (stippleWeight < 0.62) {
              // Level 3: Dark grey / near-black pluses & crosses (#444444 -> #070707)
              const armLen = 3.2 + norm * 2.6;
              const g = Math.max(0, Math.floor(75 - norm * 65));
              ctx.strokeStyle = `rgb(${g},${g},${g})`;
              ctx.lineWidth = 1.5;

              ctx.save();
              ctx.translate(x, y);
              const angle = (isOdd ? 0 : Math.PI / 4) + Math.sin(scrollOffset * 0.7 + c * 0.12) * 0.15;
              ctx.rotate(angle);
              ctx.beginPath();
              ctx.moveTo(-armLen, 0);
              ctx.lineTo(armLen, 0);
              ctx.moveTo(0, -armLen);
              ctx.lineTo(0, armLen);
              ctx.stroke();

              ctx.fillStyle = "#070707";
              ctx.fillRect(-1, -1, 2, 2);
              ctx.restore();
            } else if (stippleWeight < 0.82) {
              // Level 4: Dense black squares with plus extensions
              const sz = Math.min(step, 4 + norm * 7);
              ctx.fillStyle = "#070707";
              ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);

              ctx.strokeStyle = "#070707";
              ctx.lineWidth = 1.6;
              ctx.beginPath();
              ctx.moveTo(x - step * 0.7, y);
              ctx.lineTo(x + step * 0.7, y);
              ctx.moveTo(x, y - step * 0.7);
              ctx.lineTo(x, y + step * 0.7);
              ctx.stroke();
            } else {
              // Level 5: Full solid black tile seamlessly overlapping adjacent solid tiles
              ctx.fillStyle = "#070707";
              ctx.fillRect(x - step * 0.6, y - step * 0.6, step * 1.2 + 0.5, step * 1.2 + 0.5);
            }
          }
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[520px] sm:h-[620px] md:h-[720px] lg:h-[800px] overflow-hidden leading-none select-none bg-white relative -my-px z-20"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
    </div>
  );
}

export default WhiteToBlackPixelTransition;

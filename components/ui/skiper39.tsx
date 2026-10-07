"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      // Characters walk along the bottom of the canvas with slight depth variation
      // offsetY is always <= 0 so characters never extend below the canvas bottom
      const offsetY = -250 * gsap.parseEase("power2.in")(Math.random());
      // Clamp to 0 so heads are never cut off above the canvas top
      const startY = Math.max(0, stage.height - peep.height + offsetY);
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.6, 1.4));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 8,
        },
        0,
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      updateDimensions: (scale: number) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
      scale = 1,
    }: {
      image: HTMLImageElement;
      rect: number[];
      scale?: number;
    }): Peep => {
      const peep: Peep = {
        image,
        rect,
        width: rect[2] * scale,
        height: rect[3] * scale,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        updateDimensions: (newScale: number) => {
          peep.width = rect[2] * newScale;
          peep.height = rect[3] * newScale;
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          ctx.restore();
        },
      };

      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  );
};

import FuzzyText from "./FuzzyText";

interface Skiper39Props {
  headline?: React.ReactNode;
  tagline?: string;
  badge?: string;
}

const Skiper39 = ({
  headline,
  tagline = "A hardcoded token pushed today lives in git history forever. secgrep guards every developer before code leaves their laptop.",
  badge = "ENTERPRISE SECRET DEFENSE",
}: Skiper39Props) => {
  return (
    <div className="w-full h-full flex flex-col bg-white text-black">
      {/* BLOCK 1: Text at the top in clean white space */}
      <div className="shrink-0 pt-6 sm:pt-8 pb-4 px-4 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono tracking-widest uppercase border border-[#e5e5e5] bg-[#f4f4f5] text-[#525252] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
          {badge}
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#09090b] mb-4 leading-[1.1]">
          {headline ?? (
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
          )}
        </h1>

        <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* BLOCK 2: Animation pushed to the bottom of the screen */}
      <div className="flex-1 w-full min-h-0 mt-auto">
        <CrowdCanvas
          src="https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png"
          rows={15}
          cols={7}
        />
      </div>
    </div>
  );
};

export { CrowdCanvas, Skiper39 };
export default Skiper39;

'use client';

import React, { useEffect, useRef } from 'react';

export interface FuzzyTextProps {
  children: React.ReactNode;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  color?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
  fuzzRange?: number;
  fps?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
  transitionDuration?: number;
  clickEffect?: boolean;
  glitchMode?: boolean;
  glitchInterval?: number;
  glitchDuration?: number;
  gradient?: string[] | null;
  letterSpacing?: number;
  className?: string;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#09090b',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    let glitchTimeoutId: NodeJS.Timeout | number;
    let glitchEndTimeoutId: NodeJS.Timeout | number;
    let clickTimeoutId: NodeJS.Timeout | number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanupListeners: (() => void) | null = null;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const parentEl = canvas.parentElement || document.body;

      let computedFontFamily =
        fontFamily === 'inherit'
          ? window.getComputedStyle(parentEl).fontFamily || 'sans-serif'
          : fontFamily;

      // Canvas 2D does not parse var(...) tokens in font strings
      if (computedFontFamily.includes('var(')) {
        computedFontFamily = computedFontFamily.replace(/var\([^)]+\),?\s*/g, '').trim();
      }
      if (!computedFontFamily) {
        computedFontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
      }

      let numericFontSize: number;
      let fontSizeStr: string;

      if (fontSize === 'inherit') {
        const computedSize = window.getComputedStyle(parentEl).fontSize;
        numericFontSize = parseFloat(computedSize) || 48;
        fontSizeStr = `${numericFontSize}px`;
      } else if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
        fontSizeStr = `${fontSize}px`;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        parentEl.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize) || 48;
        fontSizeStr = `${numericFontSize}px`;
        parentEl.removeChild(temp);
      }

      const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;

      try {
        await document.fonts.ready;
        await document.fonts.load(fontString);
      } catch {
        // fallback to available font
      }
      if (isCancelled) return;

      const text = React.Children.toArray(children).join('');

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      let totalWidth = 0;
      if (letterSpacing !== 0) {
        for (const char of text) {
          totalWidth += offCtx.measureText(char).width + letterSpacing;
        }
        totalWidth -= letterSpacing;
      } else {
        totalWidth = offCtx.measureText(text).width;
      }

      const metrics = offCtx.measureText(text);
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight =
        letterSpacing !== 0 ? totalWidth : metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(
        letterSpacing !== 0 ? totalWidth : actualLeft + actualRight
      );
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
        const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
        gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c));
        offCtx.fillStyle = grad;
      } else {
        const resolvedColor =
          color === 'inherit'
            ? window.getComputedStyle(parentEl).color || '#09090b'
            : color;
        offCtx.fillStyle = resolvedColor;
      }

      if (letterSpacing !== 0) {
        let xPos = xOffset;
        for (const char of text) {
          offCtx.fillText(char, xPos, actualAscent);
          xPos += offCtx.measureText(char).width + letterSpacing;
        }
      } else {
        offCtx.fillText(text, xOffset - actualLeft, actualAscent);
      }

      const horizontalMargin = fuzzRange + 10;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;

      // Adjust canvas margin & vertical alignment for seamless inline flow
      canvas.style.marginLeft = `-${horizontalMargin}px`;
      canvas.style.marginRight = `-${horizontalMargin}px`;
      canvas.style.verticalAlign = `-${actualDescent}px`;

      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      let isClicking = false;
      let isGlitching = false;
      let currentIntensity = baseIntensity;
      let targetIntensity = baseIntensity;
      let lastFrameTime = 0;
      const frameDuration = 1000 / fps;

      const startGlitchLoop = () => {
        if (!glitchMode || isCancelled) return;
        glitchTimeoutId = setTimeout(() => {
          if (isCancelled) return;
          isGlitching = true;
          glitchEndTimeoutId = setTimeout(() => {
            isGlitching = false;
            startGlitchLoop();
          }, glitchDuration);
        }, glitchInterval);
      };

      if (glitchMode) startGlitchLoop();

      const run = (timestamp: number) => {
        if (isCancelled) return;

        if (timestamp - lastFrameTime < frameDuration) {
          animationFrameId = window.requestAnimationFrame(run);
          return;
        }
        lastFrameTime = timestamp;

        ctx.clearRect(
          -fuzzRange - 20,
          -fuzzRange - 10,
          offscreenWidth + 2 * (fuzzRange + 20),
          tightHeight + 2 * (fuzzRange + 10)
        );

        if (isClicking) {
          targetIntensity = 1;
        } else if (isGlitching) {
          targetIntensity = 1;
        } else if (isHovering) {
          targetIntensity = hoverIntensity;
        } else {
          targetIntensity = baseIntensity;
        }

        if (transitionDuration > 0) {
          const step = 1 / (transitionDuration / frameDuration);
          if (currentIntensity < targetIntensity) {
            currentIntensity = Math.min(currentIntensity + step, targetIntensity);
          } else if (currentIntensity > targetIntensity) {
            currentIntensity = Math.max(currentIntensity - step, targetIntensity);
          }
        } else {
          currentIntensity = targetIntensity;
        }

        if (direction === 'horizontal') {
          // Horizontal: shift each row left/right
          for (let j = 0; j < tightHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
          }
        } else if (direction === 'vertical') {
          // Vertical: shift each column up/down
          for (let i = 0; i < offscreenWidth; i++) {
            const dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, i, 0, 1, tightHeight, i, dy, 1, tightHeight);
          }
        } else {
          // Both: shift each row horizontally, then shift each column vertically
          for (let j = 0; j < tightHeight; j++) {
            const dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
            ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
          }
          const tempData = ctx.getImageData(
            0,
            0,
            offscreenWidth + fuzzRange,
            tightHeight + fuzzRange
          );
          ctx.clearRect(
            -fuzzRange - 20,
            -fuzzRange - 10,
            offscreenWidth + 2 * (fuzzRange + 20),
            tightHeight + 2 * (fuzzRange + 10)
          );
          ctx.putImageData(tempData, 0, 0);
          for (let i = 0; i < offscreenWidth + fuzzRange; i++) {
            const dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
            const colData = ctx.getImageData(i, 0, 1, tightHeight + fuzzRange);
            ctx.clearRect(i, -fuzzRange, 1, tightHeight + 2 * fuzzRange);
            ctx.putImageData(colData, i, dy);
          }
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      animationFrameId = window.requestAnimationFrame(run);

      const isInsideTextArea = (x: number, y: number) => {
        return (
          x >= interactiveLeft &&
          x <= interactiveRight &&
          y >= interactiveTop &&
          y <= interactiveBottom
        );
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleClick = () => {
        if (!clickEffect) return;
        isClicking = true;
        clearTimeout(clickTimeoutId);
        clickTimeoutId = setTimeout(() => {
          isClicking = false;
        }, 150);
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      if (clickEffect) {
        canvas.addEventListener('click', handleClick);
      }

      cleanupListeners = () => {
        window.cancelAnimationFrame(animationFrameId);
        clearTimeout(glitchTimeoutId);
        clearTimeout(glitchEndTimeoutId);
        clearTimeout(clickTimeoutId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
        if (clickEffect) {
          canvas.removeEventListener('click', handleClick);
        }
      };
    };

    init();

    const handleWindowResize = () => {
      init();
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleWindowResize);
      window.cancelAnimationFrame(animationFrameId);
      clearTimeout(glitchTimeoutId);
      clearTimeout(glitchEndTimeoutId);
      clearTimeout(clickTimeoutId);
      if (cleanupListeners) {
        cleanupListeners();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
    fuzzRange,
    fps,
    direction,
    transitionDuration,
    clickEffect,
    glitchMode,
    glitchInterval,
    glitchDuration,
    gradient,
    letterSpacing
  ]);

  return <canvas ref={canvasRef} className={`inline-block cursor-default ${className}`} />;
};

export default FuzzyText;
export { FuzzyText };

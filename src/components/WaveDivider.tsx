'use client';

import React, { useEffect, useRef } from 'react';
import styles from './WaveDivider.module.scss';

interface LayerConfig {
  strokeColor: string;
  fillColor: string;
  lineWidth: number;
  glowColor?: string;
  glowBlur?: number;
  getTopY: (x: number, t: number, cy: number) => number;
  getThickness: (x: number, t: number) => number;
}

export const WaveDivider: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Preallocated coordinate caches to eliminate 100% of per-frame heap allocations & GC pauses
    const step = 8;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let numPoints = 0;
    let topYArr = new Float32Array(0);
    let botYArr = new Float32Array(0);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      cx = width * 0.5;
      cy = height * 0.5;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      numPoints = Math.ceil(width / step) + 1;
      if (numPoints > topYArr.length) {
        topYArr = new Float32Array(numPoints + 5);
        botYArr = new Float32Array(numPoints + 5);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    const layers: LayerConfig[] = [
      {
        strokeColor: 'rgba(119, 137, 171, 0.45)',
        fillColor: 'rgba(119, 137, 171, 0.04)',
        lineWidth: 1.2,
        glowColor: 'rgba(119, 137, 171, 0.3)',
        glowBlur: 4,
        getTopY: (x, t, cy) =>
          cy -
          5 +
          Math.sin(x * 0.0018 + t * 0.3 + 5.0) * 20 +
          Math.sin(x * 0.0042 - t * 0.22) * 8,
        getThickness: (x, t) => 34 + Math.cos(x * 0.0025 + t * 0.28 + 3.0) * 10,
      },
      {
        strokeColor: 'rgba(155, 255, 0, 0.55)',
        fillColor: 'rgba(155, 255, 0, 0.045)',
        lineWidth: 1.5,
        glowColor: 'rgba(155, 255, 0, 0.35)',
        glowBlur: 6,
        getTopY: (x, t, cy) =>
          cy -
          9 +
          Math.sin(x * 0.0024 + t * 0.45 + 3.8) * 18 +
          Math.sin(x * 0.0055 - t * 0.35) * 8,
        getThickness: (x, t) => 30 + Math.cos(x * 0.0033 + t * 0.4 + 2.0) * 8,
      },
      {
        strokeColor: 'rgba(119, 137, 171, 0.85)',
        fillColor: 'rgba(119, 137, 171, 0.08)',
        lineWidth: 1.8,
        glowColor: 'rgba(119, 137, 171, 0.6)',
        glowBlur: 8,
        getTopY: (x, t, cy) =>
          cy -
          13 +
          Math.sin(x * 0.0036 - t * 0.68 + 1.8) * 16 +
          Math.cos(x * 0.0022 + t * 0.85) * 9,
        getThickness: (x, t) => 27 + Math.sin(x * 0.0045 - t * 0.52 + 0.9) * 8,
      },
      {
        strokeColor: 'rgba(155, 255, 0, 0.95)',
        fillColor: 'rgba(155, 255, 0, 0.09)',
        lineWidth: 2.2,
        glowColor: 'rgba(155, 255, 0, 0.75)',
        glowBlur: 10,
        getTopY: (x, t, cy) =>
          cy -
          16 +
          Math.sin(x * 0.0032 + t * 0.92) * 17 +
          Math.sin(x * 0.0068 - t * 0.58) * 9 +
          Math.cos(x * 0.0018 + t * 0.36) * 6,
        getThickness: (x, t) =>
          25 +
          Math.sin(x * 0.0038 + t * 0.78 + 1.4) * 8 +
          Math.cos(x * 0.0072 - t * 0.48) * 4,
      },
    ];

    const INTRO_CONNECT_DURATION = 1.25; // seconds for left and right ends to connect symmetrically in the center
    const WAVE_PROPAGATE_DURATION = 0.55; // seconds for wave undulation to ripple outward from center to edges
    const SHOCKWAVE_BURST_DURATION = 0.65; // seconds for central fusion spark & shockwave ring
    const MOBILE_FADE_IN_DURATION = 1.0; // seconds for smooth wave fade-in on mobile (<900px)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let startTime: number | null = prefersReducedMotion ? 0 : null;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || width <= 0 || height <= 0) return;

      if (startTime === null) {
        startTime = now;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = prefersReducedMotion ? 100 : (now - startTime) * 0.001;
      const isMobile = width < 900;

      // Phase 1 (Desktop only, >= 900px): Left and Right ends travel symmetrically towards the center
      if (!isMobile && elapsed < INTRO_CONNECT_DURATION) {
        const p = elapsed / INTRO_CONNECT_DURATION;
        const easedP =
          p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

        const leftHeadX = cx * easedP;
        const rightHeadX = width - cx * easedP;

        // Ambient Slate guide line
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(leftHeadX, cy);
        ctx.moveTo(width, cy);
        ctx.lineTo(rightHeadX, cy);
        ctx.strokeStyle = 'rgba(119, 137, 171, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Main Electric Lime glowing beam
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(leftHeadX, cy);
        ctx.moveTo(width, cy);
        ctx.lineTo(rightHeadX, cy);
        ctx.strokeStyle = 'rgba(155, 255, 0, 0.9)';
        ctx.lineWidth = 2.2;
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Radiant glowing heads on traveling ends
        ctx.beginPath();
        ctx.arc(leftHeadX, cy, 3.5, 0, Math.PI * 2);
        ctx.arc(rightHeadX, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        return;
      }

      // Phase 2: Waves undulation
      // On mobile (<900px): starts immediately at second 0
      // On desktop (>=900px): starts after connection at INTRO_CONNECT_DURATION
      const waveElapsed = isMobile ? elapsed : elapsed - INTRO_CONNECT_DURATION;
      const t = waveElapsed * 1.6;

      // Ripple propagation: on mobile, waves are awake immediately across full screen width
      const rippleSpeed = cx / WAVE_PROPAGATE_DURATION;
      const rippleRadius = isMobile ? cx : waveElapsed * rippleSpeed;
      const isFullyAwake = isMobile || rippleRadius >= cx;

      // Smooth fade-in on mobile (<900px) instead of sudden cut
      if (isMobile) {
        const fadeProgress = Math.min(
          1,
          Math.max(0, elapsed / MOBILE_FADE_IN_DURATION),
        );
        // Soft cubic ease-out fade
        const alpha = 1 - Math.pow(1 - fadeProgress, 3);
        ctx.globalAlpha = alpha;
      } else {
        ctx.globalAlpha = 1;
      }

      // Responsive adjustments for mobile/tablet (<900px):
      // Damped vertical amplitude (0.65x) and slight downward seating to keep crests safely below buttons
      const ampScale = isMobile ? 0.65 : 1.0;
      const waveCy = isMobile ? cy + 12 : cy;

      for (let l = 0; l < layers.length; l++) {
        const layer = layers[l];

        // 1. Calculate and store coordinates in pre-allocated Float32Array (0 bytes heap garbage)
        for (let i = 0; i <= numPoints; i++) {
          const x = i * step;
          const distFromCenter = Math.abs(x - cx);

          let amp = 1;
          if (!isFullyAwake) {
            if (distFromCenter > rippleRadius) {
              amp = 0;
            } else {
              const edgeDist = rippleRadius - distFromCenter;
              amp = Math.min(1, edgeDist / 60);
            }
          }

          const targetTopY = layer.getTopY(x, t, waveCy);
          const topY = waveCy + (targetTopY - waveCy) * amp * ampScale;
          const thickness =
            layer.getThickness(x, t) * amp * (isMobile ? 0.75 : 1.0);
          const botY = topY + thickness;

          topYArr[i] = topY;
          botYArr[i] = botY;
        }

        // 2. Draw layer fill (translucent ribbon body)
        if (isMobile || rippleRadius > 20) {
          ctx.beginPath();
          ctx.moveTo(0, topYArr[0]);
          for (let i = 1; i <= numPoints; i++) {
            ctx.lineTo(i * step, topYArr[i]);
          }
          for (let i = numPoints; i >= 0; i--) {
            ctx.lineTo(i * step, botYArr[i]);
          }
          ctx.closePath();

          ctx.fillStyle = layer.fillColor;
          ctx.shadowBlur = 0;
          ctx.fill();
        }

        // 3. Draw top ribbon stroke with glow
        ctx.beginPath();
        ctx.moveTo(0, topYArr[0]);
        for (let i = 1; i <= numPoints; i++) {
          ctx.lineTo(i * step, topYArr[i]);
        }
        ctx.strokeStyle = layer.strokeColor;
        ctx.lineWidth = isMobile ? layer.lineWidth * 0.9 : layer.lineWidth;
        if (layer.glowColor && layer.glowBlur) {
          ctx.shadowColor = layer.glowColor;
          ctx.shadowBlur = isMobile ? Math.min(6, layer.glowBlur) : layer.glowBlur;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();

        // 4. Draw bottom ribbon stroke (once thickness emerges)
        if (isMobile || rippleRadius > 20) {
          ctx.beginPath();
          ctx.moveTo(0, botYArr[0]);
          for (let i = 1; i <= numPoints; i++) {
            ctx.lineTo(i * step, botYArr[i]);
          }
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      // Central Fusion Spark & Expanding Shockwave Burst (Desktop only, >= 900px)
      if (!isMobile && waveElapsed < SHOCKWAVE_BURST_DURATION) {
        const burstRatio = waveElapsed / SHOCKWAVE_BURST_DURATION;
        const fade = 1 - burstRatio;
        const ringRadius = burstRatio * Math.min(cx, 160);

        // Expanding shockwave ring
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155, 255, 0, ${fade * 0.85})`;
        ctx.lineWidth = 2 * fade;
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = Math.min(14, 20 * fade);
        ctx.stroke();

        // Secondary Steel Slate inner ring (no blur for GPU speedup)
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(119, 137, 171, ${fade * 0.6})`;
        ctx.lineWidth = 1.5 * fade;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Center bright plasma spark at fusion point
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(0.1, 7 * fade), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = Math.min(16, 22 * fade);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Reset globalAlpha at end of frame
      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.dividerWrapper} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.waveCanvas} />
    </div>
  );
};

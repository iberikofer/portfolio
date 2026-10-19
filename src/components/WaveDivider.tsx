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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let startTime: number | null = prefersReducedMotion ? 0 : null;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      if (startTime === null) {
        startTime = now;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cy = height * 0.5;
      const cx = width * 0.5;

      ctx.clearRect(0, 0, width, height);

      const elapsed = prefersReducedMotion ? 100 : (now - startTime) * 0.001;

      // Phase 1: Left and Right ends travel symmetrically towards the center
      if (elapsed < INTRO_CONNECT_DURATION) {
        const p = elapsed / INTRO_CONNECT_DURATION;
        // Smooth Kowalski cubic ease-in-out
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
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Radiant glowing heads on the traveling ends
        ctx.save();
        ctx.beginPath();
        ctx.arc(leftHeadX, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 18;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rightHeadX, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();

        return;
      }

      // Phase 2 & 3: Connection made! The wave animation is born and undulation begins
      const waveElapsed = elapsed - INTRO_CONNECT_DURATION;
      const t = waveElapsed * 1.6; // wave undulation speed (1.6 rad/s scale)

      // Ripple wavefront expanding outward from center to both edges
      const rippleSpeed = cx / WAVE_PROPAGATE_DURATION;
      const rippleRadius = waveElapsed * rippleSpeed;
      const isFullyAwake = rippleRadius >= cx;

      const step = 6;
      const numPoints = Math.ceil(width / step) + 1;

      layers.forEach((layer) => {
        const topPoints: { x: number; y: number }[] = [];
        const botPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= numPoints; i++) {
          const x = i * step;
          const distFromCenter = Math.abs(x - cx);

          // Amplitude envelope: 0 before ripple hits, ramps smoothly to 1 behind the wavefront
          let amp = 1;
          if (!isFullyAwake) {
            if (distFromCenter > rippleRadius) {
              amp = 0;
            } else {
              const edgeDist = rippleRadius - distFromCenter;
              amp = Math.min(1, edgeDist / 60);
            }
          }

          const targetTopY = layer.getTopY(x, t, cy);
          const topY = cy + (targetTopY - cy) * amp;
          const thickness = layer.getThickness(x, t) * amp;
          const botY = topY + thickness;

          topPoints.push({ x, y: topY });
          botPoints.push({ x, y: botY });
        }

        // Draw layer fill (translucent ribbon body)
        if (rippleRadius > 20) {
          ctx.beginPath();
          ctx.moveTo(topPoints[0].x, topPoints[0].y);
          for (let i = 1; i < topPoints.length; i++) {
            ctx.lineTo(topPoints[i].x, topPoints[i].y);
          }
          for (let i = botPoints.length - 1; i >= 0; i--) {
            ctx.lineTo(botPoints[i].x, botPoints[i].y);
          }
          ctx.closePath();

          ctx.fillStyle = layer.fillColor;
          ctx.shadowBlur = 0;
          ctx.fill();
        }

        // Draw top ribbon stroke
        ctx.beginPath();
        ctx.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 1; i < topPoints.length; i++) {
          ctx.lineTo(topPoints[i].x, topPoints[i].y);
        }
        ctx.strokeStyle = layer.strokeColor;
        ctx.lineWidth = layer.lineWidth;
        if (layer.glowColor && layer.glowBlur) {
          ctx.shadowColor = layer.glowColor;
          ctx.shadowBlur = layer.glowBlur;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();

        // Draw bottom ribbon stroke (once thickness emerges)
        if (rippleRadius > 20) {
          ctx.beginPath();
          ctx.moveTo(botPoints[0].x, botPoints[0].y);
          for (let i = 1; i < botPoints.length; i++) {
            ctx.lineTo(botPoints[i].x, botPoints[i].y);
          }
          ctx.stroke();
        }
      });

      // Synergistic Central Fusion Spark & Expanding Shockwave Burst
      if (waveElapsed < SHOCKWAVE_BURST_DURATION) {
        const burstRatio = waveElapsed / SHOCKWAVE_BURST_DURATION;
        const fade = 1 - burstRatio;
        const ringRadius = burstRatio * Math.min(cx, 160);

        ctx.save();
        // Expanding shockwave ring
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155, 255, 0, ${fade * 0.85})`;
        ctx.lineWidth = 2 * fade;
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 22 * fade;
        ctx.stroke();

        // Secondary Steel Slate inner ring
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(119, 137, 171, ${fade * 0.6})`;
        ctx.lineWidth = 1.5 * fade;
        ctx.stroke();

        // Center bright plasma spark at fusion point
        ctx.beginPath();
        ctx.arc(cx, cy, 7 * fade, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9BFF00';
        ctx.shadowBlur = 24 * fade;
        ctx.fill();
        ctx.restore();
      }
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

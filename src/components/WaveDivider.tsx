import React, { useEffect, useRef } from "react";
import styles from "./WaveDivider.module.scss";

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

    const ctx = canvas.getContext("2d");
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
        strokeColor: "rgba(100, 255, 188, 0.12)",
        fillColor: "rgba(100, 255, 188, 0.015)",
        lineWidth: 0.9,
        getTopY: (x, t, cy) =>
          cy - 5 +
          Math.sin(x * 0.0018 + t * 0.3 + 5.0) * 20 +
          Math.sin(x * 0.0042 - t * 0.22) * 8,
        getThickness: (x, t) =>
          34 + Math.cos(x * 0.0025 + t * 0.28 + 3.0) * 10,
      },
      {
        strokeColor: "rgba(100, 255, 188, 0.25)",
        fillColor: "rgba(100, 255, 188, 0.03)",
        lineWidth: 1.2,
        getTopY: (x, t, cy) =>
          cy - 9 +
          Math.sin(x * 0.0024 + t * 0.45 + 3.8) * 18 +
          Math.sin(x * 0.0055 - t * 0.35) * 8,
        getThickness: (x, t) =>
          30 + Math.cos(x * 0.0033 + t * 0.4 + 2.0) * 8,
      },
      {
        strokeColor: "rgba(100, 255, 188, 0.45)",
        fillColor: "rgba(100, 255, 188, 0.05)",
        lineWidth: 1.5,
        glowColor: "rgba(100, 255, 188, 0.2)",
        glowBlur: 4,
        getTopY: (x, t, cy) =>
          cy - 13 +
          Math.sin(x * 0.0036 - t * 0.68 + 1.8) * 16 +
          Math.cos(x * 0.0022 + t * 0.85) * 9,
        getThickness: (x, t) =>
          27 + Math.sin(x * 0.0045 - t * 0.52 + 0.9) * 8,
      },
      {
        strokeColor: "rgba(100, 255, 188, 0.75)",
        fillColor: "rgba(100, 255, 188, 0.08)",
        lineWidth: 2.0,
        glowColor: "rgba(100, 255, 188, 0.5)",
        glowBlur: 8,
        getTopY: (x, t, cy) =>
          cy - 16 +
          Math.sin(x * 0.0032 + t * 0.92) * 17 +
          Math.sin(x * 0.0068 - t * 0.58) * 9 +
          Math.cos(x * 0.0018 + t * 0.36) * 6,
        getThickness: (x, t) =>
          25 +
          Math.sin(x * 0.0038 + t * 0.78 + 1.4) * 8 +
          Math.cos(x * 0.0072 - t * 0.48) * 4,
      },
    ];

    const startTime = performance.now();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const t = (now - startTime) * 0.0015;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cy = height * 0.5;

      ctx.clearRect(0, 0, width, height);

      const step = 6;
      const numPoints = Math.ceil(width / step) + 1;

      layers.forEach((layer) => {
        const topPoints: { x: number; y: number }[] = [];
        const botPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= numPoints; i++) {
          const x = i * step;
          const topY = layer.getTopY(x, t, cy);
          const thickness = layer.getThickness(x, t);
          const botY = topY + thickness;

          topPoints.push({ x, y: topY });
          botPoints.push({ x, y: botY });
        }

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

        ctx.beginPath();
        ctx.moveTo(botPoints[0].x, botPoints[0].y);
        for (let i = 1; i < botPoints.length; i++) {
          ctx.lineTo(botPoints[i].x, botPoints[i].y);
        }
        ctx.stroke();
      });
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

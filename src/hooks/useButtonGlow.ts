'use client';

import React, { useEffect } from 'react';

/**
 * Hook for high-performance cursor-following dynamic glow effect on buttons.
 * - Blooms smoothly at the exact entry point when cursor enters (pointerenter)
 * - Follows cursor with silky spring lerp inertia in requestAnimationFrame
 * - Fades away smoothly on pointerleave
 * - Automatically ignores touch devices to avoid stuck hover states
 */
export function useButtonGlow<T extends HTMLElement>(
  buttonRef: React.RefObject<T | null>,
  glowRef: React.RefObject<HTMLSpanElement | null>,
) {
  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    if (!button || !glow) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;
    let rafId: number | null = null;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      // Natural spring lag factor (0.16)
      currentX = lerp(currentX, targetX, 0.16);
      currentY = lerp(currentY, targetY, 0.16);

      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      const dx = Math.abs(targetX - currentX);
      const dy = Math.abs(targetY - currentY);

      // Keep updating while hovered or while still catching up to the exit point
      if (isHovered || dx > 0.1 || dy > 0.1) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (button.hasAttribute('disabled')) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Snap coordinates instantly to entry point so the glow blooms right under cursor
      currentX = x;
      currentY = y;
      targetX = x;
      targetY = y;

      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      glow.style.opacity = '1';

      isHovered = true;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (button.hasAttribute('disabled')) {
        isHovered = false;
        glow.style.opacity = '0';
        return;
      }

      const rect = button.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!isHovered) {
        isHovered = true;
        glow.style.opacity = '1';
      }

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handlePointerLeave = () => {
      isHovered = false;
      glow.style.opacity = '0';
    };

    button.addEventListener('pointerenter', handlePointerEnter);
    button.addEventListener('pointermove', handlePointerMove);
    button.addEventListener('pointerleave', handlePointerLeave);
    button.addEventListener('pointercancel', handlePointerLeave);

    return () => {
      button.removeEventListener('pointerenter', handlePointerEnter);
      button.removeEventListener('pointermove', handlePointerMove);
      button.removeEventListener('pointerleave', handlePointerLeave);
      button.removeEventListener('pointercancel', handlePointerLeave);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [buttonRef, glowRef]);
}

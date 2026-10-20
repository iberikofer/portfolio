'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { DATA } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import styles from './Hero.module.scss';
import developer from '../assets/yaroslav.png';
import { WaveDivider } from '../components/WaveDivider';
import { useButtonGlow } from '../hooks/useButtonGlow';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const viewProjectsRef = useRef<HTMLAnchorElement>(null);
  const viewProjectsGlowRef = useRef<HTMLSpanElement>(null);
  useButtonGlow(viewProjectsRef, viewProjectsGlowRef);

  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRingRef = useRef<HTMLDivElement>(null);
  const orbitRingSecRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  // Physics and direction state for the interactive green beam animation
  const nameBeamRef = useRef({
    pos: -35,
    targetPos: -35,
    currentY: 50,
    targetY: 50,
    beamRadius: 160,
    direction: 1 as 1 | -1,
    lastDirection: 1 as 1 | -1,
    lastClientX: 0,
    lastClientY: 0,
    isHovering: false,
  });

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    let animId: number;
    let lastTime = performance.now();
    const speed = 40; // % per second (~4.25s for full 170% pass)
    const minBound = -35;
    const maxBound = 135;

    const update = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const s = nameBeamRef.current;
      if (s.isHovering) {
        // Fluid tracking toward cursor position
        const diffX = s.targetPos - s.pos;
        s.pos += diffX * Math.min(1, dt * 22);

        const diffY = s.targetY - s.currentY;
        s.currentY += diffY * Math.min(1, dt * 18);

        s.beamRadius += (210 - s.beamRadius) * Math.min(1, dt * 10);
      } else {
        // Continuous traveling beam advancing in current direction
        s.pos += s.direction * speed * dt;

        // Wrap around seamlessly off-screen
        if (s.direction === 1 && s.pos > maxBound) {
          s.pos = minBound;
        } else if (s.direction === -1 && s.pos < minBound) {
          s.pos = maxBound;
        }

        s.currentY += (50 - s.currentY) * Math.min(1, dt * 6);
        s.beamRadius += (160 - s.beamRadius) * Math.min(1, dt * 8);
      }

      el.style.setProperty('--beam-x', `${s.pos.toFixed(2)}%`);
      el.style.setProperty('--beam-y', `${s.currentY.toFixed(1)}%`);
      el.style.setProperty('--beam-r', `${s.beamRadius.toFixed(1)}px`);

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleBlobMouseEnter = useCallback(() => {
    // Accelerate orbit rings to fast energetic speed only when hovering over the blob
    orbitRingRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 6.0;
    });
    orbitRingSecRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 4.2;
    });
  }, []);

  const handleBlobMouseLeave = useCallback(() => {
    // Slow orbit rings back down to slow ambient speed when leaving the blob
    orbitRingRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 1.0;
    });
    orbitRingSecRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 1.0;
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = visualRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    card.style.setProperty(
      '--mouse-x',
      `${((x / rect.width) * 100).toFixed(1)}%`,
    );
    card.style.setProperty(
      '--mouse-y',
      `${((y / rect.height) * 100).toFixed(1)}%`,
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = visualRef.current;
    if (card) {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    }
    // Safeguard: Ensure orbit rings are at slow speed when mouse leaves the visual area
    orbitRingRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 1.0;
    });
    orbitRingSecRef.current?.getAnimations().forEach((anim) => {
      anim.playbackRate = 1.0;
    });
  }, []);

  const handleNameMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        0,
        Math.min(100, ((e.clientY - rect.top) / rect.height) * 100),
      );

      const s = nameBeamRef.current;
      s.isHovering = true;
      s.targetPos = x;
      s.targetY = y;
      s.lastClientX = e.clientX;
      s.lastClientY = e.clientY;
    },
    [],
  );

  const handleNameMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        0,
        Math.min(100, ((e.clientY - rect.top) / rect.height) * 100),
      );

      const s = nameBeamRef.current;
      const dx = e.clientX - s.lastClientX;
      if (Math.abs(dx) >= 1) {
        s.lastDirection = dx > 0 ? 1 : -1;
      }

      s.lastClientX = e.clientX;
      s.lastClientY = e.clientY;
      s.targetPos = x;
      s.targetY = y;
      s.isHovering = true;
    },
    [],
  );

  const handleNameMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const s = nameBeamRef.current;

      s.isHovering = false;
      const exitX = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
      );
      s.pos = exitX;
      s.targetPos = exitX;

      // Determine exit direction:
      // If exited right edge: resume right (1)
      // If exited left edge: resume left (-1)
      // If exited top/bottom: resume based on cursor movement momentum (s.lastDirection)
      if (e.clientX >= rect.right - 6) {
        s.direction = 1;
      } else if (e.clientX <= rect.left + 6) {
        s.direction = -1;
      } else {
        s.direction = s.lastDirection || (exitX > 50 ? 1 : -1);
      }
    },
    [],
  );

  const handleNameTouchStart = useCallback(
    (e: React.TouchEvent<HTMLSpanElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        0,
        Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100),
      );

      const s = nameBeamRef.current;
      s.isHovering = true;
      s.targetPos = x;
      s.targetY = y;
      s.lastClientX = touch.clientX;
      s.lastClientY = touch.clientY;
    },
    [],
  );

  const handleNameTouchMove = useCallback(
    (e: React.TouchEvent<HTMLSpanElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const el = nameRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        0,
        Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100),
      );

      const s = nameBeamRef.current;
      const dx = touch.clientX - s.lastClientX;
      if (Math.abs(dx) >= 1) {
        s.lastDirection = dx > 0 ? 1 : -1;
      }

      s.lastClientX = touch.clientX;
      s.lastClientY = touch.clientY;
      s.targetPos = x;
      s.targetY = y;
    },
    [],
  );

  const handleNameTouchEnd = useCallback(() => {
    const s = nameBeamRef.current;
    s.isHovering = false;
    s.direction = s.lastDirection || 1;
  }, []);

  return (
    <section className={styles.hero}>
      {/* Ambient Radial Lighting Cone in Slate & Lime */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`${styles.heroInner} container`}>
        <div className={styles.layout}>
          <div className={styles.content}>
            {/* Live Availability Radar Pill */}
            <div className={`${styles.statusBadge} ${styles.animateFadeIn}`}>
              <span className={styles.radarWrapper}>
                <span className={styles.radarPing} />
                <span className={styles.radarDot} />
              </span>
              <span className={styles.statusText}>
                {t.hero.status}
              </span>
            </div>

            <p className={`${styles.intro} ${styles.animateFadeIn}`}>
              <span className={styles.introPrefix}>//</span> {t.hero.intro}
            </p>

            <h1 className={`${styles.name} ${styles.animateFadeIn}`}>
              <span
                ref={nameRef}
                className={styles.nameHighlight}
                onMouseEnter={handleNameMouseEnter}
                onMouseMove={handleNameMouseMove}
                onMouseLeave={handleNameMouseLeave}
                onTouchStart={handleNameTouchStart}
                onTouchMove={handleNameTouchMove}
                onTouchEnd={handleNameTouchEnd}
              >
                {t.profile.name}
              </span>
            </h1>

            <p className={`${styles.bio} ${styles.animateFadeIn}`}>
              {t.hero.bio}
            </p>

            {/* Quick Metrics Bar */}
            <div className={`${styles.metricsBar} ${styles.animateFadeIn}`}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>17+</span>
                <span className={styles.metricLab}>{t.hero.metricProjects}</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>B2</span>
                <span className={styles.metricLab}>{t.hero.metricEnglish}</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>B.Sc.</span>
                <span className={styles.metricLab}>{t.hero.metricDegree}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className={`${styles.actions} ${styles.animateFadeIn}`}>
              <a
                ref={viewProjectsRef}
                href="#projects"
                className={styles.primaryButton}
              >
                <span className={styles.btnGlow} aria-hidden="true">
                  <span ref={viewProjectsGlowRef} className={styles.glowSpot} />
                </span>
                <span className={styles.buttonLabel}>{t.hero.btnViewProjects}</span>
                <svg
                  className={styles.buttonIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#contact"
                className={styles.secondaryButton}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    '--mouse-x',
                    `${((e.clientX - rect.left) / rect.width) * 100}%`
                  );
                  e.currentTarget.style.setProperty(
                    '--mouse-y',
                    `${((e.clientY - rect.top) / rect.height) * 100}%`
                  );
                }}
              >
                <span className={styles.buttonLabel}>{t.hero.btnGetInTouch}</span>
                <svg
                  className={styles.buttonIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className={styles.visualSide}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={visualRef} className={styles.avatarStage}>
              {/* Ambient Pulsing Aura */}
              <div className={styles.avatarGlow} aria-hidden="true" />

              {/* Rotating Cyber/Tech Orbit Rings */}
              <div
                ref={orbitRingRef}
                className={styles.orbitRing}
                aria-hidden="true"
              >
                <span className={styles.orbitPip} />
              </div>
              <div
                ref={orbitRingSecRef}
                className={styles.orbitRingSecondary}
                aria-hidden="true"
              />

              {/* Floating Levitation Container */}
              <div className={styles.floatingContainer}>
                <div
                  className={styles.blob}
                  onMouseEnter={handleBlobMouseEnter}
                  onMouseLeave={handleBlobMouseLeave}
                >
                  <img
                    src={
                      typeof developer === 'string'
                        ? developer
                        : (developer as { src: string }).src
                    }
                    alt={t.profile.name}
                    width={500}
                    height={500}
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Subtle Light Reflection Sweep */}
                  <div className={styles.imageShine} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
};

export default Hero;

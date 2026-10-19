import React, { useRef, useCallback } from 'react';
import { DATA } from '../data/config';
import styles from './Hero.module.scss';
import developer from '../assets/yaroslav.png';
import { WaveDivider } from '../components/WaveDivider';

const Hero: React.FC = () => {
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRingRef = useRef<HTMLDivElement>(null);
  const orbitRingSecRef = useRef<HTMLDivElement>(null);

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

  const handleNameMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty('--name-mouse-x', `${x.toFixed(1)}%`);
      e.currentTarget.style.setProperty('--name-mouse-y', `${y.toFixed(1)}%`);
    },
    [],
  );

  const handleNameMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.currentTarget.style.setProperty('--name-mouse-x', '50%');
      e.currentTarget.style.setProperty('--name-mouse-y', '50%');
    },
    [],
  );

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
                Available for new opportunities
              </span>
            </div>

            <p className={`${styles.intro} ${styles.animateFadeIn}`}>
              <span className={styles.introPrefix}>//</span> Hi, my name is
            </p>

            <h1 className={`${styles.name} ${styles.animateFadeIn}`}>
              <span
                className={styles.nameHighlight}
                data-text={DATA.profile.name}
                onMouseMove={handleNameMouseMove}
                onMouseLeave={handleNameMouseLeave}
              >
                {DATA.profile.name}
              </span>
            </h1>

            <p className={`${styles.bio} ${styles.animateFadeIn}`}>
              Passionate engineer focused on the React and Node.js ecosystems.
              Building fast, resilient, and visually refined web applications,
              while advancing in systems programming, algorithms, and
              mathematics at university.
            </p>

            {/* Quick Metrics Bar */}
            <div className={`${styles.metricsBar} ${styles.animateFadeIn}`}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>9+</span>
                <span className={styles.metricLab}>Web Projects</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>B2</span>
                <span className={styles.metricLab}>English</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>B.Sc.</span>
                <span className={styles.metricLab}>Software Eng.</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className={`${styles.actions} ${styles.animateFadeIn}`}>
              <a href="#projects" className={styles.primaryButton}>
                <span className={styles.buttonLabel}>View Projects</span>
                <span className={styles.buttonGlowSweep} aria-hidden="true" />
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

              <a href="#contact" className={styles.secondaryButton}>
                <span className={styles.buttonLabel}>Get in Touch</span>
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
                    src={developer}
                    alt={DATA.profile.name}
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

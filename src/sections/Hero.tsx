import React from 'react';
import { DATA } from '../data/config';
import styles from './Hero.module.scss';
import developer from '../assets/yaroslav.png';
import { WaveDivider } from '../components/WaveDivider';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Ambient Radial Lighting Cone in Slate & Lime */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`${styles.heroInner} container`}>
        <div className={styles.layout}>
          <div className={styles.content}>
            {/* Live Availability Radar Pill */}
            <div className={styles.statusBadge}>
              <span className={styles.radarWrapper}>
                <span className={styles.radarPing} />
                <span className={styles.radarDot} />
              </span>
              <span className={styles.statusText}>
                Available for new opportunities
              </span>
            </div>

            <p className={styles.intro}>Hi, my name is</p>
            <h1 className={styles.name}>{DATA.profile.name}</h1>

            <p className={styles.bio}>
              Passionate engineer focused on the React and Node.js ecosystems.
              Building fast, resilient, and visually refined web applications,
              while advancing in systems programming, algorithms, and
              mathematics at university.
            </p>

            {/* Quick Metrics Bar */}
            <div className={styles.metricsBar}>
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

            {/* Primary Action Button */}
            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryButton}>
                <span>View Projects</span>
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
                <span>Get in Touch</span>
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

          <div className={styles.visualSide}>
            <div className={styles.blob}>
              <img
                src={developer}
                alt={DATA.profile.name}
                width={500}
                height={500}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
};

export default Hero;

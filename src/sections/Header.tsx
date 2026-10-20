'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { t, toggleLang, isTransitioning } = useLanguage();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRunning: number | null = null;

    const updateScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollHeight))
          : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      requestRunning = null;
    };

    updateScroll();

    const handleScroll = () => {
      if (!requestRunning) {
        requestRunning = window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRunning) window.cancelAnimationFrame(requestRunning);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.progressTrack}>
        <div ref={progressBarRef} className={styles.progressBar} />
      </div>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>
          <span className={styles.logoPrefix}>~/</span>
          <span className={styles.logoName}>
            <span className={styles.firstName}>
              {t.profile.name.split(' ')[0]}
            </span>
            <span className={styles.lastName}>
              {t.profile.name.includes(' ')
                ? ` ${t.profile.name.split(' ').slice(1).join(' ')}`
                : ''}
            </span>
          </span>
          <span className={styles.cursor} aria-hidden="true">
            _
          </span>
        </div>

        <div className={styles.navRight}>
          <ul className={styles.menu}>
            <li>
              <a href="#projects">{t.header.navProjects}</a>
            </li>
            <li>
              <a href="#about">{t.header.navAbout}</a>
            </li>
            <li>
              <a href="#contact">{t.header.navContact}</a>
            </li>
          </ul>

          <button
            type="button"
            className={`${styles.langToggleBtn} ${isTransitioning ? styles.busy : ''}`}
            onClick={() => {
              trackEvent('toggle_language');
              toggleLang();
            }}
            disabled={isTransitioning}
            aria-busy={isTransitioning}
            aria-label={t.header.toggleLangLabel}
            title={t.header.toggleLangLabel}
          >
            <svg
              className={styles.langIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

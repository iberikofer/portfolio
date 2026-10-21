'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { lang, setLang, t, isTransitioning } = useLanguage();
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

          <div
            className={`${styles.langSwitcher} ${isTransitioning ? styles.busy : ''}`}
            role="group"
            aria-label="Language selection"
          >
            {(
              [
                { code: 'en', label: 'EN', hint: 'English' },
                { code: 'uk', label: 'UK', hint: 'Українська' },
                { code: 'es', label: 'ES', hint: 'Español' },
              ] as const
            ).map(({ code, label, hint }) => {
              const isActive = lang === code;
              return (
                <div key={code} className={styles.langItem}>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${isActive ? styles.active : ''}`}
                    onClick={() => {
                      if (!isActive && !isTransitioning) {
                        trackEvent('toggle_language', { target: code });
                        setLang(code);
                      }
                    }}
                    disabled={isTransitioning}
                    aria-pressed={isActive}
                    aria-label={`Select ${hint}`}
                  >
                    {label}
                  </button>
                  <span className={styles.tooltip} role="tooltip">
                    {hint}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import styles from './Header.module.scss';

const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'uk', label: 'UK', name: 'Українська' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const;

const Header: React.FC = () => {
  const { lang, setLang, t, isTransitioning } = useLanguage();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu on Escape key press or window resize >= 769px
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 769) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [closeMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    closeMenu();
    document.body.style.overflow = '';

    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }, 50);
    }
  };

  const handleSelectLang = (code: 'en' | 'uk' | 'es') => {
    if (lang !== code && !isTransitioning) {
      trackEvent('toggle_language', { target: code });
      setLang(code);
    }
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${
        isMobileMenuOpen ? styles.menuOpen : ''
      }`}
    >
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
          {/* Desktop Navigation */}
          <ul className={styles.menu}>
            <li>
              <a href="#projects" draggable={false}>
                {t.header.navProjects}
              </a>
            </li>
            <li>
              <a href="#about" draggable={false}>
                {t.header.navAbout}
              </a>
            </li>
            <li>
              <a href="#contact" draggable={false}>
                {t.header.navContact}
              </a>
            </li>
          </ul>

          {/* Desktop Language Switcher */}
          <div
            className={`${styles.langSwitcher} ${
              isTransitioning ? styles.busy : ''
            }`}
            role="group"
            aria-label="Language selection"
          >
            {LANGUAGES.map(({ code, label, name }) => {
              const isActive = lang === code;
              return (
                <div key={code} className={styles.langItem}>
                  <button
                    type="button"
                    className={`${styles.langBtn} ${isActive ? styles.active : ''}`}
                    onClick={() => handleSelectLang(code)}
                    disabled={isTransitioning}
                    aria-pressed={isActive}
                    aria-label={`Select ${name}`}
                  >
                    {label}
                  </button>
                  <span className={styles.tooltip} role="tooltip">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Burger Toggle Button (< 769px) */}
          <button
            type="button"
            className={`${styles.burgerBtn} ${
              isMobileMenuOpen ? styles.burgerActive : ''
            }`}
            onClick={toggleMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
            <span className={styles.burgerBar} />
          </button>
        </div>
      </nav>

      {/* Backdrop for outside click dismissal */}
      <div
        className={`${styles.mobileBackdrop} ${
          isMobileMenuOpen ? styles.backdropVisible : ''
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu (< 769px) */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileDrawer} ${
          isMobileMenuOpen ? styles.drawerOpen : ''
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className={styles.mobileDrawerInner}>
          <ul className={styles.mobileNavList}>
            <li>
              <a
                href="#projects"
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, 'projects')}
                draggable={false}
              >
                <span className={styles.mobileNavIcon}>#</span>
                <span>{t.header.navProjects}</span>
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, 'about')}
                draggable={false}
              >
                <span className={styles.mobileNavIcon}>#</span>
                <span>{t.header.navAbout}</span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={styles.mobileNavLink}
                onClick={(e) => handleNavClick(e, 'contact')}
                draggable={false}
              >
                <span className={styles.mobileNavIcon}>#</span>
                <span>{t.header.navContact}</span>
              </a>
            </li>
          </ul>

          <div className={styles.mobileDivider} />

          {/* Language Selection: Format [Code — Name] */}
          <div
            className={`${styles.mobileLangList} ${
              isTransitioning ? styles.busy : ''
            }`}
            role="group"
            aria-label="Language selection"
          >
            {LANGUAGES.map(({ code, label, name }) => {
              const isActive = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  className={`${styles.mobileLangBtn} ${
                    isActive ? styles.mobileLangActive : ''
                  }`}
                  onClick={() => handleSelectLang(code)}
                  disabled={isTransitioning}
                  aria-pressed={isActive}
                  aria-label={`Select ${name}`}
                >
                  <span className={styles.mobileLangCode}>{label}</span>
                  <span className={styles.mobileLangDash}>—</span>
                  <span className={styles.mobileLangName}>{name}</span>
                  {isActive && (
                    <span
                      className={styles.mobileLangActiveDot}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

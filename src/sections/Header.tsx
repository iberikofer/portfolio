'use client';

import React, { useState, useEffect } from 'react';
import { DATA } from '../data/config';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let requestRunning: number | null = null;

    const updateScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
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
        <div
          className={styles.progressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>
          <span className={styles.logoPrefix}>~/</span>
          <span className={styles.logoName}>
            <span className={styles.firstName}>
              {DATA.profile.name.split(' ')[0]}
            </span>
            <span className={styles.lastName}>
              {DATA.profile.name.includes(' ')
                ? ` ${DATA.profile.name.split(' ').slice(1).join(' ')}`
                : ''}
            </span>
          </span>
          <span className={styles.cursor} aria-hidden="true">
            _
          </span>
        </div>
        <ul className={styles.menu}>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

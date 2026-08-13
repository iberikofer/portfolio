import React, { useState, useEffect } from "react";
import { DATA } from "../data/config";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 50;
    }
    return false;
  });

  const [scrollProgress, setScrollProgress] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    }
    return 0;
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const fullName = DATA.profile.name;

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!isDeleting) {
        index++;
        setDisplayedText(fullName.slice(0, index));

        if (index === fullName.length) {
          isDeleting = true;
          timer = setTimeout(tick, 3000);
          return;
        }
        timer = setTimeout(tick, 498);
      } else {
        index--;
        setDisplayedText(fullName.slice(0, index));

        if (index === 0) {
          isDeleting = false;
          timer = setTimeout(tick, 0);
          return;
        }
        timer = setTimeout(tick, 194);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [fullName]);

  useEffect(() => {
    let requestRunning: number | null = null;

    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
      requestRunning = null;
    };

    const handleScroll = () => {
      if (!requestRunning) {
        requestRunning = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRunning) window.cancelAnimationFrame(requestRunning);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>
          <span>{displayedText}</span>
          <span className={styles.cursor} aria-hidden="true">
            |
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

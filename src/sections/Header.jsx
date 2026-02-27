import React, { useState, useEffect } from "react";
import { DATA } from "../data/config";
import styles from "./Header.module.scss";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  let requestRunning = null;

  const updateProgress = () => {
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollHeight) * 100;
    setScrollProgress(progress);
    requestRunning = null;
  };

  const handleScroll = () => {
    if (!requestRunning) {
      requestRunning = window.requestAnimationFrame(updateProgress);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (requestRunning) window.cancelAnimationFrame(requestRunning);
  };
}, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>{DATA.profile.name}</div>
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

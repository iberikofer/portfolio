import React, { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPos =
        window.scrollY || document.documentElement.scrollTop || 0;
      setIsVisible(scrollPos > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`${styles.scrollToTop} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top">
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
};

export default ScrollToTop;

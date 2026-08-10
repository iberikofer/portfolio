import React, { useState, useEffect } from "react";
import styles from "./ScrollToTop.module.scss";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${styles.scrollToTop} ${isVisible ? styles.show : ""}`}
      onClick={scrollToTop}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && scrollToTop()}>
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
    </div>
  );
};

export default ScrollToTop;

import React from 'react';
import { DATA } from '../data/config';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <span className={styles.brandPrefix}>~/</span>
            <span className={styles.brandName}>{DATA.profile.name}</span>
          </div>

          <ul className={styles.footerNav}>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#root" className={styles.backToTop}>
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {currentYear} {DATA.profile.name}. All rights reserved.
          </p>

          <div className={styles.techBadge}>
            <span className={styles.techDot} />
            <span>React 19 &bull; TypeScript &bull; High-Craft UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

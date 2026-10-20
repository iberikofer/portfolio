'use client';

import React from 'react';
import { DATA } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <span className={styles.brandPrefix}>~/</span>
            <span className={styles.brandName}>{t.profile.name}</span>
          </div>

          <div className={styles.socialsSection}>
            <span className={styles.socialsHeading}>{t.contact.socialsTitle}</span>
            <div className={styles.socials}>
              <a
                href={DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={styles.socialBtn}
                title="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://t.me/YSych"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className={styles.socialBtn}
                title="Telegram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zm5.832 8.352l-1.992 9.392c-.144.664-.536.824-1.096.512l-3.032-2.232-1.464 1.408c-.16.16-.304.296-.624.296l.216-3.072 5.592-5.048c.24-.216-.048-.336-.368-.12l-6.912 4.352-2.976-.928c-.648-.2-.664-.648.136-.96l11.632-4.48c.536-.192 1.008.128.888.88z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/yaroslav.sych"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.socialBtn}
                title="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={styles.socialBtn}
                title="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; {currentYear} {t.profile.name}. {t.footer.copyright}
          </p>

          <div className={styles.techBadge}>
            <span className={styles.techDot} />
            <span>
              Next.js &bull; React 19 &bull; TypeScript &bull; Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

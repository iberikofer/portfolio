'use client';

import React from 'react';
import styles from './About.module.scss';
import { DATA } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  other: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headerArea}>
          <div className={styles.badge}>{t.about.badge}</div>
          <h2 className={styles.heading}>{t.about.heading}</h2>
          <p className={styles.subheading}>
            {t.about.subheading}
          </p>
        </div>

        <div className={styles.content}>
          {/* Top Left: Technical Skills Bento Grid */}
          <div className={styles.skillsSection}>
            <h3 className={styles.skillsHeading}>
              {t.about.skillsHeading}
            </h3>
            <div className={styles.skillsGrid}>
              {Object.entries(DATA.skills).map(([category, items]) => (
                <div key={category} className={styles.skillCard}>
                  <div className={styles.skillCardHeader}>
                    <span className={styles.skillCategoryIcon}>
                      {categoryIcons[category] || (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                      )}
                    </span>
                    <h4 className={styles.skillTitle}>{category}</h4>
                  </div>
                  <ul className={styles.skillList}>
                    {items.map((item) => (
                      <li key={item} className={styles.skillItem}>
                        <span className={styles.bulletDot} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Top Right: Education & Credentials */}
          <div className={styles.educationSection}>
            <div className={styles.timelineCard}>
              <div className={styles.boxHeader}>
                <div className={styles.boxHeaderIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <span>{t.about.eduHeading}</span>
              </div>

              <div className={styles.timeline}>
                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>
                      {t.about.vntuDate}
                    </span>
                    <span className={styles.statusPill}>{t.about.statusInProgress}</span>
                  </div>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/sCvKDiFo2cJhcYW37"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t.about.vntuName}</span>
                      <svg
                        className={styles.externalLinkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </h4>
                  <p>
                    {t.about.vntuDesc}
                  </p>
                </div>

                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>2022 — 2024</span>
                    <span className={styles.statusPillAlt}>{t.about.statusCertified}</span>
                  </div>
                  <h4>
                    <a
                      href="https://goit.global/et/courses/fullstack/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t.about.goitName}</span>
                      <svg
                        className={styles.externalLinkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </h4>
                  <p>
                    {t.about.goitDesc}
                  </p>
                </div>

                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>2021 — 2024</span>
                  </div>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/iNhCe66bAWo7mfTe8"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t.about.collegeName}</span>
                      <svg
                        className={styles.externalLinkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </h4>
                  <p>{t.about.collegeDesc}</p>
                </div>

                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>2021</span>
                  </div>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/A4iwefxeDXjC4wWNA"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t.about.lyceumName}</span>
                      <svg
                        className={styles.externalLinkIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </h4>
                  <p>{t.about.lyceumDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Greetings Bio Card */}
          <div className={styles.bioCard}>
            <p className={styles.leadText}>
              <span className={styles.greetings}>{t.about.greetings}</span>{' '}
              {t.about.bioLead}
            </p>
            <p>
              {t.about.bioSub}
            </p>
          </div>

          {/* Bottom Right: Academic Archive Card */}
          <div className={styles.accentBox}>
            <div className={styles.boxHeader}>
              <div className={styles.boxHeaderIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <span>{t.about.academicArchive}</span>
            </div>
            <p className={styles.archiveDescription}>
              {t.about.archiveDesc}
            </p>
            <a
              href="https://github.com/iberikofer/academic-archive"
              target="_blank"
              rel="noreferrer"
              className={styles.archiveLink}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <span>iberikofer/academic-archive</span>
              <span className={styles.arrowIcon}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

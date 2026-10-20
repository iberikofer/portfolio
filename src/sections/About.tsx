import React from 'react';
import styles from './About.module.scss';
import { DATA } from '../data/config';

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
  return (
    <section id="about" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headerArea}>
          <div className={styles.badge}>Background &amp; Expertise</div>
          <h2 className={styles.heading}>Engineering &amp; Foundations</h2>
          <p className={styles.subheading}>
            Fullstack development backed by university Computer Science studies,
            disciplined code architecture, and a passion for crafting responsive
            software.
          </p>
        </div>

        <div className={styles.content}>
          {/* Top Left: Technical Skills Bento Grid */}
          <div className={styles.skillsSection}>
            <h3 className={styles.skillsHeading}>
              Core Competencies &amp; Tech Stack
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
                <span>Education &amp; Credentials</span>
              </div>

              <div className={styles.timeline}>
                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>
                      2025 — Present (Exp. 2029)
                    </span>
                    <span className={styles.statusPill}>In Progress</span>
                  </div>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/sCvKDiFo2cJhcYW37"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Vinnytsia National Technical University
                    </a>
                  </h4>
                  <p>
                    Bachelor’s in Software Engineering — focus on data
                    structures, algorithms, and modern computing.
                  </p>
                </div>

                <div className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.date}>2022 — 2024</span>
                    <span className={styles.statusPillAlt}>Certified</span>
                  </div>
                  <h4>
                    <a
                      href="https://goit.global/et/courses/fullstack/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GoIT Academy
                    </a>
                  </h4>
                  <p>
                    Full-Stack Web Development Bootcamp (React, Node.js,
                    TypeScript, REST APIs).
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
                      Vinnytsia Trade and Economics College
                    </a>
                  </h4>
                  <p>Associate Degree in Tourism and Hospitality Management.</p>
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
                      Humanities Lyceum of Vinnytsia №1
                    </a>
                  </h4>
                  <p>Advanced studies in English and German languages.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Greetings Bio Card */}
          <div className={styles.bioCard}>
            <p className={styles.leadText}>
              <span className={styles.greetings}>Greetings!</span> I'm a
              Fullstack Developer specializing in modern web experiences with
              React, TypeScript, and Node.js. My passion for engineering began
              with asking how software works at the deepest level, driving me
              to explore both systems-level and high-level technologies.
            </p>
            <p>
              Currently, I am sharpening my full-stack capabilities while
              advancing in algorithms, mathematics, and systems programming
              (C++, Java, Python) at Vinnytsia National Technical University.
              I love turning complex logic into performant, visually
              impeccable digital products.
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
              <span>Academic Archive</span>
            </div>
            <p className={styles.archiveDescription}>
              A curated repository of university coursework, lab assignments,
              and computational projects across C++, Java, Python, and
              JavaScript — documenting my academic progression across diverse
              programming paradigms.
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

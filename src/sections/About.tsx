import React from 'react';
import styles from './About.module.scss';
import { DATA } from '../data/config';

const About: React.FC = () => {
  return (
    <section id="about" className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>About Me</h2>
        <div className={styles.divider}></div>
        <div className={styles.content}>
          <div className={styles.textSide}>
            <p>
              <b tabIndex={0} className={styles.greetings}>
                Greetings!
              </b>{' '}
              I'm an enthusiastic Fullstack Developer with a focus on building
              clean and efficient digital experiences. My journey into
              programming started with a curiosity about how things work under
              the hood, which led me to explore both low-level and high-level
              technologies.
            </p>
            <p>
              Currently, I'm honing my skills in the React ecosystem while also
              maintaining a strong interest in systems programming and
              mathematics. I enjoy solving complex problems and turning ideas
              into functional software.
            </p>

            <div className={styles.skillsGrid}>
              {Object.entries(DATA.skills).map(
                ([category, items], index, arr) => (
                  <React.Fragment key={category}>
                    <div className={styles.skillGroup}>
                      <h4 className={styles.skillTitle}>{category}</h4>
                      <ul className={styles.skillList}>
                        {items.map((item) => (
                          <li key={item} className={styles.skillItem}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < arr.length - 1 && (
                      <div className={styles.skillDivider} />
                    )}
                  </React.Fragment>
                ),
              )}
            </div>

            <div className={styles.accentBox}>
              <div className={styles.boxHeader}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Academic Archive</span>
              </div>
              <p className={styles.archiveDescription}>
                A curated collection of university coursework, lab assignments
                and projects spanning multiple languages — Java, C#, Python, C++
                and JavaScript. These works document my academic journey and
                reflect hands-on experience across different programming
                paradigms.
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
                iberikofer/academic-archive
              </a>
            </div>
          </div>

          <div className={styles.visualSide}>
            <div className={styles.accentBox}>
              <div className={styles.boxHeader}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>Education</span>
              </div>
              <div className={styles.timeline}>
                <div className={styles.item}>
                  <span className={styles.date}>
                    2025 — Present (Expected 2029)
                  </span>
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
                    Bachelor’s in Software Engineering (Flexible schedule
                    available if needed)
                  </p>
                </div>
                <div className={styles.item}>
                  <span className={styles.date}>2022 — 2024</span>
                  <h4>
                    <a
                      href="https://goit.global/et/courses/fullstack/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GoIT
                    </a>
                  </h4>
                  <p>Full-Stack development</p>
                </div>
                <div className={styles.item}>
                  <span className={styles.date}>2021 — 2024</span>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/iNhCe66bAWo7mfTe8"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Vinnytsia Trade and Economics College
                    </a>
                  </h4>
                  <p>Associate Degree in Tourism and Recreation</p>
                </div>
                <div className={styles.item}>
                  <span className={styles.date}>2021</span>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/A4iwefxeDXjC4wWNA"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Humanities Lyceum of Vinnytsia №1
                    </a>
                  </h4>
                  <p>English and German languages</p>
                </div>
              </div>
            </div>
            {/* In progress =) */}
            {/* <div className={styles.accentBox}>
              <div className={styles.boxHeader}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Work Experience</span>
              </div>
              <div className={styles.timeline}>
                <div className={styles.item}>
                  <span className={styles.date}>2024 — 2025</span>
                  <h4>
                    <a
                      href="https://maps.app.goo.gl/1k8WnDjq2m5nZvxh9"
                      target="_blank"
                      rel="noreferrer">
                      Tour Agency "GOU-Travel"
                    </a>
                  </h4>
                  <p>Tour agent / Tourism manager</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

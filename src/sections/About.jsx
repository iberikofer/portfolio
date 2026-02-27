import React from "react";
import styles from "./About.module.scss";
import { DATA } from "../data/config";

const About = () => {
  return (
    <section id="about" className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>About Me</h2>
        <div className={styles.divider}></div>
        <div className={styles.content}>
          <div className={styles.textSide}>
            <p>
              <b>Greetings!</b> I'm an enthusiastic Fullstack Developer with a
              focus on building clean and efficient digital experiences. My
              journey into programming started with a curiosity about how things
              work under the hood, which led me to explore both low-level and
              high-level technologies.
            </p>
            <p>
              Currently, I'm honing my skills in the React ecosystem while also
              maintaining a strong interest in systems programming and
              mathematics. I enjoy solving complex problems and turning ideas
              into functional software.
            </p>

            <div className={styles.skillsGrid}>
              {Object.entries(DATA.skills).map(([category, items]) => (
                <div key={category} className={styles.skillGroup}>
                  <h4 className={styles.skillTitle}>{category}</h4>
                  <ul className={styles.skillList}>
                    {items.map((item) => (
                      <li key={item} className={styles.skillItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualSide}>
            <div className={styles.accentBox}>
              <div className={styles.boxHeader}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>Education</span>
              </div>
              <div className={styles.timeline}>
                <div className={styles.item}>
                  <span className={styles.date}>2025 — 2029</span>
                  <h4>
                    <a href="https://maps.app.goo.gl/sCvKDiFo2cJhcYW37">
                      Vinnytsia National Technical University
                    </a>
                  </h4>
                  <p>Software Engineering</p>
                </div>
                <div className={styles.item}>
                  <span className={styles.date}>2021 — 2024</span>
                  <h4>
                    <a href="https://maps.app.goo.gl/iNhCe66bAWo7mfTe8">
                      Vinnytsia Trade and Economics College
                    </a>
                  </h4>
                  <p>Tourism and recreation</p>
                </div>
                <div className={styles.item}>
                  <span className={styles.date}>2021</span>
                  <h4>
                    <a href="https://maps.app.goo.gl/A4iwefxeDXjC4wWNA">
                      Humanities Lyceum of Vinnytsia №1
                    </a>
                  </h4>
                  <p>English and German languages</p>
                </div>
              </div>
            </div>
            <div className={styles.accentBox}>
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
                  <h4>Tour Agency "GOU-Travel"</h4>
                  <p>Tour agent / Tourism manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

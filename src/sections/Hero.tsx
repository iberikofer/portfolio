import React from "react";
import { DATA } from "../data/config";
import styles from "./Hero.module.scss";
import developer from "../assets/Yaroslav.png";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.heroInner} container`}>
        <div className={styles.container}>
          <div className={styles.message}>
            <p className={styles.intro}>Hi, my name is</p>
            <h1 className={styles.name}>{DATA.profile.name}</h1>
            <h2 className={styles.title}>{DATA.profile.title}</h2>
            <p className={styles.bio}>{DATA.profile.bio}</p>
            <div className={styles.cta}>
              <a
                href="resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={styles.button}>
                Review CV
              </a>
            </div>
          </div>
          <div className={styles.blob}>
            <img src={developer} alt="Yaroslav Sych" width={500} height={500} />
          </div>
        </div>
      </div>

      {/* Full-width multi-layer animated wave divider */}
      <div className={styles.heroDivider} aria-hidden="true">
        <div className={`${styles.waveTrack} ${styles.waveTrack3}`}>
          <svg
            className={styles.waveSvg}
            viewBox="0 0 2400 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,35 C400,75 800,15 1200,35 C1600,75 2000,15 2400,35 L2400,100 L0,100 Z"
              fill="rgba(100, 255, 188, 0.02)"
            />
            <path
              d="M0,35 C400,75 800,15 1200,35 C1600,75 2000,15 2400,35"
              fill="none"
              stroke="rgba(100, 255, 188, 0.12)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className={`${styles.waveTrack} ${styles.waveTrack2}`}>
          <svg
            className={styles.waveSvg}
            viewBox="0 0 2400 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,60 C350,20 650,95 950,55 C1100,35 1150,35 1200,60 C1550,20 1850,95 2150,55 C2300,35 2350,35 2400,60 L2400,100 L0,100 Z"
              fill="rgba(100, 255, 188, 0.03)"
            />
            <path
              d="M0,60 C350,20 650,95 950,55 C1100,35 1150,35 1200,60 C1550,20 1850,95 2150,55 C2300,35 2350,35 2400,60"
              fill="none"
              stroke="rgba(100, 255, 188, 0.2)"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className={`${styles.waveTrack} ${styles.waveTrack1}`}>
          <svg
            className={styles.waveSvg}
            viewBox="0 0 2400 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,45 C300,5 600,85 900,45 C1050,25 1150,25 1200,45 C1500,5 1800,85 2100,45 C2250,25 2350,25 2400,45 L2400,100 L0,100 Z"
              fill="rgba(100, 255, 188, 0.04)"
            />
            <path
              d="M0,45 C300,5 600,85 900,45 C1050,25 1150,25 1200,45 C1500,5 1800,85 2100,45 C2250,25 2350,25 2400,45"
              fill="none"
              stroke="rgba(100, 255, 188, 0.35)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;

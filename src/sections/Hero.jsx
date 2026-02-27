import React from "react";
import { DATA } from "../data/config";
import styles from "./Hero.module.scss";
import developer from "../assets/Yaroslav.png";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.message}>
          <p className={styles.intro}>Hi, my name is</p>
          <h1 className={styles.name}>{DATA.profile.name}</h1>
          <h2 className={styles.title}>{DATA.profile.title}</h2>
          <p className={styles.bio}>{DATA.profile.bio}</p>
          <div className={styles.cta}>
            <a
              href={`resume.pdf`}
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
    </section>
  );
};

export default Hero;

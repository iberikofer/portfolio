import React from "react";
import { DATA } from "../data/config";
import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.divider} />
          <h2 className={styles.heading}>Get in touch</h2>
          <p className={styles.subtext}>
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, my inbox is always open!
          </p>
				<div className={styles.divider}></div>
				
        <p className={styles.copyright}>
          Designed & Built by{" "}
          <span className={styles.highlight}>{DATA.profile.name}</span>
          <br />© {currentYear} — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { DATA } from "../data/config";
import styles from "./Projects.module.scss";

const Projects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.sectionTitle}>My Projects</h2>
      <div className={styles.mainDivider}></div>
      <div className={styles.grid}>
        {DATA.projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={project.photo}
                alt="Project photo"
                width="500px"
                height="380px"
              />
            </div>

            <div
              className={`${styles.buttonActionRow} ${!project.pages ? styles.singleButton : ""}`}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.actionBtn}>
                Repo
              </a>

              {project.pages && (
                <>
                  <div className={styles.divider}></div>
                  <div className={styles.pagesWrapper}>
                    <a
                      href={project.pages}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.actionBtn}>
                      Pages
                    </a>
                    {project.status === "Closed" && (
                      <span className={styles.statusNote}>
                        temporarily unavailable
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className={styles.content}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.githubIntro}>
        <div className={styles.introContent}>
          <p className={styles.introDescription}>
            Explore my repositories where you can find the source code,
            documentation, and the story behind each project.
          </p>
          <a
            href={DATA.profile.github}
            target="_blank"
            rel="noreferrer"
            className={styles.githubLink}>
            <span className={styles.linkText}>Visit my GitHub Profile</span>
            <svg
              className={styles.linkIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

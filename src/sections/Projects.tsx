import React from 'react';
import { DATA } from '../data/config';
import styles from './Projects.module.scss';

const Projects: React.FC = () => {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.sectionTitle}>My Projects</h2>
      <div className={styles.mainDivider}></div>
      <div className={styles.grid}>
        {DATA.projects.map((project) => (
          <div key={project.id} className={styles.cardWrapper}>
            <div className={styles.card}>
              <div
                className={styles.imageContainer}
                style={
                  project.containerBg
                    ? { backgroundColor: project.containerBg }
                    : undefined
                }
              >
                {project.photo ? (
                  <img
                    src={project.photo}
                    alt={project.title}
                    width={500}
                    height={380}
                    style={{
                      ...(project.objectPosition && {
                        objectPosition: project.objectPosition,
                      }),
                      ...(project.objectFit && {
                        objectFit: project.objectFit,
                      }),
                    }}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <svg
                      className={styles.placeholderIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className={styles.placeholderText}>
                      Preview coming soon
                    </span>
                  </div>
                )}
              </div>

              <div
                className={`${styles.buttonActionRow} ${
                  !project.pages && !project.mockup ? styles.singleButton : ''
                }`}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.actionBtn}
                >
                  Repo
                </a>

                {project.mockup && (
                  <>
                    <div className={styles.divider}></div>
                    <a
                      href={project.mockup}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.actionBtn}
                    >
                      Mockup
                    </a>
                  </>
                )}

                {project.pages && (
                  <>
                    <div className={styles.divider}></div>
                    <div className={styles.pagesWrapper}>
                      {project.status === 'Closed' ? (
                        <span
                          className={`${styles.actionBtn} ${styles.disabledBtn}`}
                          title="Page temporarily unavailable"
                          aria-disabled="true"
                        >
                          Page
                        </span>
                      ) : (
                        <a
                          href={project.pages}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.actionBtn}
                        >
                          Page
                        </a>
                      )}
                      {project.status === 'Closed' && (
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
            className={styles.githubLink}
          >
            <span className={styles.linkText}>Visit my GitHub Profile</span>
            <svg
              className={styles.linkIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

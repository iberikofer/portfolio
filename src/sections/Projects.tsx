import React, { useState, useMemo } from 'react';
import { DATA, Project } from '../data/config';
import styles from './Projects.module.scss';

type FilterCategory = 'all' | 'fullstack' | 'react' | 'vanilla';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return DATA.projects;

    return DATA.projects.filter((project) => {
      const tagsUpper = project.tags.map((t) => t.toUpperCase());
      if (activeFilter === 'fullstack') {
        return tagsUpper.includes('NODE.JS') || tagsUpper.includes('EXPRESS');
      }
      if (activeFilter === 'react') {
        return tagsUpper.includes('REACT') && !tagsUpper.includes('NODE.JS');
      }
      if (activeFilter === 'vanilla') {
        return tagsUpper.includes('HTML') || !tagsUpper.includes('REACT');
      }
      return true;
    });
  }, [activeFilter]);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.headerArea}>
        <div className={styles.badge}>Featured Portfolio</div>
        <h2 className={styles.sectionTitle}>Crafted Projects &amp; Software</h2>
        <p className={styles.sectionSubtitle}>
          Production apps, full-stack backends, and responsive digital products
          built with modern engineering standards.
        </p>

        {/* Filter Tabs (frontend-design functional density) */}
        <div
          className={styles.filterBar}
          role="tablist"
          aria-label="Filter projects"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>All</span>
            <span className={styles.filterCount}>{DATA.projects.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'fullstack'}
            className={`${styles.filterBtn} ${activeFilter === 'fullstack' ? styles.active : ''}`}
            onClick={() => setActiveFilter('fullstack')}
          >
            <span>Fullstack / Node</span>
            <span className={styles.filterCount}>2</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'react'}
            className={`${styles.filterBtn} ${activeFilter === 'react' ? styles.active : ''}`}
            onClick={() => setActiveFilter('react')}
          >
            <span>React Ecosystem</span>
            <span className={styles.filterCount}>5</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'vanilla'}
            className={`${styles.filterBtn} ${activeFilter === 'vanilla' ? styles.active : ''}`}
            onClick={() => setActiveFilter('vanilla')}
          >
            <span>Vanilla &amp; UI</span>
            <span className={styles.filterCount}>2</span>
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project: Project, idx) => (
          <article
            key={project.id}
            className={styles.card}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Visual Preview Frame */}
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
                  height={320}
                  loading="lazy"
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
                    API / Microservice
                  </span>
                </div>
              )}

              {/* Status Pill on Card */}
              <div className={styles.cardStatusPill}>
                {project.status === 'Closed' ? (
                  <span className={styles.statusClosed}>Archived</span>
                ) : (
                  <span className={styles.statusOpen}>Live Demo</span>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className={styles.cardBody}>
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

            {/* Action Bar (Tactile Buttons) */}
            <div className={styles.actionRow}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.actionBtn}
                title="View GitHub Repository"
              >
                <svg
                  className={styles.actionIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>Code</span>
              </a>

              {project.mockup && (
                <a
                  href={project.mockup}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.actionBtn}
                  title="View Figma Mockup"
                >
                  <svg
                    className={styles.actionIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                  </svg>
                  <span>Design</span>
                </a>
              )}

              {project.pages &&
                (project.status === 'Closed' ? (
                  <span
                    className={`${styles.actionBtn} ${styles.disabledBtn}`}
                    title="Live preview temporarily offline"
                  >
                    <svg
                      className={styles.actionIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <span>Offline</span>
                  </span>
                ) : (
                  <a
                    href={project.pages}
                    target="_blank"
                    rel="noreferrer"
                    className={`${styles.actionBtn} ${styles.primaryActionBtn}`}
                    title="Open Live Website"
                  >
                    <svg
                      className={styles.actionIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    <span>Live</span>
                  </a>
                ))}
            </div>
          </article>
        ))}
      </div>

      {/* GitHub Callout Card */}
      <div className={styles.githubCard}>
        <div className={styles.githubInfo}>
          <div className={styles.githubIconWrapper}>
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
          </div>
          <div>
            <h4 className={styles.githubTitle}>Explore More Repositories</h4>
            <p className={styles.githubDesc}>
              Full commit history, experimentation with C++/Java/Python, and
              open-source contributions.
            </p>
          </div>
        </div>

        <a
          href={DATA.profile.github}
          target="_blank"
          rel="noreferrer"
          className={styles.githubCtaBtn}
        >
          <span>github.com/iberikofer</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Projects;

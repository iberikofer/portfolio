'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DATA, Project, ImageSource } from '../data/config';
import styles from './Projects.module.scss';

type FilterCategory =
  'all' | 'team' | 'fullstack' | 'frontend' | 'backend' | 'ai-tools' | 'games';

const hasLiveDemo = (project: Project): boolean => {
  if (project.status === 'Closed') return false;
  if (!project.pages) return false;
  if (project.pages.includes('#readme')) return false;
  if (
    project.pages.includes('github.com/') &&
    !project.pages.includes('github.io')
  ) {
    return false;
  }
  return true;
};

const getImgSrc = (photo?: ImageSource): string => {
  if (!photo) return '';
  return typeof photo === 'string' ? photo : (photo as { src: string }).src || '';
};

const ProjectImage: React.FC<{ project: Project }> = ({ project }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      const rafId = requestAnimationFrame(() => {
        setIsLoaded(true);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [project.photo]);

  return (
    <img
      ref={imgRef}
      src={getImgSrc(project.photo)}
      alt={project.title}
      width={500}
      height={320}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`${styles.projectImg} ${isLoaded ? styles.loaded : ''}`}
      style={{
        ...(project.objectPosition && {
          objectPosition: project.objectPosition,
        }),
        ...(project.objectFit && {
          objectFit: project.objectFit,
        }),
      }}
    />
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const counts = useMemo(() => {
    const list = DATA.projects;
    return {
      all: list.length,
      team: list.filter((p) =>
        p.tags.map((t) => t.toUpperCase()).includes('TEAM'),
      ).length,
      fullstack: list.filter((p) => {
        const t = p.tags.map((tag) => tag.toUpperCase());
        return (
          t.includes('FULLSTACK') ||
          (t.includes('REACT') && t.includes('NODE.JS')) ||
          (t.includes('NEXT.JS') && t.includes('.NET'))
        );
      }).length,
      frontend: list.filter((p) => {
        const t = p.tags.map((tag) => tag.toUpperCase());
        return (
          t.includes('FRONTEND') ||
          t.includes('REACT') ||
          t.includes('NEXT.JS') ||
          t.includes('HTML') ||
          t.includes('CSS') ||
          t.includes('SCSS') ||
          t.includes('JS') ||
          t.includes('JAVASCRIPT')
        );
      }).length,
      backend: list.filter((p) => {
        const t = p.tags.map((tag) => tag.toUpperCase());
        return (
          t.includes('BACKEND') ||
          t.includes('NODE.JS') ||
          t.includes('EXPRESS') ||
          t.includes('.NET') ||
          t.includes('POSTGRESQL') ||
          t.includes('MONGODB')
        );
      }).length,
      aiTools: list.filter((p) => {
        const t = p.tags.map((tag) => tag.toUpperCase());
        return (
          t.includes('AI') ||
          t.includes('AI AGENT') ||
          t.includes('CLI') ||
          t.includes('LLM') ||
          t.includes('AUTOMATION')
        );
      }).length,
      games: list.filter((p) => {
        const t = p.tags.map((tag) => tag.toUpperCase());
        return t.includes('GAME') || t.includes('SIMULATOR');
      }).length,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return DATA.projects;

    return DATA.projects.filter((project) => {
      const tagsUpper = project.tags.map((t) => t.toUpperCase());
      if (activeFilter === 'team') {
        return tagsUpper.includes('TEAM');
      }
      if (activeFilter === 'fullstack') {
        return (
          tagsUpper.includes('FULLSTACK') ||
          (tagsUpper.includes('REACT') && tagsUpper.includes('NODE.JS')) ||
          (tagsUpper.includes('NEXT.JS') && tagsUpper.includes('.NET'))
        );
      }
      if (activeFilter === 'frontend') {
        return (
          tagsUpper.includes('FRONTEND') ||
          tagsUpper.includes('REACT') ||
          tagsUpper.includes('NEXT.JS') ||
          tagsUpper.includes('HTML') ||
          tagsUpper.includes('CSS') ||
          tagsUpper.includes('SCSS') ||
          tagsUpper.includes('JS') ||
          tagsUpper.includes('JAVASCRIPT')
        );
      }
      if (activeFilter === 'backend') {
        return (
          tagsUpper.includes('BACKEND') ||
          tagsUpper.includes('NODE.JS') ||
          tagsUpper.includes('EXPRESS') ||
          tagsUpper.includes('.NET') ||
          tagsUpper.includes('POSTGRESQL') ||
          tagsUpper.includes('MONGODB')
        );
      }
      if (activeFilter === 'ai-tools') {
        return (
          tagsUpper.includes('AI') ||
          tagsUpper.includes('AI AGENT') ||
          tagsUpper.includes('CLI') ||
          tagsUpper.includes('LLM') ||
          tagsUpper.includes('AUTOMATION')
        );
      }
      if (activeFilter === 'games') {
        return tagsUpper.includes('GAME') || tagsUpper.includes('SIMULATOR');
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
            <span className={styles.filterCount}>{counts.all}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'team'}
            className={`${styles.filterBtn} ${activeFilter === 'team' ? styles.active : ''}`}
            onClick={() => setActiveFilter('team')}
          >
            <span>Team projects</span>
            <span className={styles.filterCount}>{counts.team}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'fullstack'}
            className={`${styles.filterBtn} ${activeFilter === 'fullstack' ? styles.active : ''}`}
            onClick={() => setActiveFilter('fullstack')}
          >
            <span>Fullstack</span>
            <span className={styles.filterCount}>{counts.fullstack}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'frontend'}
            className={`${styles.filterBtn} ${activeFilter === 'frontend' ? styles.active : ''}`}
            onClick={() => setActiveFilter('frontend')}
          >
            <span>Front-end</span>
            <span className={styles.filterCount}>{counts.frontend}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'backend'}
            className={`${styles.filterBtn} ${activeFilter === 'backend' ? styles.active : ''}`}
            onClick={() => setActiveFilter('backend')}
          >
            <span>Back-end</span>
            <span className={styles.filterCount}>{counts.backend}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'ai-tools'}
            className={`${styles.filterBtn} ${activeFilter === 'ai-tools' ? styles.active : ''}`}
            onClick={() => setActiveFilter('ai-tools')}
          >
            <span>AI &amp; Tools</span>
            <span className={styles.filterCount}>{counts.aiTools}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'games'}
            className={`${styles.filterBtn} ${activeFilter === 'games' ? styles.active : ''}`}
            onClick={() => setActiveFilter('games')}
          >
            <span>Games/Simulators</span>
            <span className={styles.filterCount}>{counts.games}</span>
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
                <ProjectImage project={project} />
              ) : (
                <div className={styles.placeholderImage}>
                  {project.tags.includes('SIMULATOR') ? (
                    <>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span className={styles.placeholderText}>
                        {project.tags.includes('C++')
                          ? 'C++ Simulation'
                          : 'Java Simulation'}
                      </span>
                    </>
                  ) : project.tags.includes('GAME') ? (
                    <>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="6" x2="10" y1="12" y2="12" />
                        <line x1="8" x2="8" y1="10" y2="14" />
                        <line x1="15" x2="15.01" y1="13" y2="13" />
                        <line x1="18" x2="18.01" y1="11" y2="11" />
                        <rect width="20" height="12" x="2" y="6" rx="6" />
                      </svg>
                      <span className={styles.placeholderText}>
                        2D Game / SFML
                      </span>
                    </>
                  ) : project.tags.includes('AI AGENT') ? (
                    <>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="12" x="3" y="6" rx="2" />
                        <path d="M12 2v4" />
                        <line x1="8" x2="8" y1="12" y2="12" />
                        <line x1="16" x2="16" y1="12" y2="12" />
                      </svg>
                      <span className={styles.placeholderText}>
                        AI Agent System
                      </span>
                    </>
                  ) : project.tags.includes('TEAM') ? (
                    <>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span className={styles.placeholderText}>
                        Team Project
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className={styles.placeholderIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                      <span className={styles.placeholderText}>
                        API / Microservice
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Status Pill on Card */}
              {project.status === 'Closed' ? (
                <div className={styles.cardStatusPill}>
                  <span className={styles.statusClosed}>Archived</span>
                </div>
              ) : hasLiveDemo(project) ? (
                <div className={styles.cardStatusPill}>
                  <span className={styles.statusOpen}>Live Demo</span>
                </div>
              ) : null}
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
                    title={
                      project.pages.includes('#readme')
                        ? 'View Documentation'
                        : 'Open Live Website'
                    }
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
                    <span>
                      {project.pages.includes('#readme') ? 'Docs' : 'Live'}
                    </span>
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

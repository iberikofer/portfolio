'use client';

import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import Image from 'next/image';
import { DATA, Project, ImageSource } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';
import styles from './Projects.module.scss';

type ScopeCategory = 'all' | 'solo' | 'team';

type TechChip = 'fullstack' | 'frontend' | 'backend' | 'ai-tools' | 'games';

interface ScopeTab {
  id: ScopeCategory;
  label: string;
  countKey: 'all' | 'solo' | 'team';
}

const SCOPE_TABS: ScopeTab[] = [
  { id: 'all', label: 'All', countKey: 'all' },
  { id: 'solo', label: 'Solo projects', countKey: 'solo' },
  { id: 'team', label: 'Team projects', countKey: 'team' },
];

interface ChipDefinition {
  id: TechChip;
  label: string;
  countKey: 'fullstack' | 'frontend' | 'backend' | 'aiTools' | 'games';
}

const TECH_CHIPS: ChipDefinition[] = [
  { id: 'fullstack', label: 'Fullstack', countKey: 'fullstack' },
  { id: 'frontend', label: 'Front-end', countKey: 'frontend' },
  { id: 'backend', label: 'Back-end', countKey: 'backend' },
  { id: 'ai-tools', label: 'Tools', countKey: 'aiTools' },
  { id: 'games', label: 'Games/Simulators', countKey: 'games' },
];

const VALID_SCOPES: ScopeCategory[] = ['all', 'solo', 'team'];
const VALID_CHIPS: TechChip[] = [
  'fullstack',
  'frontend',
  'backend',
  'ai-tools',
  'games',
];

const matchesChip = (project: Project, chip: TechChip): boolean => {
  const t = project.tags.map((tag) => tag.toUpperCase());
  switch (chip) {
    case 'fullstack':
      return (
        t.includes('FULLSTACK') ||
        (t.includes('REACT') && t.includes('NODE.JS')) ||
        (t.includes('NEXT.JS') && t.includes('.NET'))
      );
    case 'frontend':
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
    case 'backend':
      return (
        t.includes('BACKEND') ||
        t.includes('NODE.JS') ||
        t.includes('EXPRESS') ||
        t.includes('.NET') ||
        t.includes('POSTGRESQL') ||
        t.includes('MONGODB') ||
        t.includes('SQLITE') ||
        t.includes('PRISMA')
      );
    case 'ai-tools':
      return (
        t.includes('AI') ||
        t.includes('AI AGENT') ||
        t.includes('CLI') ||
        t.includes('LLM') ||
        t.includes('AUTOMATION') ||
        t.includes('PYTHON') ||
        t.includes('TOOL') ||
        t.includes('TOOLS') ||
        t.includes('SCRIPT') ||
        t.includes('POWERSHELL')
      );
    case 'games':
      return t.includes('GAME') || t.includes('SIMULATOR');
    default:
      return true;
  }
};

const mapTagToChip = (tag: string): TechChip | null => {
  const t = tag.toUpperCase();
  if (t === 'FULLSTACK') return 'fullstack';
  if (
    [
      'BACKEND',
      'NODE.JS',
      'EXPRESS',
      '.NET',
      'POSTGRESQL',
      'MONGODB',
      'SQLITE',
      'PRISMA',
    ].includes(t)
  ) {
    return 'backend';
  }
  if (
    [
      'FRONTEND',
      'REACT',
      'NEXT.JS',
      'HTML',
      'CSS',
      'SCSS',
      'JS',
      'JAVASCRIPT',
      'TS',
      'TYPESCRIPT',
      'TAILWIND',
      'SWIPER',
    ].includes(t)
  ) {
    return 'frontend';
  }
  if (
    [
      'AI',
      'AI AGENT',
      'CLI',
      'LLM',
      'AUTOMATION',
      'PYTHON',
      'TOOL',
      'TOOLS',
      'SCRIPT',
      'POWERSHELL',
    ].includes(t)
  ) {
    return 'ai-tools';
  }
  if (['GAME', 'SIMULATOR'].includes(t)) {
    return 'games';
  }
  return null;
};

const SCOPE_STORAGE_KEY = 'portfolio_filter_scope';
const CHIPS_STORAGE_KEY = 'portfolio_filter_chips';
const MODE_STORAGE_KEY = 'portfolio_filter_mode';

const getInitialFilterState = (): {
  scope: ScopeCategory;
  chips: TechChip[];
  mode: 'any' | 'all';
} => {
  if (typeof window === 'undefined') {
    return { scope: 'all', chips: [], mode: 'any' };
  }

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const hasScopeParam = searchParams.has('scope');
    const hasTagsParam = searchParams.has('tags');
    const hasModeParam = searchParams.has('mode');

    // If ANY filter parameter is present in the URL query string, the URL has absolute priority.
    // Explicitly missing filter parameters in the URL mean "no filter" (do NOT resurrect from localStorage).
    if (hasScopeParam || hasTagsParam || hasModeParam) {
      const scopeParam = searchParams.get('scope');
      const tagsParam = searchParams.get('tags');
      const modeParam = searchParams.get('mode');

      const scope: ScopeCategory =
        scopeParam && (VALID_SCOPES as string[]).includes(scopeParam)
          ? (scopeParam as ScopeCategory)
          : 'all';

      const chips: TechChip[] = tagsParam
        ? tagsParam
            .split(',')
            .filter((p): p is TechChip => (VALID_CHIPS as string[]).includes(p))
        : [];

      const mode: 'any' | 'all' =
        modeParam === 'all' || modeParam === 'any' ? modeParam : 'any';

      return { scope, chips, mode };
    }

    // If the URL has NO filter parameters at all, we do NOT restore stale filters from localStorage,
    // ensuring clean URL navigation always loads clean unfiltered state.
  } catch {
    // Ignore storage/URL errors
  }

  return { scope: 'all', chips: [], mode: 'any' };
};

const getSavedScope = (): ScopeCategory => getInitialFilterState().scope;
const getSavedChips = (): TechChip[] => getInitialFilterState().chips;
const getSavedMode = (): 'any' | 'all' => getInitialFilterState().mode;

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

const ProjectImage: React.FC<{ project: Project; priority?: boolean }> = ({
  project,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const photo = project.photo;
  if (!photo) return null;

  const isStatic = typeof photo !== 'string';
  const blurData = isStatic && 'blurDataURL' in photo ? photo.blurDataURL : undefined;

  return (
    <Image
      src={photo}
      alt={`${project.title} — ${project.tags.join(', ')} project preview`}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder={blurData ? 'blur' : 'empty'}
      blurDataURL={blurData}
      onLoad={() => setIsLoaded(true)}
      className={`${styles.projectImg} ${isLoaded ? styles.loaded : ''}`}
      style={{
        objectFit: project.objectFit || 'cover',
        objectPosition: project.objectPosition || 'top center',
      }}
    />
  );
};

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeScope, setActiveScope] = useState<ScopeCategory>('all');
  const [selectedChips, setSelectedChips] = useState<TechChip[]>([]);
  const [matchMode, setMatchMode] = useState<'any' | 'all'>('any');

  const [scopeIndicator, setScopeIndicator] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
  }>({ x: 0, y: 0, width: 0, height: 0, opacity: 0 });

  const activeScopeRef = useRef<ScopeCategory>(activeScope);
  const hasRestoredRef = useRef(false);

  const [hasMounted, setHasMounted] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const scopeBarRef = useRef<HTMLDivElement>(null);
  const scopeBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const syncFilterState = useCallback(
    (scope: ScopeCategory, chips: TechChip[], mode: 'any' | 'all') => {
      if (typeof window === 'undefined') return;
      try {
        localStorage.setItem(SCOPE_STORAGE_KEY, scope);
        localStorage.setItem(CHIPS_STORAGE_KEY, JSON.stringify(chips));
        localStorage.setItem(MODE_STORAGE_KEY, mode);

        const url = new URL(window.location.href);
        if (scope !== 'all') {
          url.searchParams.set('scope', scope);
        } else {
          url.searchParams.delete('scope');
        }

        if (chips.length > 0) {
          url.searchParams.set('tags', chips.join(','));
        } else {
          url.searchParams.delete('tags');
        }

        if (chips.length > 1 && mode === 'all') {
          url.searchParams.set('mode', 'all');
        } else {
          url.searchParams.delete('mode');
        }

        window.history.replaceState(
          null,
          '',
          url.pathname + url.search + url.hash,
        );
      } catch {
        // Ignore storage/history errors
      }
    },
    [],
  );

  const updateScopeIndicator = useCallback((scope?: ScopeCategory) => {
    const targetScope = scope || activeScopeRef.current;
    const activeBtn = scopeBtnRefs.current[targetScope];
    if (!activeBtn) return;
    setScopeIndicator({
      x: activeBtn.offsetLeft,
      y: activeBtn.offsetTop,
      width: activeBtn.offsetWidth,
      height: activeBtn.offsetHeight,
      opacity: 1,
    });
  }, []);

  const handleScopeSelect = (id: ScopeCategory) => {
    trackEvent('filter_scope_change', { scope: id });
    activeScopeRef.current = id;
    setActiveScope(id);
    updateScopeIndicator(id);
    syncFilterState(id, selectedChips, matchMode);
  };

  const handleChipToggle = (chip: TechChip) => {
    const isAdding = !selectedChips.includes(chip);
    trackEvent('filter_tag_toggle', { chip, active: isAdding });
    const next = isAdding
      ? [...selectedChips, chip]
      : selectedChips.filter((c) => c !== chip);
    setSelectedChips(next);
    syncFilterState(activeScope, next, matchMode);
  };

  const handleCardTagClick = (chip: TechChip) => {
    // If this chip is already the only one active, reset to all.
    // Otherwise, filter specifically by this chip, clearing unrelated chips like ai-tools.
    const isClearing = selectedChips.length === 1 && selectedChips[0] === chip;
    trackEvent('filter_tag_toggle', { chip, active: !isClearing });
    const next = isClearing ? [] : [chip];
    setSelectedChips(next);
    syncFilterState(activeScope, next, matchMode);
  };

  const handleClearChips = () => {
    trackEvent('filter_reset');
    setSelectedChips([]);
    syncFilterState(activeScope, [], matchMode);
  };

  const handleModeChange = (mode: 'any' | 'all') => {
    setMatchMode(mode);
    syncFilterState(activeScope, selectedChips, mode);
  };

  // Sync state if user clicks Back / Forward in browser history
  useEffect(() => {
    const handlePopState = () => {
      const scope = getSavedScope();
      const chips = getSavedChips();
      const mode = getSavedMode();
      activeScopeRef.current = scope;
      setActiveScope(scope);
      setSelectedChips(chips);
      setMatchMode(mode);
      updateScopeIndicator(scope);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateScopeIndicator]);

  // Restore filter state on mount strictly from URL params
  useEffect(() => {
    if (hasRestoredRef.current) return;

    const timer = setTimeout(() => {
      hasRestoredRef.current = true;
      const initial = getInitialFilterState();

      activeScopeRef.current = initial.scope;
      setActiveScope(initial.scope);
      setSelectedChips(initial.chips);
      setMatchMode(initial.mode);
      updateScopeIndicator(initial.scope);

      // If URL has no filter query params, sync/clean localStorage so stale filters never persist
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.has('scope') && !searchParams.has('tags') && !searchParams.has('mode')) {
          try {
            localStorage.removeItem(SCOPE_STORAGE_KEY);
            localStorage.removeItem(CHIPS_STORAGE_KEY);
            localStorage.removeItem(MODE_STORAGE_KEY);
          } catch {
            // Ignore
          }
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [updateScopeIndicator]);

  // Update scope indicator when activeScope changes
  useEffect(() => {
    activeScopeRef.current = activeScope;
    updateScopeIndicator(activeScope);
  }, [activeScope, updateScopeIndicator]);

  // Mount observers & window resize handlers (runs once on mount)
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const rafId = requestAnimationFrame(() => {
      updateScopeIndicator();
      setHasMounted(true);

      timerId = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50);
    });

    const handleResize = () => {
      updateScopeIndicator();
    };
    window.addEventListener('resize', handleResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        updateScopeIndicator();
      });
    }

    let roScope: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && scopeBarRef.current) {
      roScope = new ResizeObserver(() => updateScopeIndicator());
      roScope.observe(scopeBarRef.current);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('resize', handleResize);
      roScope?.disconnect();
    };
  }, [updateScopeIndicator]);

  const scopeCounts = useMemo(() => {
    const list = DATA.projects;
    const team = list.filter((p) =>
      p.tags.map((t) => t.toUpperCase()).includes('TEAM'),
    ).length;
    return {
      all: list.length,
      solo: list.length - team,
      team,
    };
  }, []);

  const techCounts = useMemo(() => {
    const scoped = DATA.projects.filter((p) => {
      const isTeam = p.tags.map((t) => t.toUpperCase()).includes('TEAM');
      if (activeScope === 'team') return isTeam;
      if (activeScope === 'solo') return !isTeam;
      return true;
    });

    return {
      all: scoped.length,
      fullstack: scoped.filter((p) => matchesChip(p, 'fullstack')).length,
      frontend: scoped.filter((p) => matchesChip(p, 'frontend')).length,
      backend: scoped.filter((p) => matchesChip(p, 'backend')).length,
      aiTools: scoped.filter((p) => matchesChip(p, 'ai-tools')).length,
      games: scoped.filter((p) => matchesChip(p, 'games')).length,
    };
  }, [activeScope]);

  const filteredProjects = useMemo(() => {
    return DATA.projects.filter((project) => {
      const tagsUpper = project.tags.map((t) => t.toUpperCase());
      const isTeam = tagsUpper.includes('TEAM');

      // 1. Scope filter (All / Solo / Team)
      if (activeScope === 'team' && !isTeam) return false;
      if (activeScope === 'solo' && isTeam) return false;

      // 2. Multi-tag Chips filter
      if (selectedChips.length === 0) return true;

      if (matchMode === 'any') {
        // Match ANY selected chip (OR)
        return selectedChips.some((chip) => matchesChip(project, chip));
      } else {
        // Match ALL selected chips (AND)
        return selectedChips.every((chip) => matchesChip(project, chip));
      }
    });
  }, [activeScope, selectedChips, matchMode]);

  const hasActiveChips = selectedChips.length > 0;
  const [cachedActionInfo, setCachedActionInfo] = useState({
    chipsCount: selectedChips.length,
    filteredCount: filteredProjects.length,
    mode: matchMode,
  });

  if (
    selectedChips.length > 0 &&
    (cachedActionInfo.chipsCount !== selectedChips.length ||
      cachedActionInfo.filteredCount !== filteredProjects.length ||
      cachedActionInfo.mode !== matchMode)
  ) {
    setCachedActionInfo({
      chipsCount: selectedChips.length,
      filteredCount: filteredProjects.length,
      mode: matchMode,
    });
  }

  const displayedChipsCount = hasActiveChips
    ? selectedChips.length
    : cachedActionInfo.chipsCount;
  const displayedFilteredCount = hasActiveChips
    ? filteredProjects.length
    : cachedActionInfo.filteredCount;
  const displayedMatchMode = hasActiveChips
    ? matchMode
    : cachedActionInfo.mode;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.headerArea}>
        <div className={styles.badge}>{t.projects.badge}</div>
        <h2 className={styles.sectionTitle}>{t.projects.title}</h2>
        <p className={styles.sectionSubtitle}>
          {t.projects.subtitle}
        </p>

        {/* Two-tier Filter Controls: Unified Deck */}
        <div
          className={styles.filterDeck}
          onDragStart={(e) => e.preventDefault()}
          draggable={false}
        >
          {/* Row 1: Scope Bar (All / Solo / Team) */}
          <div
            ref={scopeBarRef}
            className={`${styles.deckRow} ${styles.deckRowScope} ${hasMounted ? styles.hasMounted : ''}`}
            role="tablist"
            aria-label="Filter projects by collaboration type"
          >
            <div
              className={`${styles.activeIndicator} ${
                isTransitionEnabled ? '' : styles.noTransition
              }`}
              style={{
                transform: `translate3d(${scopeIndicator.x}px, ${scopeIndicator.y}px, 0)`,
                width: `${scopeIndicator.width}px`,
                height: `${scopeIndicator.height}px`,
                opacity: scopeIndicator.opacity,
              }}
              aria-hidden="true"
            />

            {SCOPE_TABS.map((tab) => {
              const isActive = activeScope === tab.id;
              const tabLabel =
                tab.id === 'all'
                  ? t.projects.scopeAll
                  : tab.id === 'solo'
                    ? t.projects.scopeSolo
                    : t.projects.scopeTeam;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    scopeBtnRefs.current[tab.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.scopeBtn} ${isActive ? styles.active : ''}`}
                  onClick={() => handleScopeSelect(tab.id)}
                >
                  <span>{tabLabel}</span>
                  <span className={styles.filterCount}>
                    {scopeCounts[tab.countKey]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Chips Bar (Tech tag filters) */}
          <div
            className={styles.deckRow}
            role="group"
            aria-label="Filter projects by tags (multi-select)"
          >
            {/* All / Reset Button */}
            <button
              type="button"
              className={`${styles.chipBtn} ${
                selectedChips.length === 0 ? styles.active : ''
              }`}
              onClick={handleClearChips}
              aria-pressed={selectedChips.length === 0}
            >
              <span>{t.projects.chipAll}</span>
              <span className={styles.filterCount}>{techCounts.all}</span>
            </button>

            {/* Tag Chips */}
            {TECH_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip.id);
              const count = techCounts[chip.countKey];
              return (
                <button
                  key={chip.id}
                  type="button"
                  className={`${styles.chipBtn} ${
                    isSelected ? styles.active : ''
                  } ${count === 0 ? styles.emptyCategory : ''}`}
                  onClick={() => handleChipToggle(chip.id)}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <span className={styles.activeDot} aria-hidden="true" />
                  )}
                  <span>{t.projects.chips[chip.id] || chip.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3: Action Bar (smooth accordion expand/collapse) */}
          <div
            className={`${styles.actionBarWrapper} ${
              hasActiveChips ? styles.actionBarVisible : ''
            }`}
            aria-hidden={!hasActiveChips}
          >
            <div className={styles.actionBarInner}>
              <div className={`${styles.deckRow} ${styles.deckRowAction}`}>
                <span className={styles.activeChipsInfo}>
                  {displayedChipsCount} {t.projects.activeWord} ·{' '}
                  <span className={styles.resultCount}>
                    {displayedFilteredCount} {t.projects.projectsWord}
                  </span>
                </span>

                {displayedChipsCount > 1 && (
                  <div
                    className={styles.modeToggle}
                    role="radiogroup"
                    aria-label="Tag match logic"
                  >
                    <button
                      type="button"
                      tabIndex={hasActiveChips ? 0 : -1}
                      className={`${styles.modeBtn} ${
                        displayedMatchMode === 'any' ? styles.activeMode : ''
                      }`}
                      onClick={() => handleModeChange('any')}
                      title="Match projects with ANY of the selected tags"
                    >
                      Any (OR)
                    </button>
                    <button
                      type="button"
                      tabIndex={hasActiveChips ? 0 : -1}
                      className={`${styles.modeBtn} ${
                        displayedMatchMode === 'all' ? styles.activeMode : ''
                      }`}
                      onClick={() => handleModeChange('all')}
                      title="Match projects that have ALL selected tags"
                    >
                      All (AND)
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  tabIndex={hasActiveChips ? 0 : -1}
                  onClick={handleClearChips}
                  className={styles.clearAllBtn}
                  title="Clear all selected tags"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{t.projects.resetFilters}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>{t.projects.noMatchTitle}</h3>
          <p className={styles.emptyText}>
            {t.projects.noMatchSubtitle}
          </p>
          <div className={styles.emptyActions}>
            {matchMode === 'all' && (
              <button
                type="button"
                className={styles.switchModeBtn}
                onClick={() => handleModeChange('any')}
              >
                {t.projects.switchModeBtn}
              </button>
            )}
            <button
              type="button"
              className={styles.resetFiltersBtn}
              onClick={handleClearChips}
            >
              {t.projects.clearFiltersBtn}
            </button>
          </div>
        </div>
      ) : (

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
                <ProjectImage project={project} priority={idx < 2} />
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
                  ) : project.tags.includes('AUTOMATION') || project.tags.includes('SCRIPT') || project.tags.includes('POWERSHELL') ? (
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
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                        <polyline points="7 8 10 10 7 12" />
                        <line x1="12" x2="16" y1="12" y2="12" />
                      </svg>
                      <span className={styles.placeholderText}>
                        Custom Automation Script
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
                  <span className={styles.statusClosed}>{t.projects.statusClosed}</span>
                </div>
              ) : hasLiveDemo(project) ? (
                <div className={styles.cardStatusPill}>
                  <span className={styles.statusOpen}>{t.projects.statusOpen}</span>
                </div>
              ) : null}
            </div>

            {/* Project Content */}
            <div className={styles.cardBody}>
              <h3 className={styles.projectTitle}>{project.title}</h3>

              <div className={styles.tags}>
                {project.tags.map((tag) => {
                  const upper = tag.toUpperCase();
                  const isTeamTag = upper === 'TEAM';
                  const mappedChip = mapTagToChip(tag);
                  const isTagActive = isTeamTag
                    ? activeScope === 'team'
                    : mappedChip
                      ? selectedChips.includes(mappedChip)
                      : false;

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (isTeamTag) {
                          handleScopeSelect(
                            activeScope === 'team' ? 'all' : 'team',
                          );
                        } else if (mappedChip) {
                          handleCardTagClick(mappedChip);
                        }
                      }}
                      className={`${styles.tag} ${isTagActive ? styles.tagActive : ''}`}
                      title={
                        isTeamTag
                          ? `Filter: Team projects (${activeScope === 'team' ? 'Active - click to reset' : 'Click to filter'})`
                          : mappedChip
                            ? `Filter: ${tag} (${isTagActive ? 'Active - click to remove' : 'Click to filter'})`
                            : tag
                      }
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              <p className={styles.description}>
                {t.projects.descriptions[project.id] || project.description}
              </p>
            </div>

            {/* Action Bar (Tactile Buttons) */}
            <div className={styles.actionRow}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
                draggable={false}
                title="View GitHub Repository"
                onClick={() =>
                  trackEvent('view_project_source', {
                    project: project.title,
                    id: project.id,
                  })
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
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>{t.projects.sourceCode}</span>
              </a>

              {project.mockup && (
                <a
                  href={project.mockup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                  draggable={false}
                  title="View Figma Mockup"
                  onClick={() =>
                    trackEvent('view_project_mockup', {
                      project: project.title,
                      id: project.id,
                    })
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
                    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                  </svg>
                  <span>{t.projects.designMockup}</span>
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
                    rel="noopener noreferrer"
                    className={`${styles.actionBtn} ${styles.primaryActionBtn}`}
                    draggable={false}
                    title={
                      project.pages.includes('#readme')
                        ? 'View Documentation'
                        : 'Open Live Website'
                    }
                    onClick={() =>
                      trackEvent(
                        project.pages?.includes('#readme')
                          ? 'view_project_docs'
                          : 'view_project_demo',
                        {
                          project: project.title,
                          id: project.id,
                        },
                      )
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
                      {project.pages.includes('#readme')
                        ? 'Docs'
                        : t.projects.liveDemo}
                    </span>
                  </a>
                ))}
            </div>
          </article>
        ))}
      </div>
      )}

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
            <h4 className={styles.githubTitle}>{t.projects.githubCardTitle}</h4>
            <p className={styles.githubDesc}>
              {t.projects.githubCardDesc}
            </p>
          </div>
        </div>

        <a
          href={DATA.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubCtaBtn}
          onClick={() =>
            trackEvent('github_profile_click', { source: 'projects_footer' })
          }
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

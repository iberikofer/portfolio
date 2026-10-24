'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Language, TranslationData, TRANSLATIONS } from '../data/translations';
import styles from './LanguageContext.module.scss';

export const LANGUAGE_STORAGE_KEY = 'portfolio_filter_lang';

type TransitionPhase = 'idle' | 'darkening' | 'brightening';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationData;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function getLocalizedUrl(targetLang: Language): string {
  if (typeof window === 'undefined') return `/${targetLang}`;
  const isProd = window.location.pathname.startsWith('/portfolio');
  const basePath = isProd ? '/portfolio' : '';
  return `${basePath}/${targetLang}${window.location.search}${window.location.hash}`;
}

export function getLangFromPathname(): Language | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  if (path.endsWith('/uk') || path.includes('/uk/') || path.includes('/uk?')) {
    return 'uk';
  }
  if (path.endsWith('/es') || path.includes('/es/') || path.includes('/es?')) {
    return 'es';
  }
  if (path.endsWith('/en') || path.includes('/en/') || path.includes('/en?')) {
    return 'en';
  }
  return null;
}

interface BatteryManagerLike extends EventTarget {
  charging: boolean;
  level: number;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLang = 'en',
}) => {
  const [lang, setLangState] = useState<Language>(initialLang);

  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isButtonBlocked, setIsButtonBlocked] = useState<boolean>(false);

  const isTransitioningRef = useRef<boolean>(false);
  const isBatteryLowRef = useRef<boolean>(false);
  const darkenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unblockTimerRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback(() => {
    if (darkenTimerRef.current) clearTimeout(darkenTimerRef.current);
    if (unblockTimerRef.current) clearTimeout(unblockTimerRef.current);
    if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Track battery state when Battery Status API is available (Chromium-based browsers)
  useEffect(() => {
    if (typeof window === 'undefined' || !('getBattery' in navigator)) return;

    let batteryInstance: BatteryManagerLike | null = null;

    const handleBatteryChange = () => {
      if (!batteryInstance) return;
      // Heuristic: running on battery (not charging) with level <= 20%
      isBatteryLowRef.current =
        !batteryInstance.charging && batteryInstance.level <= 0.2;
    };

    (navigator as unknown as { getBattery: () => Promise<BatteryManagerLike> })
      .getBattery()
      .then((battery) => {
        batteryInstance = battery;
        handleBatteryChange();
        battery.addEventListener('levelchange', handleBatteryChange);
        battery.addEventListener('chargingchange', handleBatteryChange);
      })
      .catch(() => {
        // Battery API rejected or restricted
      });

    return () => {
      if (batteryInstance) {
        batteryInstance.removeEventListener('levelchange', handleBatteryChange);
        batteryInstance.removeEventListener('chargingchange', handleBatteryChange);
      }
    };
  }, []);

  // Synchronize on mount and update storage + document lang + title
  useEffect(() => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      if (typeof document !== 'undefined') {
        document.title = TRANSLATIONS[lang].meta.title;
      }
    } catch {
      // Ignore storage write issues
    }
  }, [lang]);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const routeLang = getLangFromPathname();
      if (routeLang && routeLang !== lang) {
        setLangState(routeLang);
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, routeLang);
          document.documentElement.lang = routeLang;
        } catch {
          // Ignore
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [lang]);

  const shouldSkipTransition = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;

    // 1. Accessibility / OS-level setting: animation effects disabled or reduced motion
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return true;
      }
    } catch {
      // Ignore evaluation errors
    }

    // 2. Battery saver heuristic (running on battery <= 20%)
    if (isBatteryLowRef.current) {
      return true;
    }

    // 3. Data saver / power saving indicator
    try {
      const nav = navigator as unknown as { connection?: { saveData?: boolean } };
      if (nav.connection?.saveData) {
        return true;
      }
    } catch {
      // Ignore
    }

    return false;
  }, []);

  const switchInstant = useCallback(
    (targetLang: Language) => {
      clearAllTimers();
      setPhase('idle');
      setIsInteractive(false);
      setIsButtonBlocked(false);
      isTransitioningRef.current = false;

      setLangState(targetLang);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, targetLang);
        document.documentElement.lang = targetLang;
        document.title = TRANSLATIONS[targetLang].meta.title;

        const targetUrl = getLocalizedUrl(targetLang);
        window.history.pushState(null, '', targetUrl);
      } catch {
        // Ignore
      }
    },
    [clearAllTimers],
  );

  const switchWithTransition = useCallback(
    (targetLang: Language) => {
      if (isTransitioningRef.current || targetLang === lang) return;

      // Skip blackout animation if system has reduced motion or low-power mode active
      if (shouldSkipTransition()) {
        switchInstant(targetLang);
        return;
      }

      clearAllTimers();

      isTransitioningRef.current = true;
      setIsButtonBlocked(true);
      setIsInteractive(false);
      setPhase('darkening');

      // Phase 1: 1.0s smooth darkening
      darkenTimerRef.current = setTimeout(() => {
        // Screen is now fully dark: switch language imperceptibly & update route in address bar
        setLangState(targetLang);
        try {
          localStorage.setItem(LANGUAGE_STORAGE_KEY, targetLang);
          document.documentElement.lang = targetLang;
          document.title = TRANSLATIONS[targetLang].meta.title;

          const targetUrl = getLocalizedUrl(targetLang);
          window.history.pushState(null, '', targetUrl);
        } catch {
          // Ignore
        }

        // Phase 2: 1.0s smooth brightening begins
        setPhase('brightening');

        // After 0.5s of brightening: language toggle button becomes available again!
        unblockTimerRef.current = setTimeout(() => {
          setIsInteractive(true);
          setIsButtonBlocked(false);
          isTransitioningRef.current = false;
        }, 500);

        // Full 1.0s brightening completes: return to idle
        finishTimerRef.current = setTimeout(() => {
          setPhase('idle');
          setIsInteractive(false);
        }, 1000);
      }, 1000);
    },
    [lang, clearAllTimers, shouldSkipTransition, switchInstant],
  );

  const setLang = useCallback(
    (newLang: Language) => {
      switchWithTransition(newLang);
    },
    [switchWithTransition],
  );

  const toggleLang = useCallback(() => {
    if (isTransitioningRef.current) return;
    const cycleMap: Record<Language, Language> = {
      en: 'uk',
      uk: 'es',
      es: 'en',
    };
    const next: Language = cycleMap[lang] || 'en';
    switchWithTransition(next);
  }, [lang, switchWithTransition]);

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      isTransitioning: isButtonBlocked,
    }),
    [lang, setLang, toggleLang, t, isButtonBlocked],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div
        className={`${styles.transitionOverlay} ${
          phase === 'darkening'
            ? styles.darkening
            : phase === 'brightening'
              ? `${styles.brightening} ${isInteractive ? styles.interactive : ''}`
              : ''
        }`}
        aria-hidden="true"
      />
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

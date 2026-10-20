'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import { Language, TranslationData, TRANSLATIONS } from '../data/translations';
import styles from './LanguageContext.module.scss';

const STORAGE_KEY = 'portfolio_filter_lang';

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

let memoryLang: Language | null = null;
const listeners = new Set<() => void>();

function getClientSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';
  if (memoryLang !== null) return memoryLang;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    memoryLang = saved === 'uk' ? 'uk' : 'en';
  } catch {
    memoryLang = 'en';
  }
  return memoryLang;
}

function getServerSnapshot(): Language {
  return 'en';
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (
      e.key === STORAGE_KEY &&
      (e.newValue === 'en' || e.newValue === 'uk')
    ) {
      memoryLang = e.newValue;
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', handleStorage);
  };
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const lang = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isButtonBlocked, setIsButtonBlocked] = useState<boolean>(false);

  const isTransitioningRef = useRef<boolean>(false);
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

  const applyLang = useCallback((newLang: Language) => {
    memoryLang = newLang;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore storage write issues
    }
    listeners.forEach((listener) => listener());
  }, []);

  const switchWithTransition = useCallback(
    (targetLang: Language) => {
      if (isTransitioningRef.current) return;
      const current = getClientSnapshot();
      if (targetLang === current) return;

      clearAllTimers();

      isTransitioningRef.current = true;
      setIsButtonBlocked(true);
      setIsInteractive(false);
      setPhase('darkening');

      // Phase 1: 1.0s smooth darkening
      darkenTimerRef.current = setTimeout(() => {
        // Screen is now fully dark: switch language imperceptibly
        applyLang(targetLang);

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
    [applyLang, clearAllTimers],
  );

  const setLang = useCallback(
    (newLang: Language) => {
      switchWithTransition(newLang);
    },
    [switchWithTransition],
  );

  const toggleLang = useCallback(() => {
    if (isTransitioningRef.current) return;
    const current = getClientSnapshot();
    const next: Language = current === 'en' ? 'uk' : 'en';
    switchWithTransition(next);
  }, [switchWithTransition]);

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

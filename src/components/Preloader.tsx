import React, { useEffect, useState } from 'react';
import styles from './Preloader.module.scss';

interface PreloaderProps {
  onComplete: () => void;
}

interface LogLine {
  id: number;
  prefix: string;
  text: string;
  highlight?: string;
  status?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 769) {
      onComplete();
      return;
    }

    document.body.style.overflow = 'hidden';

    const logs: LogLine[] = [
      {
        id: 1,
        prefix: 'sys::init',
        text: 'fetching developer profile',
        status: '[OK]',
      },
      {
        id: 2,
        prefix: 'core::load',
        text: 'mounting [React 19 + TypeScript + Canvas]',
        status: '[100%]',
      },
      {
        id: 3,
        prefix: 'auth::grant',
        text: 'welcome,',
        highlight: 'Yaroslav Sych',
        status: '[READY]',
      },
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    timeouts.push(
      setTimeout(() => {
        setLines([logs[0]]);
      }, 400),
    );

    timeouts.push(
      setTimeout(() => {
        setLines([logs[0], logs[1]]);
      }, 1100),
    );

    timeouts.push(
      setTimeout(() => {
        setLines([logs[0], logs[1], logs[2]]);
      }, 1800),
    );

    timeouts.push(
      setTimeout(() => {
        setIsExiting(true);
      }, 2550),
    );

    timeouts.push(
      setTimeout(() => {
        document.body.style.overflow = '';
        onComplete();
      }, 3000),
    );

    return () => {
      document.body.style.overflow = '';
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`${styles.preloaderOverlay} ${isExiting ? styles.exiting : ''}`}
      onClick={handleSkip}
    >
      <div className={styles.preloaderContainer}>
        <div className={styles.skipHintAbove}>
          <span>CLICK ANYWHERE TO SKIP</span>
        </div>

        <div className={styles.terminalCard}>
          <div className={styles.terminalHeader}>
            <div className={styles.windowDots}>
              <span className={`${styles.dot} ${styles.red}`} />
              <span className={`${styles.dot} ${styles.yellow}`} />
              <span className={`${styles.dot} ${styles.green}`} />
            </div>
            <span className={styles.terminalTitle}>dev@sych-portfolio:~</span>
            <div className={styles.headerSpacer} />
          </div>

          <div className={styles.terminalBody}>
            {lines.map((line) => (
              <div key={line.id} className={styles.terminalLine}>
                <span className={styles.prefix}>{line.prefix}</span>
                <span className={styles.arrow}>❯</span>
                <span className={styles.text}>{line.text}</span>
                {line.highlight && (
                  <span className={styles.highlight}>{line.highlight}</span>
                )}
                {line.status && (
                  <span className={styles.status}>{line.status}</span>
                )}
              </div>
            ))}

            <div className={styles.cursorLine}>
              <span className={styles.prompt}>❯</span>
              <span className={styles.cursor} />
            </div>
          </div>

          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar} />
          </div>
        </div>
      </div>
    </div>
  );
};

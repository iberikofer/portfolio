'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  FormEvent,
} from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss';
import { DATA } from '../data/config';
import { useButtonGlow } from '../hooks/useButtonGlow';
import { useLanguage } from '../context/LanguageContext';
import { trackEvent } from '../lib/analytics';

interface FlyingPlaneCoord {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DRAFT_STORAGE_KEY = 'portfolio_contact_draft';
const COOLDOWN_STORAGE_KEY = 'portfolio_contact_last_sent';
const COOLDOWN_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Base64 encoded contacts to prevent scrapers from harvesting plaintext emails/numbers from static HTML
const ENCODED_EMAIL = 'c3ljaC55YXJvc2xhdi53b3JrQGdtYWlsLmNvbQ==';
const ENCODED_PHONE = 'KzM4MCAoNjgpIDcxMi03OS03NQ==';
const ENCODED_TEL_HREF = 'KzM4MDY4NzEyNzk3NQ==';

const decodeContact = (encoded: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    return atob(encoded);
  } catch {
    return '';
  }
};

const sanitizeInput = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>]/g, '');
};

interface ContactDraft {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
}

const getRemainingCooldownSeconds = (): number => {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (!raw) return 0;
    const lastSent = parseInt(raw, 10);
    if (isNaN(lastSent)) return 0;
    const elapsed = Date.now() - lastSent;
    if (elapsed < COOLDOWN_DURATION_MS) {
      return Math.ceil((COOLDOWN_DURATION_MS - elapsed) / 1000);
    }
    return 0;
  } catch {
    return 0;
  }
};

const formatCooldown = (seconds: number): string => {
  if (seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const getHasSavedDraft = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return false;
    const draft: ContactDraft = JSON.parse(raw);
    return Boolean(
      (draft.userName && draft.userName.trim()) ||
        (draft.userEmail && draft.userEmail.trim()) ||
        (draft.subject && draft.subject.trim()) ||
        (draft.message && draft.message.trim()),
    );
  } catch {
    return false;
  }
};

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);
  const resumeGlowRef = useRef<HTMLSpanElement>(null);
  useButtonGlow(resumeBtnRef, resumeGlowRef);

  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const submitGlowRef = useRef<HTMLSpanElement>(null);
  useButtonGlow(submitBtnRef, submitGlowRef);

  const form = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const staticPlaneRef = useRef<SVGSVGElement>(null);
  const [flyingPlane, setFlyingPlane] = useState<FlyingPlaneCoord | null>(null);
  const [submitState, setSubmitState] = useState<
    'idle' | 'sending' | 'success' | 'error' | 'validation-error' | 'rate-limited'
  >('idle');
  const [statusFeedback, setStatusFeedback] = useState<string>('');
  const [isAlertFading, setIsAlertFading] = useState<boolean>(false);
  const [hasDraftRestored, setHasDraftRestored] = useState<boolean>(getHasSavedDraft);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(getRemainingCooldownSeconds);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');

  const PARTICLES = [
    { dx: '-85px', dy: '-45px', color: '#9bff00', size: 5, delay: '0ms' },
    { dx: '-65px', dy: '-75px', color: '#ffffff', size: 4, delay: '40ms' },
    { dx: '-25px', dy: '-90px', color: '#b4ff33', size: 6, delay: '20ms' },
    { dx: '25px', dy: '-90px', color: '#9bff00', size: 5, delay: '60ms' },
    { dx: '65px', dy: '-75px', color: '#ffffff', size: 4, delay: '10ms' },
    { dx: '90px', dy: '-40px', color: '#b4ff33', size: 6, delay: '50ms' },
    { dx: '95px', dy: '15px', color: '#9bff00', size: 5, delay: '30ms' },
    { dx: '75px', dy: '60px', color: '#ffffff', size: 4, delay: '70ms' },
    { dx: '40px', dy: '80px', color: '#b4ff33', size: 6, delay: '20ms' },
    { dx: '-10px', dy: '85px', color: '#9bff00', size: 5, delay: '80ms' },
    { dx: '-55px', dy: '70px', color: '#ffffff', size: 4, delay: '40ms' },
    { dx: '-90px', dy: '35px', color: '#b4ff33', size: 6, delay: '10ms' },
    { dx: '-95px', dy: '-10px', color: '#9bff00', size: 5, delay: '60ms' },
    { dx: '-45px', dy: '-50px', color: '#ffffff', size: 3, delay: '30ms' },
    { dx: '50px', dy: '-50px', color: '#9bff00', size: 4, delay: '50ms' },
    { dx: '0px', dy: '55px', color: '#b4ff33', size: 5, delay: '70ms' },
  ];

  const mirrorRef = useRef<HTMLDivElement | null>(null);

  // Decode obfuscated contact info on client mount (safe from static HTML scrapers)
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  const safeEmail = isMounted ? decodeContact(ENCODED_EMAIL) : '';
  const safePhone = isMounted ? decodeContact(ENCODED_PHONE) : '';
  const safeTelHref = isMounted ? decodeContact(ENCODED_TEL_HREF) : '';

  // Synchronize cooldown countdown ticker

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = setInterval(() => {
      const remaining = getRemainingCooldownSeconds();
      setCooldownSeconds(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSeconds]);

  useEffect(() => {
    return () => {
      if (mirrorRef.current && mirrorRef.current.parentNode) {
        mirrorRef.current.parentNode.removeChild(mirrorRef.current);
        mirrorRef.current = null;
      }
    };
  }, []);

  const adjustTextareaHeight = (element: HTMLTextAreaElement) => {
    if (!mirrorRef.current) {
      const mirror = document.createElement('div');
      mirror.style.position = 'absolute';
      mirror.style.top = '-9999px';
      mirror.style.left = '-9999px';
      mirror.style.visibility = 'hidden';
      mirror.style.pointerEvents = 'none';
      mirror.style.whiteSpace = 'pre-wrap';
      mirror.style.wordWrap = 'break-word';
      mirror.style.overflowWrap = 'break-word';
      document.body.appendChild(mirror);
      mirrorRef.current = mirror;
    }

    const mirror = mirrorRef.current;
    const style = window.getComputedStyle(element);

    mirror.style.width = `${element.clientWidth}px`;
    mirror.style.fontFamily = style.fontFamily;
    mirror.style.fontSize = style.fontSize;
    mirror.style.fontWeight = style.fontWeight;
    mirror.style.lineHeight = style.lineHeight;
    mirror.style.letterSpacing = style.letterSpacing;
    mirror.style.padding = style.padding;
    mirror.style.boxSizing = style.boxSizing;

    mirror.textContent =
      element.value + (element.value.endsWith('\n') ? ' ' : '');

    const minH = 170;
    const maxH = 480;
    const borderOffset = element.offsetHeight - element.clientHeight;
    const rawHeight = mirror.scrollHeight + borderOffset;

    if (rawHeight <= minH) {
      element.style.height = '';
      element.style.overflowY = 'hidden';
      return;
    }

    const nextHeight = Math.min(rawHeight, maxH);
    element.style.height = `${nextHeight}px`;

    if (rawHeight > maxH) {
      element.style.overflowY = 'auto';
    } else {
      element.style.overflowY = 'hidden';
    }
  };

  const saveDraft = useCallback(() => {
    if (!form.current) return;
    try {
      const formData = new FormData(form.current);
      const userName = sanitizeInput((formData.get('user_name') as string | null) || '');
      const userEmail = sanitizeInput((formData.get('user_email') as string | null) || '');
      const subject = sanitizeInput((formData.get('subject') as string | null) || '');
      const message = sanitizeInput(textareaRef.current?.value || '');

      if (
        userName.trim() ||
        userEmail.trim() ||
        subject.trim() ||
        message.trim()
      ) {
        const draft: ContactDraft = { userName, userEmail, subject, message };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      } else {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setHasDraftRestored(false);
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Restore draft on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw && form.current) {
        const draft: ContactDraft = JSON.parse(raw);

        if (draft.userName) {
          const input = form.current.elements.namedItem(
            'user_name',
          ) as HTMLInputElement | null;
          if (input) {
            input.value = draft.userName;
          }
        }
        if (draft.userEmail) {
          const input = form.current.elements.namedItem(
            'user_email',
          ) as HTMLInputElement | null;
          if (input) {
            input.value = draft.userEmail;
          }
        }
        if (draft.subject) {
          const input = form.current.elements.namedItem(
            'subject',
          ) as HTMLInputElement | null;
          if (input) {
            input.value = draft.subject;
          }
        }
        if (draft.message && textareaRef.current) {
          textareaRef.current.value = draft.message;
          adjustTextareaHeight(textareaRef.current);
        }
      }
    } catch {
      // Ignore parse/storage errors
    }
  }, []);

  // Save draft on window unload, tab switch (visibility change), or pagehide
  useEffect(() => {
    const handleBeforeUnload = () => saveDraft();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveDraft();
      }
    };
    const handlePageHide = () => saveDraft();

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [saveDraft]);

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(e.currentTarget);
    saveDraft();
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.current ||
      submitState === 'sending' ||
      submitState === 'success'
    ) {
      return;
    }

    // Rate-limiting check: max 1 submission every 5 minutes
    const remainingCooldown = getRemainingCooldownSeconds();
    if (remainingCooldown > 0) {
      trackEvent('contact_rate_limited', { remainingSeconds: remainingCooldown });
      setSubmitState('rate-limited');
      setStatusFeedback(
        t.contact.statusRateLimited.replace(
          '{time}',
          formatCooldown(remainingCooldown),
        ),
      );
      setTimeout(() => {
        setIsAlertFading(true);
      }, 3200);
      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'rate-limited') {
            setStatusFeedback('');
            setIsAlertFading(false);
            return 'idle';
          }
          return prev;
        });
      }, 3800);
      return;
    }

    const formData = new FormData(form.current);

    // Anti-Spam Honeypot Trap: automated bots populate hidden fields; real users never do
    const botTrap = (formData.get('website_url') as string | null)?.trim() || honeypot.trim();
    if (botTrap) {
      trackEvent('honeypot_trapped');
      setSubmitState('success');
      setStatusFeedback(t.contact.statusSuccess);
      form.current?.reset();
      clearDraft();
      setHoneypot('');
      setTimeout(() => setIsAlertFading(true), 3500);
      setTimeout(() => {
        setSubmitState('idle');
        setIsAlertFading(false);
        setStatusFeedback('');
      }, 4200);
      return;
    }

    const rawUserName = (formData.get('user_name') as string | null)?.trim() ?? '';
    const rawUserEmail = (formData.get('user_email') as string | null)?.trim() ?? '';
    const rawSubject = (formData.get('subject') as string | null)?.trim() ?? '';
    const rawMessage = (formData.get('message') as string | null)?.trim() ?? '';

    const userName = sanitizeInput(rawUserName);
    const userEmail = sanitizeInput(rawUserEmail);
    const subject = sanitizeInput(rawSubject);
    const message = sanitizeInput(rawMessage);

    if (!userName || !message) {
      setSubmitState('validation-error');
      setStatusFeedback(t.contact.statusValidationRequired);
      setTimeout(() => {
        setIsAlertFading(true);
      }, 3000);
      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'validation-error') {
            setStatusFeedback('');
            setIsAlertFading(false);
            return 'idle';
          }
          return prev;
        });
      }, 3600);
      return;
    }

    // Validate email format and valid top-level domain (prevent DNS timeouts on typos like .b)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (userEmail && !emailRegex.test(userEmail)) {
      setSubmitState('validation-error');
      setStatusFeedback(t.contact.statusValidationEmail);
      setTimeout(() => {
        setIsAlertFading(true);
      }, 3400);
      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'validation-error') {
            setStatusFeedback('');
            setIsAlertFading(false);
            return 'idle';
          }
          return prev;
        });
      }, 4000);
      return;
    }

    const planeRect = staticPlaneRef.current?.getBoundingClientRect();
    if (planeRect) {
      setFlyingPlane({
        top: planeRect.top,
        left: planeRect.left,
        width: planeRect.width,
        height: planeRect.height,
      });
      setTimeout(() => {
        setFlyingPlane(null);
      }, 3900);
    }

    setSubmitState('sending');
    setStatusFeedback('');

    // Minimum visual delay so user can appreciate the full flight before success state
    const minDelay = new Promise((resolve) => setTimeout(resolve, 3950));

    // Hard network timeout (8.5s) to prevent the button hanging on external mail delays
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 8500),
    );

    // Interactive Demo / Test Mode support (if user types 'test')
    const isTestMode =
      userName.toLowerCase() === 'test' ||
      subject.toLowerCase().includes('test') ||
      message.toLowerCase().includes('test') ||
      userEmail.includes('@test.');

    try {
      if (isTestMode) {
        // Smoothly simulate successful dispatch for animation testing
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } else {
        await Promise.all([
          Promise.race([
            emailjs.sendForm(
              'service_zryayhv',
              'template_hyhed1i',
              form.current,
              's_rEp5-7RXlD2T7_4',
            ),
            timeoutPromise,
          ]),
          minDelay,
        ]);
      }

      trackEvent('submit_contact_form', { test_mode: isTestMode });
      setSubmitState('success');
      setStatusFeedback(t.contact.statusSuccess);
      form.current?.reset();
      clearDraft();
      try {
        localStorage.setItem(COOLDOWN_STORAGE_KEY, Date.now().toString());
        setCooldownSeconds(Math.ceil(COOLDOWN_DURATION_MS / 1000));
      } catch {
        // Ignore storage errors
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = '';
        textareaRef.current.style.overflowY = 'hidden';
      }

      // Smoothly return to idle after celebratory period
      setTimeout(() => {
        setIsAlertFading(true);
      }, 4300);

      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'success') {
            setStatusFeedback('');
            setIsAlertFading(false);
            return 'idle';
          }
          return prev;
        });
      }, 5000);
    } catch (error: unknown) {
      const emailJsError = error as { status?: number; text?: string };
      const errDetail =
        emailJsError?.text ||
        (error instanceof Error ? error.message : String(error));
      console.error('EmailJS transmission error:', {
        status: emailJsError?.status,
        text: errDetail,
        raw: error,
      });

      setSubmitState('error');
      const isTimeout = error instanceof Error && error.message === 'TIMEOUT';
      setStatusFeedback(
        isTimeout
          ? t.contact.statusTimeout
          : errDetail && errDetail !== '[object Object]'
            ? `${t.contact.statusIssue} (${errDetail})`
            : t.contact.statusIssue,
      );
      setTimeout(() => {
        setIsAlertFading(true);
      }, 5300);

      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'error') {
            setStatusFeedback('');
            setIsAlertFading(false);
            return 'idle';
          }
          return prev;
        });
      }, 6000);
    }
  };

  return (
    <section id="contact" className={styles.container}>
      <div className={styles.wrapper}>
        {/* Info Column */}
        <div className={styles.infoSide}>
          <div className={styles.statusPill}>
            <span className={styles.radarWrapper}>
              <span className={styles.radarPing} />
              <span className={styles.radarDot} />
            </span>
            <span>{t.contact.pill}</span>
          </div>

          <h2 className={styles.title}>{t.contact.title}</h2>
          <p className={styles.description}>
            {t.contact.subtitle}
          </p>

          {/* FullStack-JS Developer Resume Showcase Card */}
          <div className={styles.resumeCard}>
            <div className={styles.resumeRoleInfo}>
              <span className={styles.roleLabel}>{t.contact.specializationLabel}</span>
              <h3 className={styles.roleTitle}>{t.contact.specializationRole}</h3>
            </div>
            <a
              ref={resumeBtnRef}
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeBtn}
              draggable={false}
              title={t.contact.cvDesc}
              onClick={() =>
                trackEvent('download_resume', {
                  role: 'FullStack-JS Developer',
                })
              }
            >
              <span className={styles.btnGlow} aria-hidden="true">
                <span ref={resumeGlowRef} className={styles.glowSpot} />
              </span>
              <svg
                className={styles.resumeBtnIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.contact.cvBtn}</span>
            </a>
          </div>

          <div className={styles.contactCards}>
            <a
              href={safeEmail ? `mailto:${safeEmail}` : '#'}
              className={styles.contactItem}
              onClick={(e) => {
                trackEvent('social_click', { channel: 'email' });
                if (!safeEmail) {
                  e.preventDefault();
                  const decoded = decodeContact(ENCODED_EMAIL);
                  window.location.href = `mailto:${decoded}`;
                }
              }}
            >
              <div className={styles.itemIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className={styles.itemText}>
                <span className={styles.itemLabel}>{t.contact.emailTitle}</span>
                <span className={styles.itemVal}>{safeEmail || 'sych.•••@gmail.com'}</span>
              </div>
            </a>

            <a
              href={safeTelHref ? `tel:${safeTelHref}` : '#'}
              className={styles.contactItem}
              onClick={(e) => {
                trackEvent('social_click', { channel: 'phone' });
                if (!safeTelHref) {
                  e.preventDefault();
                  const decodedTel = decodeContact(ENCODED_TEL_HREF);
                  window.location.href = `tel:${decodedTel}`;
                }
              }}
            >
              <div className={styles.itemIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className={styles.itemText}>
                <span className={styles.itemLabel}>{t.contact.phoneTitle}</span>
                <span className={styles.itemVal}>{safePhone || '+380 (68) •••-••-••'}</span>
              </div>
            </a>

            <div className={styles.contactItemStatic}>
              <div className={styles.itemIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className={styles.itemText}>
                <span className={styles.itemLabel}>{t.contact.locationTitle}</span>
                <span className={styles.itemVal}>
                  {t.contact.locationDesc}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div
          className={`${styles.formSide} ${
            submitState === 'sending' ? styles.formTransmitting : ''
          } ${submitState === 'success' ? styles.formSuccess : ''}`}
        >
          {/* Cybernetic laser scanner line across top border during transmission */}
          <div className={styles.laserScanBar} aria-hidden="true" />

          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>{t.contact.formTitle}</h3>
            <p className={styles.formSubtitle}>
              {t.contact.formSubtitle}
            </p>
            {hasDraftRestored && (
              <div className={styles.draftBadge}>
                <span>{t.contact.draftRestored}</span>
                <button
                  type="button"
                  onClick={() => {
                    form.current?.reset();
                    clearDraft();
                    if (textareaRef.current) {
                      textareaRef.current.style.height = '';
                    }
                  }}
                  className={styles.clearDraftBtn}
                >
                  {t.contact.draftClear}
                </button>
              </div>
            )}
            {cooldownSeconds > 0 && (
              <div className={styles.cooldownBadge}>
                <span className={styles.cooldownDot} />
                <span>
                  {t.contact.cooldownBadge.replace(
                    '{time}',
                    formatCooldown(cooldownSeconds),
                  )}
                </span>
              </div>
            )}
          </div>

          <form
            ref={form}
            className={styles.form}
            onSubmit={sendEmail}
            onInput={saveDraft}
          >
            {/* Honeypot anti-spam trap (invisible to humans, traps scraping bots) */}
            <div
              style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="website_url"
                id="website_url"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className={styles.inputRow}>
              <div
                className={`${styles.field} ${
                  submitState === 'sending' ? styles.fieldLocked : ''
                }`}
              >
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder=" "
                  required
                  disabled={
                    submitState === 'sending' || submitState === 'success'
                  }
                />
                <label htmlFor="user_name">{t.contact.nameLabel}</label>
              </div>

              <div
                className={`${styles.field} ${
                  submitState === 'sending' ? styles.fieldLocked : ''
                }`}
              >
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder=" "
                  required
                  disabled={
                    submitState === 'sending' || submitState === 'success'
                  }
                />
                <label htmlFor="user_email">{t.contact.emailLabel}</label>
              </div>
            </div>

            <div
              className={`${styles.field} ${
                submitState === 'sending' ? styles.fieldLocked : ''
              }`}
            >
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder=" "
                disabled={
                  submitState === 'sending' || submitState === 'success'
                }
                autoComplete="off"
              />
              <label htmlFor="subject">{t.contact.subjectLabel}</label>
            </div>

            <div
              className={`${styles.field} ${styles.messageField} ${
                submitState === 'sending' ? styles.fieldLocked : ''
              }`}
            >
              <textarea
                ref={textareaRef}
                name="message"
                id="message"
                placeholder=" "
                required
                disabled={
                  submitState === 'sending' || submitState === 'success'
                }
                onInput={handleTextareaInput}
              />
              <label htmlFor="message">{t.contact.messageLabel}</label>
            </div>

            <div className={styles.formFooter}>
              <button
                ref={submitBtnRef}
                type="submit"
                className={`${styles.submitBtn} ${
                  submitState === 'sending' ? styles.btnSending : ''
                } ${submitState === 'success' ? styles.btnSuccess : ''} ${
                  submitState === 'error' || submitState === 'validation-error'
                    ? styles.btnError
                    : ''
                } ${
                  submitState === 'idle' && cooldownSeconds > 0
                    ? styles.btnCooldown
                    : ''
                } ${submitState === 'rate-limited' ? styles.btnWarning : ''}`}
                disabled={
                  submitState === 'sending' ||
                  submitState === 'success' ||
                  (submitState === 'idle' && cooldownSeconds > 0)
                }
                title={
                  cooldownSeconds > 0
                    ? t.contact.cooldownBadge.replace(
                        '{time}',
                        formatCooldown(cooldownSeconds),
                      )
                    : undefined
                }
                aria-live="polite"
              >
                {/* Dynamic cursor-following glow effect */}
                <span className={styles.btnGlow} aria-hidden="true">
                  <span ref={submitGlowRef} className={styles.glowSpot} />
                </span>

                {/* Shockwave expanding ring upon success */}
                {submitState === 'success' && (
                  <span className={styles.shockwaveRing} aria-hidden="true" />
                )}

                {/* Micro particle celebration burst */}
                {submitState === 'success' && (
                  <div className={styles.particlesBurst} aria-hidden="true">
                    {PARTICLES.map((p, i) => (
                      <span
                        key={i}
                        className={styles.particle}
                        style={
                          {
                            '--dx': p.dx,
                            '--dy': p.dy,
                            '--p-color': p.color,
                            '--p-size': `${p.size}px`,
                            '--p-delay': p.delay,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                )}

                {/* State: COOLDOWN COUNTDOWN IN IDLE */}
                {submitState === 'idle' && cooldownSeconds > 0 && (
                  <span className={styles.btnContent}>
                    <svg
                      className={styles.clockIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>
                      {t.contact.btnCooldown.replace(
                        '{time}',
                        formatCooldown(cooldownSeconds),
                      )}
                    </span>
                  </span>
                )}

                {/* State: IDLE READY */}
                {submitState === 'idle' && cooldownSeconds === 0 && (
                  <span className={styles.btnContent}>
                    <span>{t.contact.btnIdle}</span>
                    <svg
                      ref={staticPlaneRef}
                      className={styles.planeIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  </span>
                )}

                {/* State: SENDING / TRANSMITTING */}
                {submitState === 'sending' && (
                  <span className={styles.btnContent}>
                    <span className={styles.transmittingRing} />
                    <span className={styles.transmittingText}>
                      <span>{t.contact.btnSending}</span>
                      <span className={styles.pulsingDots}>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </span>
                  </span>
                )}

                {/* State: SUCCESS */}
                {submitState === 'success' && (
                  <span className={styles.btnContent}>
                    <div className={styles.checkWrapper}>
                      <svg
                        className={styles.checkSvg}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          className={styles.checkCircle}
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="2.2"
                        />
                        <path
                          className={styles.checkTick}
                          d="M7.5 12.5L10.5 15.5L16.5 9.5"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className={styles.successText}>
                      {t.contact.btnSuccess}
                    </span>
                  </span>
                )}

                {/* State: ERROR or VALIDATION-ERROR */}
                {(submitState === 'error' ||
                  submitState === 'validation-error') && (
                  <span className={styles.btnContent}>
                    <span className={styles.errorExclamation}>!</span>
                    <span>
                      {submitState === 'validation-error'
                        ? t.contact.btnValidation
                        : t.contact.btnError}
                    </span>
                  </span>
                )}

                {/* State: RATE-LIMITED */}
                {submitState === 'rate-limited' && (
                  <span className={styles.btnContent}>
                    <span className={styles.errorExclamation}>⏳</span>
                    <span>{t.contact.btnRateLimited}</span>
                  </span>
                )}
              </button>

              {statusFeedback && submitState !== 'idle' && (
                <div
                  className={`${styles.statusAlert} ${
                    submitState === 'success'
                      ? styles.alertSuccess
                      : submitState === 'rate-limited'
                        ? styles.alertWarning
                        : styles.alertError
                  } ${isAlertFading ? styles.alertFadingOut : ''}`}
                  role="status"
                >
                  <span className={styles.alertIcon}>
                    {submitState === 'success'
                      ? '✓'
                      : submitState === 'rate-limited'
                        ? '⏳'
                        : '!'}
                  </span>
                  <span>{statusFeedback}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {flyingPlane &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={styles.flyingPlaneCarrier}
            style={
              {
                top: `${flyingPlane.top}px`,
                left: `${flyingPlane.left}px`,
                width: `${flyingPlane.width}px`,
                height: `${flyingPlane.height}px`,
                '--start-x': `${flyingPlane.left}px`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <div className={styles.flyingPlaneWave}>
              <svg
                className={styles.flyingPlaneSvg}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default Contact;

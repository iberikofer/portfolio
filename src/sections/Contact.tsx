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

interface FlyingPlaneCoord {
  top: number;
  left: number;
  width: number;
  height: number;
}

const DRAFT_STORAGE_KEY = 'portfolio_contact_draft';

interface ContactDraft {
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
}

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
    'idle' | 'sending' | 'success' | 'error' | 'validation-error'
  >('idle');
  const [statusFeedback, setStatusFeedback] = useState<string>('');
  const [isAlertFading, setIsAlertFading] = useState<boolean>(false);
  const [hasDraftRestored, setHasDraftRestored] = useState<boolean>(getHasSavedDraft);

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
      const userName = (formData.get('user_name') as string | null) || '';
      const userEmail = (formData.get('user_email') as string | null) || '';
      const subject = (formData.get('subject') as string | null) || '';
      const message = textareaRef.current?.value || '';

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

    const formData = new FormData(form.current);
    const userName = (formData.get('user_name') as string | null)?.trim() ?? '';
    const userEmail =
      (formData.get('user_email') as string | null)?.trim() ?? '';
    const subject = (formData.get('subject') as string | null)?.trim() ?? '';
    const message = (formData.get('message') as string | null)?.trim() ?? '';

    if (!userName || !message) {
      setSubmitState('validation-error');
      setStatusFeedback('Please enter both your name and message.');
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
      setStatusFeedback(
        'Please provide a valid email format (e.g. yourname@domain.com).',
      );
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

      setSubmitState('success');
      setStatusFeedback('Message sent successfully! I will be in touch soon.');
      form.current?.reset();
      clearDraft();
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
          ? 'Network timeout: Email service took too long to respond. Please reach me directly via email or Telegram.'
          : errDetail && errDetail !== '[object Object]'
            ? `Delivery issue (${errDetail}). Please reach me directly via email or Telegram.`
            : 'Delivery issue with email service. Please reach me directly via email or Telegram.',
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
            <span>Available for new opportunities</span>
          </div>

          <h2 className={styles.title}>Let's Build Something Exceptional</h2>
          <p className={styles.description}>
            Whether you have an ambitious web project, want to discuss software
            engineering roles, or simply want to connect — my inbox is always
            open.
          </p>

          {/* FullStack-JS Developer Resume Showcase Card */}
          <div className={styles.resumeCard}>
            <div className={styles.resumeRoleInfo}>
              <span className={styles.roleLabel}>Specialization</span>
              <h3 className={styles.roleTitle}>FullStack-JS Developer</h3>
            </div>
            <a
              ref={resumeBtnRef}
              href="resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={styles.resumeBtn}
              title="Download Yaroslav Sych's Resume (PDF)"
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
              <span>Download Resume</span>
            </a>
          </div>

          <div className={styles.contactCards}>
            <a
              href={`mailto:${DATA.profile.email}`}
              className={styles.contactItem}
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
                <span className={styles.itemLabel}>Email Address</span>
                <span className={styles.itemVal}>{DATA.profile.email}</span>
              </div>
            </a>

            <a href="tel:+380687127975" className={styles.contactItem}>
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
                <span className={styles.itemLabel}>Direct Line</span>
                <span className={styles.itemVal}>{DATA.profile.phone}</span>
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
                <span className={styles.itemLabel}>Location</span>
                <span className={styles.itemVal}>
                  Vinnytsia, Ukraine (GMT+2)
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
            <h3 className={styles.formTitle}>Send a Direct Message</h3>
            <p className={styles.formSubtitle}>
              I respond promptly to inquiries and project propositions.
            </p>
            {hasDraftRestored && (
              <div className={styles.draftBadge}>
                <span>Saved draft restored</span>
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
                  Clear draft
                </button>
              </div>
            )}
          </div>

          <form
            ref={form}
            className={styles.form}
            onSubmit={sendEmail}
            onInput={saveDraft}
          >
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
                <label htmlFor="user_name">Your Name</label>
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
                <label htmlFor="user_email">Your Email</label>
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
              <label htmlFor="subject">Subject</label>
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
              <label htmlFor="message">Your Message...</label>
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
                }`}
                disabled={
                  submitState === 'sending' || submitState === 'success'
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

                {/* State: IDLE */}
                {submitState === 'idle' && (
                  <span className={styles.btnContent}>
                    <span>Send Message</span>
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
                      <span>Transmitting</span>
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
                      Message Dispatched! ✨
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
                        ? 'Please Complete Fields'
                        : 'Delivery Failed • Tap to Retry'}
                    </span>
                  </span>
                )}
              </button>

              {statusFeedback && submitState !== 'idle' && (
                <div
                  className={`${styles.statusAlert} ${
                    submitState === 'success'
                      ? styles.alertSuccess
                      : styles.alertError
                  } ${isAlertFading ? styles.alertFadingOut : ''}`}
                  role="status"
                >
                  <span className={styles.alertIcon}>
                    {submitState === 'success' ? '✓' : '!'}
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

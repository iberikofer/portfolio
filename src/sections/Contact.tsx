'use client';

import React, { useRef, useState, useEffect, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss';
import { DATA } from '../data/config';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [submitState, setSubmitState] = useState<
    'idle' | 'sending' | 'success' | 'error' | 'validation-error'
  >('idle');
  const [statusFeedback, setStatusFeedback] = useState<string>('');

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

    const minH = 80;
    const maxH = 400;
    const borderOffset = element.offsetHeight - element.clientHeight;
    const rawHeight = mirror.scrollHeight + borderOffset;
    const nextHeight = Math.min(Math.max(rawHeight, minH), maxH);
    element.style.height = `${nextHeight}px`;

    if (rawHeight > maxH) {
      element.style.overflowY = 'auto';
    } else {
      element.style.overflowY = 'hidden';
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(e.currentTarget);
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
        setSubmitState((prev) => {
          if (prev === 'validation-error') {
            setStatusFeedback('');
            return 'idle';
          }
          return prev;
        });
      }, 3000);
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
        setSubmitState((prev) => {
          if (prev === 'validation-error') {
            setStatusFeedback('');
            return 'idle';
          }
          return prev;
        });
      }, 3500);
      return;
    }

    setSubmitState('sending');
    setStatusFeedback('');

    // Minimum visual delay so user can appreciate the rocket/plane takeoff
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));

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
        await new Promise((resolve) => setTimeout(resolve, 1200));
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
      if (textareaRef.current) {
        textareaRef.current.style.height = '80px';
        textareaRef.current.style.overflowY = 'hidden';
      }

      // Smoothly return to idle after celebratory period
      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'success') {
            setStatusFeedback('');
            return 'idle';
          }
          return prev;
        });
      }, 5000);
    } catch (error: unknown) {
      console.error('EmailJS transmission error:', error);
      setSubmitState('error');
      const isTimeout =
        error instanceof Error && error.message === 'TIMEOUT';
      setStatusFeedback(
        isTimeout
          ? 'Network timeout: Email service took too long to respond. Please reach me directly via email or Telegram.'
          : 'Delivery issue with email service. Please reach me directly via email or Telegram.',
      );
      setTimeout(() => {
        setSubmitState((prev) => {
          if (prev === 'error') {
            setStatusFeedback('');
            return 'idle';
          }
          return prev;
        });
      }, 5000);
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
              href="resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={styles.resumeBtn}
              title="Download Yaroslav Sych's Resume (PDF)"
            >
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

          {/* Socials Row */}
          <div className={styles.socialsSection}>
            <span className={styles.socialsHeading}>Social Profiles</span>
            <div className={styles.socials}>
              <a
                href={DATA.profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={styles.socialBtn}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://t.me/YSych"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className={styles.socialBtn}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zm5.832 8.352l-1.992 9.392c-.144.664-.536.824-1.096.512l-3.032-2.232-1.464 1.408c-.16.16-.304.296-.624.296l.216-3.072 5.592-5.048c.24-.216-.048-.336-.368-.12l-6.912 4.352-2.976-.928c-.648-.2-.664-.648.136-.96l11.632-4.48c.536-.192 1.008.128.888.88z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/yaroslav.sych"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.socialBtn}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={styles.socialBtn}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
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
          </div>

          <form ref={form} className={styles.form} onSubmit={sendEmail}>
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
              className={`${styles.field} ${
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
                    <div className={styles.flightScene} aria-hidden="true">
                      <svg
                        className={styles.launchingPlane}
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
                  }`}
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
    </section>
  );
};

export default Contact;

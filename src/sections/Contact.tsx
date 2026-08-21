import React, { useRef, useState, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";
import { DATA } from "../data/config";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formStatus, formSetStatus] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    if (formStatus !== "") {
      const timer = setTimeout(() => {
        formSetStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

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
      const mirror = document.createElement("div");
      mirror.style.position = "absolute";
      mirror.style.top = "-9999px";
      mirror.style.left = "-9999px";
      mirror.style.visibility = "hidden";
      mirror.style.pointerEvents = "none";
      mirror.style.whiteSpace = "pre-wrap";
      mirror.style.wordWrap = "break-word";
      mirror.style.overflowWrap = "break-word";
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
      element.value + (element.value.endsWith("\n") ? " " : "");

    const minH = 75;
    const maxH = 400;
    const borderOffset = element.offsetHeight - element.clientHeight;
    const rawHeight = mirror.scrollHeight + borderOffset;
    const nextHeight = Math.min(Math.max(rawHeight, minH), maxH);
    element.style.height = `${nextHeight}px`;

    // Only show scrollbar when text genuinely exceeds the maximum allowed height (400px)
    if (rawHeight > maxH) {
      element.style.overflowY = "auto";
    } else {
      element.style.overflowY = "hidden";
    }
  };

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(e.currentTarget);
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const userName = (formData.get("user_name") as string | null)?.trim() ?? "";
    const message = (formData.get("message") as string | null)?.trim() ?? "";

    if (!userName || !message) {
      formSetStatus("spaceError");
      console.warn("Validation failed: empty fields or only spaces.");
      return;
    }

    setIsSending(true);

    emailjs
      .sendForm(
        "service_zryayhv",
        "template_hyhed1i",
        form.current,
        "s_rEp5-7RXlD2T7_4",
      )
      .then(
        () => {
          formSetStatus("success");
          setIsSending(false);
          form.current?.reset();
          if (textareaRef.current) {
            textareaRef.current.style.height = "75px";
            textareaRef.current.style.overflowY = "hidden";
          }
        },
        (error: { text?: string }) => {
          formSetStatus("error");
          setIsSending(false);
          console.error("EmailJS error:", error.text);
        },
      );
  };

  return (
    <section id="contact" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.infoSide}>
          <div className={styles.status}>
            <span className={styles.dot}></span>
            Available for new opportunities
          </div>

          <h2 className={styles.title}>Contact me</h2>
          <p className={styles.description}>
            I welcome inquiries regarding potential collaborations, professional
            opportunities, and industry networking.
          </p>

          <ul className={styles.contactList}>
            <li>
              <span>Email:</span>
              <a href={`mailto:${DATA.profile.email}`}>{DATA.profile.email}</a>
            </li>
            <li>
              <span>Phone:</span>
              <a href="tel:+380687127975">{DATA.profile.phone}</a>
            </li>
            <li>
              <span>Location:</span>
              Vinnytsia, Ukraine (GMT+2)
            </li>
            <li>
              <span>Socials:</span>
              <div className={styles.socials}>
                <a
                  href="https://www.linkedin.com/in/yaroslav-sych"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://t.me/YSych"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zm5.832 8.352l-1.992 9.392c-.144.664-.536.824-1.096.512l-3.032-2.232-1.464 1.408c-.16.16-.304.296-.624.296l.216-3.072 5.592-5.048c.24-.216-.048-.336-.368-.12l-6.912 4.352-2.976-.928c-.648-.2-.664-.648.136-.96l11.632-4.48c.536-.192 1.008.128.888.88z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/yaroslav.sych"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.formSide}>
          <h3 className={styles.formTitle}>...or fill out the form</h3>
          <form ref={form} className={styles.form} onSubmit={sendEmail}>
            <div className={styles.inputRow}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder=" "
                  required
                  disabled={isSending}
                />
                <label htmlFor="user_name">Name</label>
              </div>
              <div className={styles.field}>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  placeholder=" "
                  required
                  disabled={isSending}
                />
                <label htmlFor="user_email">Email</label>
              </div>
            </div>

            <div className={styles.field}>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder=" "
                disabled={isSending}
                autoComplete="off"
                data-lpignore="true"
                data-bwignore="true"
                data-1p-ignore="true"
              />
              <label htmlFor="subject">Subject</label>
            </div>

            <div className={styles.field}>
              <textarea
                ref={textareaRef}
                name="message"
                id="message"
                placeholder=" "
                required
                disabled={isSending}
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                autoComplete="off"
                spellCheck="false"
                data-bwignore="true"
                data-1p-ignore="true"
                onInput={handleTextareaInput}></textarea>
              <label htmlFor="message">Your message...</label>
            </div>

            <div className={styles.formFooter}>
              <button
                type="submit"
                className={`${styles.submitBtn} ${isSending ? styles.loading : ""}`}
                disabled={isSending}>
                <span className={isSending ? styles.hideText : ""}>Send</span>
                {isSending && <span className={styles.spinner}></span>}
              </button>
              <div
                className={`${styles.statusMessage} ${
                  formStatus === "success" ? styles.showSuccess : ""
                } ${
                  formStatus === "error" || formStatus === "spaceError"
                    ? styles.showError
                    : ""
                }`}>
                {formStatus === "success" &&
                  "Thank you! Your message was sent successfully. ✨"}
                {formStatus === "error" &&
                  "Something went wrong, please try again. 🔄"}
                {formStatus === "spaceError" &&
                  "Empty fields or only spaces are not acceptable. ❌"}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useRef, useState, useEffect, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formStatus, formSetStatus] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [displayMsg, setDisplayMsg] = useState<string>("");

  useEffect(() => {
    if (formStatus !== "") {
      setDisplayMsg(formStatus);
      const timer = setTimeout(() => {
        formSetStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

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
              <a href="mailto:sych521@gmail.com">sych521@gmail.com</a>
            </li>
            <li>
              <span>Location:</span>
              Vinnytsia, Ukraine (GMT+2)
            </li>
            <li>
              <span style={{ marginBottom: "5px" }}>Socials:</span>
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
          <form ref={form} className={styles.form} onSubmit={sendEmail}>
            <div className={styles.inputRow}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  required
                  disabled={isSending}
                />
              </div>
              <div className={styles.field}>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  required
                  disabled={isSending}
                />
              </div>
            </div>

            <div className={styles.field}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                disabled={isSending}
              />
            </div>

            <div className={styles.field}>
              <textarea
                name="message"
                placeholder="Your message..."
                rows={6}
                required
                disabled={isSending}></textarea>
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
                className={`${styles.statusMessage} ${formStatus === "success" ? styles.showSuccess : ""
                  } ${formStatus === "error" || formStatus === "spaceError" ? styles.showError : ""}`}>
                {displayMsg === "success" &&
                  "Thank you! Your message was sent successfully. ✨"}
                {displayMsg === "error" &&
                  "Something went wrong, please try again. 🔄"}
                {displayMsg === "spaceError" &&
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

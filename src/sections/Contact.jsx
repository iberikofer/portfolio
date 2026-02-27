import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

const Contact = () => {
  const form = useRef();
  const [formStatus, formSetStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [displayMsg, setDisplayMsg] = useState("");

  useEffect(() => {
    if (formStatus !== "") {
      setDisplayMsg(formStatus);
      const timer = setTimeout(() => {
        formSetStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const sendEmail = (e) => {
    e.preventDefault();
    const userName = form.current.user_name.value.trim();
    const message = form.current.message.value.trim();

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
          e.target.reset();
        },
        (error) => {
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
            Available for new projects
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
                  href="https://github.com/iberikofer"
                  target="_blank"
                  rel="noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/yaroslav-sych"
                  target="_blank"
                  rel="noreferrer">
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
                <a href="https://t.me/YSych" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.888 5.352 18.536 0 11.944 0zm5.832 8.352l-1.992 9.392c-.144.664-.536.824-1.096.512l-3.032-2.232-1.464 1.408c-.16.16-.304.296-.624.296l.216-3.072 5.592-5.048c.24-.216-.048-.336-.368-.12l-6.912 4.352-2.976-.928c-.648-.2-.664-.648.136-.96l11.632-4.48c.536-.192 1.008.128.888.88z" />
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
                rows="6"
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
                className={`${styles.statusMessage} ${
                  formStatus === "success" ? styles.showSuccess : ""
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

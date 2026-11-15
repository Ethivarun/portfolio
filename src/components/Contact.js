import React, { useState } from "react";
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { profile } from "../data/profile";

const WEBHOOK_URL = "https://cloud.activepieces.com/api/v1/webhooks/ZY4GY4hVZoJA5yeOoPRf5";
const EMPTY = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm(EMPTY);
      setStatus("success");
    } catch (err) {
      console.error("Error sending message:", err);
      setStatus("error");
    }
  };

  const channels = [
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FiPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    profile.github && { icon: FiGithub, label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github },
    profile.linkedin && { icon: FiLinkedin, label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\//, ""), href: profile.linkedin },
  ].filter(Boolean);

  return (
    <section id="contact" className="section">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="section__title">Let's build something together</h2>
          <p className="section__sub">
            Have a project, a role, or just a question? My inbox is always open — I usually reply within a day.
          </p>
        </header>

        <div className="contact">
          <div className="contact__channels" data-reveal="left">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="card channel" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span className="info-card__icon"><Icon /></span>
                <span>
                  <span className="channel__label">{label}</span>
                  <span className="channel__value">{value}</span>
                </span>
              </a>
            ))}
          </div>

          <form className="card contact__form" onSubmit={onSubmit} data-reveal="right" style={{ "--d": "120ms" }}>
            <div className="field-row">
              <label className="field">
                <span>Name</span>
                <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" required />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@company.com" required />
              </label>
            </div>
            <label className="field">
              <span>Message</span>
              <textarea name="message" rows="5" value={form.message} onChange={onChange} placeholder="Tell me a little about what you need…" required />
            </label>

            <div className="contact__footer">
              <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : <>Send message <FiSend /></>}
              </button>
              {status === "success" && (
                <span className="form-status form-status--ok" role="status">
                  <FiCheckCircle /> Thanks! I'll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="form-status form-status--err" role="alert">
                  <FiAlertCircle /> Couldn't send. Please email me directly.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;

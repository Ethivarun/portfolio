import React, { useEffect, useState } from "react";
import {
  FiArrowUp,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { profile } from "../data/profile";
import { NAV_LINKS } from "./Navbar";

const NAV = [{ id: "home", label: "Home" }, ...NAV_LINKS];

function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const featured = profile.projects.filter((p) => p.featured);
  const socials = [
    profile.github && { href: profile.github, icon: FiGithub, label: "GitHub" },
    profile.linkedin && { href: profile.linkedin, icon: FiLinkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, icon: FiMail, label: "Email" },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="container">
        {/* CTA band */}
        <div className="footer__cta" data-reveal="zoom">
          <div>
            <h2>
              Have a project in mind? <span className="gradient-text">Let's talk.</span>
            </h2>
            <p className="muted">
              Open to full-time roles and freelance work — E-commerce, LMS, CRM, HRMS or anything in between.
            </p>
          </div>
          <div className="footer__cta-actions">
            <a href="#contact" className="btn btn--primary">
              Start a conversation <FiArrowRight />
            </a>
            <button type="button" className="btn btn--ghost" onClick={copyEmail}>
              {copied ? <><FiCheck /> Copied!</> : <><FiCopy /> Copy email</>}
            </button>
          </div>
        </div>

        {/* Columns */}
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#home" className="nav__logo">
              <span className="nav__logo-mark">{profile.shortName[0]}</span>
              {profile.name}
            </a>
            <p className="muted">{profile.tagline}</p>
            {profile.openToWork && (
              <span className="pill">
                <span className="pill__dot" /> Available for work
              </span>
            )}
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h4>Navigate</h4>
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`}>{l.label}</a>
            ))}
          </nav>

          <div className="footer__col">
            <h4>Featured work</h4>
            {featured.map((p) => (
              <a key={p.title} href="#projects">{p.title}</a>
            ))}
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <a href={`mailto:${profile.email}`}><FiMail /> {profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}><FiPhone /> {profile.phone}</a>
            <span><FiMapPin /> {profile.location}</span>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="footer__resume">
              <FiDownload /> Download resume
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="footer__socials">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FiArrowUp />
      </button>
    </footer>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { profile } from "../data/profile";

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "story", label: "My story" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/** "Local time 2:00pm · 15 November, 2026" in the owner's timezone. */
function LocalTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(t);
  }, []);
  const tz = profile.timezone;
  const time = now
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz })
    .replace(" ", "")
    .toLowerCase();
  const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: tz });
  return (
    <span className="nav__time" title={tz}>
      <span className="muted">Local time</span> <strong>{time}</strong>
      <span className="nav__time-sep" /> {date.replace(/ (\d{4})$/, ", $1")}
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = ["home", ...NAV_LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner container">
        <a href="#home" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-text">{profile.shortName}</span>
          <span className="nav__logo-dot" aria-hidden="true" />
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "is-active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn--primary nav__resume-mobile">
            <FiDownload /> Resume
          </a>
        </nav>

        <div className="nav__actions">
          <LocalTime />
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm nav__resume">
            <FiDownload /> Resume
          </a>
          <button
            className="icon-btn nav__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

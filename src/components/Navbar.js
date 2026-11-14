import React, { useEffect, useState } from "react";
import { FiMenu, FiX, FiSun, FiMoon, FiDownload } from "react-icons/fi";
import { profile } from "../data/profile";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
  } catch (e) {}
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = ["home", ...LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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
          <span className="nav__logo-mark">{profile.shortName[0]}</span>
          {profile.shortName}
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`} aria-label="Primary">
          {LINKS.map((l) => (
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
          <button
            className="icon-btn"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
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

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { FiArrowRight, FiMapPin, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";
import Portrait from "./Portrait";

function Hero() {
  const typedEl = useRef(null);
  const sceneRef = useRef(null);

  // Parallax: as you scroll past the hero, the content drifts up, fades and the photo zooms
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(window.scrollY / window.innerHeight, 1);
      sceneRef.current?.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: profile.roles,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner" ref={sceneRef}>
        <div className="hero__text" data-reveal="left">
          {profile.openToWork && (
            <span className="pill">
              <span className="pill__dot" /> Open to new opportunities
            </span>
          )}
          <h1 className="hero__title">
            Hi, I'm {profile.shortName}.
            <br />
            <span className="gradient-text" ref={typedEl} />
          </h1>
          <p className="hero__lead">{profile.tagline}</p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary">
              Let's work together <FiArrowRight />
            </a>
            <a href="#projects" className="btn btn--ghost">
              View my work
            </a>
          </div>

          <div className="hero__meta">
            <span>
              <FiMapPin /> {profile.location}
            </span>
            <span className="hero__socials">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FiGithub />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FiLinkedin />
                </a>
              )}
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FiMail />
              </a>
            </span>
          </div>
        </div>

        <div className="hero__photo" data-reveal="zoom" style={{ "--d": "200ms" }}>
          <Portrait />
        </div>
      </div>
    </section>
  );
}

export default Hero;

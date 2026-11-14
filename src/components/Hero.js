import React, { useEffect, useRef } from "react";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import { profile } from "../data/profile";
import Portrait from "./Portrait";
import RoleCalendar from "./RoleCalendar";

function Hero() {
  const sceneRef = useRef(null);

  // Parallax: as you scroll past the hero, the content drifts up, fades and the portrait zooms
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

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner" ref={sceneRef}>
        <div className="hero__text" data-reveal="left">
          <span className="hero__kicker">
            <i /> {profile.experience[0].role} · {profile.experience[0].company}
          </span>

          <h1 className="hero__title">
            Hi, I'm {profile.shortName}.
            <span className="hero__title-muted">I am a</span>
          </h1>

          <RoleCalendar roles={profile.roles} />

          <p className="hero__lead">{profile.tagline}</p>

          <div className="hero__cta">
            <a href="#contact" className="btn btn--primary btn--pill-icon">
              Start a project
              <span className="btn__circle">
                <FiArrowRight />
              </span>
            </a>
            <a href="#projects" className="link-underline">
              See my work
            </a>
          </div>
        </div>

        <div className="hero__photo" data-reveal="zoom" style={{ "--d": "200ms" }}>
          <Portrait />
        </div>
      </div>

      <div className="container hero__strip" aria-label="Availability">
        {profile.openToWork && <span>Available for work</span>}
        <span>{profile.workMode}</span>
        <a href="#about">
          Scroll to explore <FiArrowDown />
        </a>
      </div>
    </section>
  );
}

export default Hero;

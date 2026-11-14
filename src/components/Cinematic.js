import React, { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

/** Letterbox intro: black bars + name, then the curtain opens. Plays once per browser session. */
export function Intro() {
  const [show, setShow] = useState(() => {
    try {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
      return !sessionStorage.getItem("introSeen");
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch (e) {}
    const root = document.documentElement;
    document.body.style.overflow = "hidden";
    root.classList.add("is-intro");
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      root.classList.remove("is-intro");
    }, 2300);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      root.classList.remove("is-intro");
    };
  }, [show]);

  if (!show) return null;
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__bar intro__bar--top" />
      <div className="intro__bar intro__bar--bottom" />
      <div className="intro__title">
        <span className="intro__name">{profile.name}</span>
        <span className="intro__role">{profile.roles[0]}</span>
      </div>
    </div>
  );
}

/** Thin gradient bar at the top showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

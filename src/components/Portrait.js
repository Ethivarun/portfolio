import React, { useEffect, useRef } from "react";
import { SiReact, SiNodedotjs, SiMongodb, SiKeycloak, SiJavascript, SiPython } from "react-icons/si";
import { profile } from "../data/profile";

// Tech logos that orbit the portrait (name, icon, brand colour)
const ORBIT = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Keycloak", icon: SiKeycloak, color: "#4d9fd6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "Python", icon: SiPython, color: "#4b8bbe" },
];

/**
 * Cinematic portrait:
 *  - glowing disc behind the photo
 *  - tech logos orbiting on a tilted 3D ring (they pass in front of AND behind you)
 *  - whole scene tilts toward the mouse with layered depth (parallax)
 * Set profile.photoCutout = true when using a transparent-background PNG —
 * your head/shoulders will then pop out above the disc.
 */
function Portrait() {
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const hero = stage?.closest(".hero");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    if (!stage || !hero || reduce || !finePointer) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    const apply = () => {
      raf = 0;
      stage.style.setProperty("--ry", `${target.x * 14}deg`);
      stage.style.setProperty("--rx", `${target.y * -10}deg`);
    };
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      target = {
        x: Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2))),
      };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`portrait ${profile.photoCutout ? "portrait--cutout" : ""}`}>
      <div className="portrait__stage" ref={stageRef}>
        <div className="portrait__glow" aria-hidden="true" />
        <div className="portrait__disc" aria-hidden="true" />

        <div className="portrait__photo">
          <img src={profile.photo} alt={profile.name} />
        </div>

        <div className="orbit" aria-hidden="true">
          <div className="orbit__path" />
          <div className="orbit__spin">
            {ORBIT.map(({ name, icon: Icon, color }, i) => (
              <span
                key={name}
                className="orbit__item"
                style={{ "--a": `${(360 / ORBIT.length) * i}deg`, "--c": color }}
                title={name}
              >
                <span className="orbit__icon">
                  <Icon />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {profile.openToWork && (
        <span className="portrait__status">
          <span className="pill__dot" /> {profile.roles[0]}
        </span>
      )}
    </div>
  );
}

export default Portrait;

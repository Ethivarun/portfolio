import React, { useEffect, useRef, useState } from "react";
import useTheme from "../hooks/useTheme";

const REST = 0;
const MAX_PULL = 90;
const TRIGGER = 30;

/**
 * Hanging pull-cord in the top-right corner.
 * Click it, or drag it down and let go, to switch light ↔ dark.
 * The new theme spills out from the knob as an expanding circle (View Transitions API).
 */
function LampCord() {
  const [theme, setTheme] = useTheme();
  const [pull, setPull] = useState(REST);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(() => {
    try {
      return !localStorage.getItem("lampUsed");
    } catch (e) {
      return false;
    }
  });
  const [swinging, setSwinging] = useState(false);
  const swingTimer = useRef(null);
  useEffect(() => () => clearTimeout(swingTimer.current), []);
  const knobRef = useRef(null);
  const drag = useRef({ startY: 0, moved: 0 });

  useEffect(() => {
    if (!hint) return;
    const t = setTimeout(() => setHint(false), 9000);
    return () => clearTimeout(t);
  }, [hint]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setHint(false);
    setSwinging(false);
    requestAnimationFrame(() => setSwinging(true));
    clearTimeout(swingTimer.current);
    swingTimer.current = setTimeout(() => setSwinging(false), 1800);
    try {
      localStorage.setItem("lampUsed", "1");
    } catch (e) {}

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce || !knobRef.current) {
      setTheme(next);
      return;
    }
    const r = knobRef.current.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = document.startViewTransition(() => setTheme(next));
    vt.ready
      .then(() =>
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 850, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
        )
      )
      .catch(() => {});
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, moved: 0 };
    setDragging(true);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const dy = Math.max(0, Math.min(MAX_PULL, e.clientY - drag.current.startY));
    drag.current.moved = Math.max(drag.current.moved, Math.abs(e.clientY - drag.current.startY));
    setPull(dy);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    const { moved } = drag.current;
    if (moved < 4) {
      // simple click → quick tug animation
      setPull(36);
      setTimeout(() => setPull(REST), 140);
      toggle();
    } else {
      if (pull >= TRIGGER) toggle();
      setPull(REST);
    }
  };

  // keyboard (Enter / Space) — pointer clicks are handled above
  const onClick = (e) => {
    if (e.detail === 0) {
      setPull(36);
      setTimeout(() => setPull(REST), 140);
      toggle();
    }
  };

  return (
    <div
      className={`lamp ${dragging ? "is-dragging" : ""} ${swinging ? "is-swinging" : ""} ${theme === "light" ? "is-on" : ""}`}
      style={{ "--pull": `${pull}px` }}
    >
      <span className="lamp__cord" aria-hidden="true" />
      <button
        ref={knobRef}
        className="lamp__knob"
        aria-label={`Pull to switch to ${theme === "dark" ? "light" : "dark"} mode`}
        aria-pressed={theme === "light"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onClick}
      >
        <span className="lamp__glow" aria-hidden="true" />
      </button>
      {hint && <span className="lamp__hint">Pull for {theme === "dark" ? "light" : "dark"}</span>}
    </div>
  );
}

export default LampCord;

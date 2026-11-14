import React, { useEffect, useRef, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Wall calendar with spiral rings. Every few seconds the top page flips up
 * over the rings to reveal the next role. Click it to flip manually.
 */
function RoleCalendar({ roles, interval = 2800 }) {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(null); // { i, key }
  const [paused, setPaused] = useState(false);
  const current = useRef(0);

  const next = () => {
    const from = current.current;
    const to = (from + 1) % roles.length;
    current.current = to;
    setFlipping({ i: from, key: Date.now() });
    setIndex(to);
  };

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce || roles.length < 2) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, interval, roles.length]);

  const Page = ({ i, className = "", ...rest }) => (
    <span className={`flipcal__page ${className}`} {...rest}>
      {/* all roles stacked invisibly so the card never changes size */}
      <span className="flipcal__sizer">
        {roles.map((r, k) => (
          <span key={r} className={k === i ? "is-current" : ""} aria-hidden={k !== i}>
            {r}
          </span>
        ))}
      </span>
      <span className="flipcal__count">
        {pad(i + 1)} / {pad(roles.length)}
      </span>
    </span>
  );

  return (
    <button
      type="button"
      className="flipcal"
      onClick={next}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label={`${roles[index]} — next role`}
    >
      <span className="flipcal__rings" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, k) => (
          <i key={k} />
        ))}
      </span>
      <span className="flipcal__stack">
        <span className="flipcal__sheet flipcal__sheet--2" aria-hidden="true" />
        <span className="flipcal__sheet flipcal__sheet--1" aria-hidden="true" />
        <Page i={index} />
        {flipping && (
          <Page
            key={flipping.key}
            i={flipping.i}
            className="flipcal__page--flip"
            aria-hidden="true"
            onAnimationEnd={() => setFlipping(null)}
          />
        )}
      </span>
    </button>
  );
}

export default RoleCalendar;

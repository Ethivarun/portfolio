import React, { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { profile } from "../data/profile";

const pad = (n) => String(n).padStart(2, "0");

/**
 * "Let's go back in time" — a sticky panel with a huge year that changes
 * as you scroll through the timeline (newest → oldest).
 */
function Story() {
  const items = profile.story;
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const els = listRef.current?.querySelectorAll(".story__item");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = items[active];
  const fill = ((active + 0.5) / items.length) * 100;

  return (
    <section id="story" className="section story">
      <div className="container story__inner">
        <div className="story__panel">
          <span className="eyebrow">My story</span>
          <h2 className="story__title">Let's go back in time.</h2>
          <div className="story__year" aria-live="polite">
            <span key={`${cur.year}-${active}`} className="story__year-num">
              {cur.year}
            </span>
          </div>
          <p className="story__period">{cur.period}</p>
          <div className="story__progress">
            <FiClock />
            <span>
              {pad(active + 1)} <em>/ {pad(items.length)}</em>
            </span>
            <span className="story__bar">
              <i style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
            </span>
          </div>
        </div>

        <div className="story__track">
        <span className="story__line" aria-hidden="true">
          <i style={{ height: `${fill}%` }} />
        </span>
        <ol className="story__list" ref={listRef}>
          {items.map((it, i) => (
            <li
              key={`${it.year}-${it.title}`}
              data-i={i}
              className={`story__item ${i === active ? "is-active" : ""}`}
            >
              <span className="story__dot" aria-hidden="true" />
              <span className="story__meta">{it.period}</span>
              <h3>{it.title}</h3>
              <p className="story__org">{it.org}</p>
              <ul className="check-list">
                {it.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}

export default Story;

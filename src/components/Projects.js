import React, { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiFolder,
  FiShoppingCart,
  FiBookOpen,
  FiUsers,
  FiBriefcase,
  FiCheck,
} from "react-icons/fi";
import { profile } from "../data/profile";

const VISUALS = {
  "E-Commerce": { icon: FiShoppingCart, hue: 262 },
  LMS: { icon: FiBookOpen, hue: 190 },
  CRM: { icon: FiUsers, hue: 330 },
  HRMS: { icon: FiBriefcase, hue: 150 },
};

/** Stylised app "screen" for a featured project. */
function Screen({ tag }) {
  const { icon: Icon, hue } = VISUALS[tag] || { icon: FiFolder, hue: 250 };
  return (
    <div className="screen" style={{ "--h": hue }}>
      <div className="screen__chrome">
        <i /><i /><i />
        <span className="screen__url">{tag.toLowerCase().replace(/\s/g, "")}.app</span>
      </div>
      <div className="screen__body">
        <aside className="screen__side">
          <span className="screen__logo"><Icon /></span>
          <b /><b /><b /><b />
        </aside>
        <div className="screen__main">
          <div className="screen__kpis">
            <span /><span /><span />
          </div>
          <div className="screen__chart">
            {[40, 65, 50, 80, 60, 92, 74].map((v, i) => (
              <em key={i} style={{ height: `${v}%`, "--i": i }} />
            ))}
          </div>
          <div className="screen__rows">
            <b /><b /><b />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Featured projects as sticky "frames" that stack: each new frame slides over the last,
 *  and the one underneath recedes (scales down + dims). */
function FeatureStack({ items }) {
  const wrap = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = wrap.current?.querySelectorAll(".frame");
      if (!cards) return;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        let p = 0;
        if (next) {
          const a = card.getBoundingClientRect();
          const b = next.getBoundingClientRect();
          p = Math.min(Math.max(1 - (b.top - a.top) / a.height, 0), 1);
        }
        card.style.setProperty("--recede", p.toFixed(3));
      });
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

  return (
    <div className="frames" ref={wrap}>
      {items.map((p, i) => (
        <article key={p.title} className="frame" style={{ "--n": i }}>
          <div className="frame__inner">
            <div className="frame__text">
              <span className="frame__index">
                {String(i + 1).padStart(2, "0")} <em>/ {String(items.length).padStart(2, "0")}</em>
              </span>
              <span className="project__tag">{p.tag}</span>
              <h3 className="frame__title">{p.title}</h3>
              <p className="muted">{p.description}</p>
              {p.highlights && (
                <ul className="frame__highlights">
                  {p.highlights.map((h) => (
                    <li key={h}><FiCheck /> {h}</li>
                  ))}
                </ul>
              )}
              <ul className="project__tech">
                {p.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm frame__link">
                  View project <FiArrowUpRight />
                </a>
              )}
            </div>
            <Screen tag={p.tag} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Projects() {
  const featured = profile.projects.filter((p) => p.featured);
  const others = profile.projects.filter((p) => !p.featured);
  const categories = ["All", ...new Set(others.map((p) => p.category).filter(Boolean))];
  const [filter, setFilter] = useState("All");

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">Projects</span>
          <h2 className="section__title">Things I've built</h2>
          <p className="section__sub">
            Complete business applications, from storefront to back office — plus the platform work behind them.
          </p>
        </header>

        <FeatureStack items={featured} />

        <div className="more-projects">
          <div className="more-projects__head" data-reveal>
            <h3>More work</h3>
            <div className="tabs" role="tablist">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  className={filter === c ? "is-active" : ""}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {others.map((p, i) => {
              const Tag = p.link ? "a" : "article";
              const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noreferrer" } : {};
              const hidden = filter !== "All" && p.category !== filter;
              return (
                <Tag
                  key={p.title}
                  className={`card project ${hidden ? "is-filtered" : ""}`}
                  data-reveal="zoom"
                  style={{ "--d": `${(i % 3) * 90}ms` }}
                  {...linkProps}
                >
                  <div className="project__top">
                    <span className="info-card__icon"><FiFolder /></span>
                    <span className="project__tag">{p.tag}</span>
                  </div>
                  <h3 className="project__title">
                    {p.title}
                    {p.link && <FiArrowUpRight className="project__arrow" />}
                  </h3>
                  <p className="muted">{p.description}</p>
                  <ul className="project__tech">
                    {p.tech.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;

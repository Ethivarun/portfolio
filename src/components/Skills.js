import React from "react";
import { FiMonitor, FiServer, FiLayers, FiTool } from "react-icons/fi";
import { profile } from "../data/profile";

const ICONS = { Frontend: FiMonitor, Backend: FiServer, Platforms: FiLayers, Tools: FiTool };

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">Skills</span>
          <h2 className="section__title">My tech stack</h2>
        </header>

        <div className="skills-grid">
          {profile.skills.map(({ title, items }, i) => {
            const Icon = ICONS[title] || FiLayers;
            return (
              <div key={title} className="card skill-card" data-reveal="zoom" style={{ "--d": `${(i % 2) * 120}ms` }}>
                <div className="skill-card__head">
                  <span className="info-card__icon"><Icon /></span>
                  <h3>{title}</h3>
                </div>
                <div className="chips">
                  {items.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;

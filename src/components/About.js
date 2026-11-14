import React from "react";
import { FiBookOpen, FiAward } from "react-icons/fi";
import { profile } from "../data/profile";

function About() {
  const { education } = profile;

  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">About</span>
          <h2 className="section__title">A developer who cares about the details</h2>
        </header>

        <div className="bento">
          <div className="card bento__main" data-reveal="left">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="bento__stats">
            {profile.stats.map((s, i) => (
              <div key={s.label} className="card stat" data-reveal="right" style={{ "--d": `${i * 110}ms` }}>
                <span className="stat__value gradient-text">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="card info-card" data-reveal="blur">
            <span className="info-card__icon"><FiBookOpen /></span>
            <div>
              <h3>{education.degree}</h3>
              <p className="muted">{education.school}</p>
              <p className="info-card__meta">
                <span>{education.period}</span>
                {education.cgpa && <span>CGPA {education.cgpa}</span>}
              </p>
            </div>
          </div>

          <div className="card info-card" data-reveal="blur" style={{ "--d": "120ms" }}>
            <span className="info-card__icon"><FiAward /></span>
            <div>
              <h3>Certifications</h3>
              <ul className="plain-list">
                {profile.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

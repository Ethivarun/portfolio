import React from "react";
import { profile } from "../data/profile";

function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <header className="section__head" data-reveal>
          <span className="eyebrow">Experience</span>
          <h2 className="section__title">Where I've been working</h2>
        </header>

        <ol className="timeline">
          {profile.experience.map((job, i) => (
            <li key={job.role} className="timeline__item" data-reveal="right" style={{ "--d": `${i * 120}ms` }}>
              <span className="timeline__dot" aria-hidden="true" />
              <div className="card timeline__card">
                <div className="timeline__top">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="muted">{job.company}</p>
                  </div>
                  <span className="chip">{job.period}</span>
                </div>
                <ul className="check-list">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;

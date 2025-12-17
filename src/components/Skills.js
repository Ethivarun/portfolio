import React from "react";

const SKILLS = [
  {
    key: "frontend",
    title: "Frontend",
    items: ["React", "HTML", "CSS", "JavaScript", "Mantine UI", "Bootstrap", "Docusaurus"],
  },
  {
    key: "backend",
    title: "Backend",
    items: ["Node.js", "REST APIs", "PostgREST", "RESTHeart", "MongoDB"],
  },
  {
    key: "platforms",
    title: "Platforms",
    items: ["Form.io", "Activepieces", "Keycloak"],
  },
  {
    key: "tools",
    title: "Tools",
    items: ["GitHub", "VS Code"],
  },
];

function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Tech Stack</h2>

      <div className="skills-grid">
        {SKILLS.map(({ key, title, items }) => (
          <div key={key} className="skill-category">
            <h3 className={`skill-heading ${key}`}>{title}</h3>

            <div className="skills-list">
              {items.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;

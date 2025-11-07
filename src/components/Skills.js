import React from "react";

function Skills() {
  const skills = {
  frontend: ["React", "HTML", "CSS", "JavaScript", "Mantine UI", "Bootstrap", "Docusaurus"],
  backend: ["Node.js", "REST APIs", "PostgREST", "RESTHeart", "MongoDB"],
  platforms: ["Form.io", "Activepieces", "Keycloak"],
  tools: ["GitHub", "VS Code"]
};


  return (
    <section id="skills" className="skills">
      <h2>Tech Stack</h2>
      <div className="skills-list">
        {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="skill-category">
  <h3 className={`skill-heading ${category}`}>
    {category === "frontend" && "💻 Frontend"}
    {category === "backend" && "⚙️ Backend"}
    {category === "platforms" && "☁️ Platforms"}
    {category === "tools" && "🧰 Tools"}
  </h3>
  <div className="skills-list">
    {items.map((skill, i) => (
      <span key={i} className="skill-badge">{skill}</span>
    ))}
  </div>
</div>

      ))}
      </div>
    </section>
  );
}

export default Skills;

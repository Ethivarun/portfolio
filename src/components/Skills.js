import React from "react";

function Skills() {
  const skills = ["React", "JavaScript", "Node.js", "MongoDB", "HTML", "CSS"];

  return (
    <section id="skills" className="skills">
      <h2>Tech Stack</h2>
      <div className="skills-list">
        {skills.map((skill, i) => (
          <span key={i} className="skill-badge">{skill}</span>
        ))}
      </div>
    </section>
  );
}

export default Skills;

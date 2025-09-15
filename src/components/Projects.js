import React from "react";

function Projects() {
  const projectList = [
    {
      title: "Portfolio Website",
      description: "A futuristic personal portfolio built with React.",
      tech: "React, CSS",
      link: "https://github.com/yourusername/portfolio"
    },
    {
      title: "E-commerce Store",
      description: "Full-stack e-commerce store with cart and checkout.",
      tech: "React, Node.js, MongoDB",
      link: "https://github.com/yourusername/ecommerce"
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projectList.map((proj, index) => (
          <div key={index} className="project-card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <span className="tech">{proj.tech}</span>
            <a href={proj.link} target="_blank" rel="noreferrer">View Code</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

import React from "react";

function Projects() {
  const projectList = [
    {
      title: "Authentication System with Keycloak",
      description:
        "Implemented single sign-on and token validation across multiple micro frontends using Keycloak.",
      tech: "Keycloak, React, Node.js, REST APIs",
      link: "#"
    }, 
    {
      title: "Activepieces Workflow Automation",
      description:
        "Integrated Activepieces flows for automating form submissions, OTP verification, and data storage.",
      tech: "Activepieces, MongoDB, APIs",
      link: "#"
    },
    {
      title: "Documentation Portal with Docusaurus",
      description:
        "Created a professional developer documentation site for the app using Docusaurus. It includes setup guides, API references, and architecture overviews for easy onboarding.",
      tech: "Docusaurus, React, Markdown, GitHub Pages",
      link: "#"
    },
    {
      title: "Form.io Custom Components",
      description:
        "Developed custom Form.io components like data source tables, logo uploader, and progress bar wizard.",
      tech: "React, Form.io, Mantine UI, Axios",
      link: "#"
    },
    {
      title: "Responsive Portfolio Website",
      description:
        "My personal portfolio built with React, showcasing my learning journey and design skills.",
      tech: "React, HTML, CSS, JavaScript",
      link: "#"
    },
  
    {
      title: "Clinic Dashboard (Work in Progress)",
      description:
        "A multi-tab React dashboard with calendar, doctor management, and support modules.",
      tech: "React, Bootstrap, React Calendar",
      link: "#"
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
            {proj.link !== "#" && (
              <a href={proj.link} target="_blank" rel="noreferrer">
                View Code
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

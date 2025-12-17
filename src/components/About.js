import React from "react";

function About() {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>

      <div className="about-container">
        {/* Profile */}
        <div className="about-box">
          <h3>Profile</h3>
          <p>
            I am a <strong>Full Stack Developer</strong> with hands-on experience
            building modern, scalable web applications. I enjoy solving
            real-world problems through clean, maintainable code and thoughtful
            system design.
          </p>
          <p>
            My professional journey includes a <strong>3-month internship</strong>{" "}
            that transitioned into a <strong>full-time role</strong>, giving me
            practical exposure to production systems and collaborative
            development environments.
          </p>
        </div>

        {/* Experience */}
        <div className="about-box">
          <h3>Experience & Focus</h3>
          <p>
            I primarily work with <strong>React</strong> on the frontend and
            backend technologies such as <strong>Node.js</strong>,{" "}
            <strong>REST APIs</strong>, and authentication systems like{" "}
            <strong>Keycloak</strong>.
          </p>
          <p>
            I focus on building applications that are{" "}
            <em>reliable, user-friendly, and easy to maintain</em>.
          </p>
        </div>

        {/* Learning */}
        <div className="about-box">
          <h3>Learning & Growth</h3>
          <ul>
            <li>Built multiple full-stack projects using React and backend APIs.</li>
            <li>Developed custom Form.io components and workflow automations.</li>
            <li>Maintained technical documentation using Docusaurus.</li>
            <li>Continuously improving authentication and backend architecture skills.</li>
          </ul>
        </div>

        {/* Education */}
        <div className="about-box">
          <h3>Education</h3>
          <ul>
            <li>
              <strong>
                Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology
              </strong>
              <p>B.Tech — Electronics & Communication Engineering</p>
              <p><strong>CGPA:</strong> 9.0</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;

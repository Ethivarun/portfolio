import React from "react";

function About() {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">About Me</h2>
      <div className="about-container">
        {/* Story Box */}
        <div className="about-box">
          <h3>My Story</h3>
          <p>
            I’m a <strong>passionate Full Stack Developer</strong> with hands-on
            experience in building modern web applications. My journey began
            during college, where I discovered the power of programming to solve
            real-world problems.
          </p>
          <p>
            I have professional experience through a{" "}
            <strong>3-month internship</strong>, which later converted into a{" "}
            <strong>full-time role</strong>, giving me over{" "}
            <strong>6 months of industry experience</strong>. During this time, I
            worked with <strong>React.js</strong> and <strong>Python</strong>,
            focusing on creating applications that are both{" "}
            <em>functional and user-friendly</em>.
          </p>
        </div>

        {/* Skills & Beliefs Box */}
        <div className="about-box">
          <h3>What I Do</h3>
          <p>
            I believe in writing <strong>clean, maintainable code</strong> and
            constantly improving my skills by exploring new technologies and
            frameworks.
          </p>
          <p>
            When I’m not coding, I enjoy learning new tools, experimenting with
            side projects, and expanding my technical expertise.
          </p>
        </div>

        {/* Certifications Box */}
        <div className="about-box">
          <h3>Learning & Achievements</h3>
          <ul>
            <li>Completed multiple React and Full Stack projects as self-learning practice.</li>
            <li>Actively building custom Form.io components and workflow automation tools.</li>
            <li>Documented projects and APIs using Docusaurus and GitHub Pages.</li>
            <li>Continuously improving backend and authentication skills with Keycloak and REST APIs.</li>
          </ul>
        </div>

        <div className="about-box">
          <h3>Education</h3>
          <ul>
            <li>
              <strong>
                Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology
              </strong>
              <p>Bachelor of Technology in Electronics and Communication Engineering</p>
              <p><strong>CGPA:</strong> 9.0</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;

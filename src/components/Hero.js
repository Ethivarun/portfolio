import React from "react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link } from "react-scroll";

function App() {
  // Ref for typed.js
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Designer", "Developer"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">Varun</div>
        <nav>
          <Link to="home" smooth={true} duration={600} spy={true} activeClass="active-link">
            Home
          </Link>
          <Link to="about" smooth={true} duration={600} spy={true} activeClass="active-link">
            About
          </Link>
          <Link to="skills" smooth={true} duration={600} spy={true} activeClass="active-link" >
            skills
          </Link>
          <Link to="contact" smooth={true} duration={600} spy={true} activeClass="active-link">
            Contact
          </Link>
        </nav>
        <button className="resume-btn">Download Resume ⬇</button>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-text">
          <span className="name-tag">Madaka Ethivarun</span>
          <h1>
            I'm <span ref={typedElement}></span>
          </h1>
          <p>
            A passionate Full Stack Developer with a deep understanding of
            front-end technologies, dedicated to creating functional and elegant
            digital solutions.
          </p>
          <div className="hero-buttons">
            <button className="hire-btn">Hire Me</button>
            <button className="view-btn">View Resume</button>
          </div>
        </div>
        <div className="hero-photo">
          <img
            src="testing.jpg"
            alt="varun"
          />
        </div>
      </section>
    </div>
  );
}

export default App;

import React from "react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link } from "react-scroll";

function App() {
  // Ref for typed.js
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [ "Full Stack Developer","API Developer","Software Engineer"], //Developer | Designer | Engineer | Creator
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
            Projects
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
           I’m a Passionate Full Stack Developer with expertise in modern web technologies. I create beautiful, functional, and scalable digital solutions that deliver real value. With a problem-solving mindset.
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

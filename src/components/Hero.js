import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link, scroller } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa"; // <-- for hamburger and close icon

function App() {
  const typedElement = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false); // state to toggle mobile menu

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Full Stack Developer", "API Developer", "Software Engineer"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  // Function to close menu when link is clicked
  const handleLinkClick = (section) => {
    scroller.scrollTo(section, { smooth: true, duration: 600 });
    setMenuOpen(false); // close dropdown
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo">Varun</div>

        {/* Desktop Menu */}
        <nav className="nav-links">
          <Link to="home" smooth duration={600} spy activeClass="active-link">Home</Link>
          <Link to="about" smooth duration={600} spy activeClass="active-link">About</Link>
          <Link to="projects" smooth duration={600} spy activeClass="active-link">Projects</Link>
          <Link to="contact" smooth duration={600} spy activeClass="active-link">Contact</Link>
        </nav>

        {/* Hamburger for Mobile */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </div>

        {/* Resume button (visible only on desktop) */}
        <button
          className="resume-btn"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/resume1.pdf";
            link.download = "Varun_Resume.pdf";
            link.click();
          }}
        >
          Download Resume ⬇
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            <Link onClick={() => handleLinkClick("home")}>Home</Link>
            <Link onClick={() => handleLinkClick("about")}>About</Link>
            <Link onClick={() => handleLinkClick("projects")}>Projects</Link>
            <Link onClick={() => handleLinkClick("contact")}>Contact</Link>
            <button
              className="mobile-resume-btn"
              onClick={() => window.open("/resume1.pdf", "_blank")}
            >
              View Resume
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-text">
          <span className="name-tag">Madaka Ethivarun</span>
          <h1>
            I'm <span ref={typedElement}></span>
          </h1>
          <p>
            I’m a Passionate Full Stack Developer with expertise in modern web
            technologies.I create beautiful, functional, and scalable digital solutions that deliver real value.
          </p>
          <div className="hero-buttons">
            <button
              className="hire-btn"
              onClick={() => scroller.scrollTo("contact", { smooth: true, duration: 600 })}
            >
              Hire Me
            </button>
            <button
              className="view-btn"
              onClick={() => window.open("/resume1.pdf", "_blank")}
            >
              View Resume
            </button>
          </div>
        </div>
        <div className="hero-photo">
          <img src="testing.jpg" alt="varun" />
        </div>
      </section>
    </div>
  );
}

export default App;

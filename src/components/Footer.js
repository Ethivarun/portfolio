import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show the button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Varun Madaka. All rights reserved.</p>

      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
}

export default Footer;

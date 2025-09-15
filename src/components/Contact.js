import React from "react";

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Get in Touch</h2>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
      <div className="socials">
        <a href="https://github.com/yourusername">GitHub</a>
        <a href="https://linkedin.com/in/yourusername">LinkedIn</a>
      </div>
    </section>
  );
}
 
export default Contact;

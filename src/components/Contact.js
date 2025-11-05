import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(
      "https://cloud.activepieces.com/api/v1/webhooks/bCNwoq3UZ3ZLS3Sk0ZGME", // 🟩 your webhook URL
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) throw new Error("Failed to send message");

    alert(" Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Something went wrong. Please try again later.");
  }

  setLoading(false);
};


  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get in Touch</h2>
      <p className="contact-intro">
        Have a project idea or just want to say hello? Drop me a message below 👇
      </p>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Your Message</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            <FaEnvelope />{" "}
            <a href="mailto:yourname@example.com">yourname@example.com</a>
          </p>
          <p>
            <FaPhone />{" "}
            <a href="tel:+919876543210">+91 98765 43210</a>
          </p>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            </div>
            <div className="social-links">
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

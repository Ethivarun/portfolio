import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import "./ChatbotPopup.css";

function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m Varun’s Resume Bot. Ask me about his skills, experience, or projects!" },
  ]);
  const [input, setInput] = useState("");

  const resumeData = {
    name: "Varun Madaka",
    title: "Frontend Developer",
    about:
      "I'm a passionate frontend developer experienced in React, Form.io, Keycloak, and Activepieces automation workflows.",
    skills: [
      "React", "JavaScript", "HTML", "CSS", "Bootstrap", "Mantine UI", "Form.io", "Keycloak", "Activepieces"
    ],
    experience:
      "I've built full-stack dashboards, SSO integrations using Keycloak, and dynamic form builders using Form.io.",
    projects:
      "Projects include: Clinic Dashboard, Custom Form.io Components, Keycloak-based Authentication System.",
    contact: "You can reach me at yourname@gmail.com.",
  };

  const getBotReply = (question) => {
    const q = question.toLowerCase();

    if (q.includes("name") || q.includes("who are you")) return `I'm ${resumeData.name}, a ${resumeData.title}.`;
    if (q.includes("about") || q.includes("yourself")) return resumeData.about;
    if (q.includes("skill") || q.includes("technology") || q.includes("tech")) return `My skills: ${resumeData.skills.join(", ")}.`;
    if (q.includes("experience") || q.includes("work")) return resumeData.experience;
    if (q.includes("project")) return resumeData.projects;
    if (q.includes("contact") || q.includes("email")) return resumeData.contact;

    return "I’m not sure about that. Try asking about my skills, experience, or projects!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botReply = { sender: "bot", text: getBotReply(input) };
    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        className={`chat-icon ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaComments size={26} />}

      </div>

      {/* Popup Window */}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h4>💬 Varun’s Resume Bot</h4>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about Varun..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatbotPopup;

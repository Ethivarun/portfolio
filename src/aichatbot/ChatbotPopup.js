import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import "./ChatbotPopup.css";

function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Varun’s Resume Bot. Ask me about his skills, experience, education, or projects!",
    },
  ]);
  const [input, setInput] = useState("");

  // ---------------- UPDATED RESUME DATA ----------------
  const resumeData = {
    name: "Madaka Ethivarun",
    title: "Associate Software Trainee (Frontend & Low-Code Developer)",
    about:
      "I am a B.Tech ECE graduate skilled in AI-based IoT systems, low-code development, automation workflows, and frontend engineering. I work with JavaScript, Form.io, Python, SQL, Azure, and workflow automation.",
    skills: [
      "JavaScript",
      "Python",
      "SQL",
      "Azure",
      "Form.io",
      "HTML",
      "CSS",
      "JSON",
      "Low-Code Development",
      "Workflow Automation",
      "AI Chatbot Analysis"
    ],
    experience:
      "Currently working as an Associate Software Trainee at Stride Future Technology. I develop frontend components using JavaScript, Form.io, HTML/CSS, build low-code applications, automate workflows, improve AI chatbot performance, and perform feature testing.",
    education:
      "Bachelor of Technology in Electronics and Communication Engineering (2020–2024) with CGPA 8.2 from Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology.",
    projects:
      "River Cleaning Boat Prototype — a Bluetooth-controlled, treadmill-based waste collecting boat designed to reduce plastic pollution in lakes and rivers.",
    certifications:
      "Atlassian Jira Fundamentals, Python Programming (Offline Course).",
    contact: "You can reach me at: varun.madaka@gmail.com or phone: +91 7330920535.",
  };

  // ---------------- BOT REPLY LOGIC ----------------
 const getBotReply = (question) => {
  const q = question.toLowerCase();

  // Helper for random replies
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ----- GREETINGS -----
  if (["hi", "hello", "hey", "hii", "yo"].some((g) => q.includes(g))) {
    return pick([
      "Hi there! 👋 What would you like to know about Varun?",
      "Hello! 😊 You can ask me about Varun’s skills, experience, or projects.",
      "Hey! 😄 How can I help you explore Varun’s resume?",
    ]);
  }

  // ----- SMALL TALK -----
  if (q.includes("how are you")) {
    return pick([
      "I'm doing great! 😄 Ready to tell you about Varun.",
      "Feeling awesome and ready to chat! 🚀",
      "I'm good! Thanks for asking. Want to know about Varun’s skills?",
    ]);
  }

  if (q.includes("what's up") || q.includes("whats up")) {
    return "Just here helping you explore Varun’s profile! 😊";
  }

  // ----- NAME -----
  if (q.includes("your name") || q.includes("who are you")) {
    return pick([
      `I'm Varun’s Resume Bot 🤖.`,
      `I'm an AI bot created to share info about ${resumeData.name}.`,
    ]);
  }

  // ----- ABOUT -----
  if (q.includes("about") || q.includes("summary")) {
    return resumeData.about;
  }

  // ----- SKILLS -----
  if (q.includes("skill") || q.includes("tech") || q.includes("technology")) {
    return pick([
      `Here are Varun’s skills: ${resumeData.skills.join(", ")}.`,
      `Varun works with technologies like ${resumeData.skills.join(", ")}.`,
      `Main skills: ${resumeData.skills.join(", ")}.`,
    ]);
  }

  // ----- EXPERIENCE -----
  if (q.includes("experience") || q.includes("work")) {
    return resumeData.experience;
  }

  // ----- EDUCATION -----
  if (q.includes("education") || q.includes("study") || q.includes("college")) {
    return resumeData.education;
  }

  // ----- PROJECTS -----
  if (q.includes("project")) {
    return resumeData.projects;
  }

  // ----- CERTIFICATIONS -----
  if (q.includes("certificate") || q.includes("certification")) {
    return resumeData.certifications;
  }

  // ----- CONTACT -----
  if (q.includes("email") || q.includes("contact") || q.includes("phone")) {
    return resumeData.contact;
  }

  // ------ NATURAL FALLBACK ------
  return pick([
    "Hmm, I'm not sure about that 🤔. Try asking about Varun’s skills or experience!",
    "I didn’t understand that, but I can tell you about Varun’s projects, skills, or education 😊",
    "Good question! But I can answer best if you ask about Varun's resume details 📄",
  ]);
};


  // ---------------- SEND MESSAGE ----------------
  const handleSend = () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setMessages((m) => [...m, userMsg]);

  const reply = getBotReply(input);

  // typing delay
  setTimeout(() => {
  const botMessage = { sender: "bot", text: reply };
  setMessages((m) => [...m, botMessage]);
  // Make bot speak
  // speak(reply);
  }, 600 + Math.random() * 400);


  setInput("");
};

const startVoiceInput = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice recognition not supported in your browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  setIsRecording(true);
  recognition.start();

  recognition.onresult = (event) => {
    const speechText = event.results[0][0].transcript;
    setInput(speechText);
    setIsRecording(false);
  };

  recognition.onerror = () => {
    setIsRecording(false);
  };
};

// const speak = (text) => {
//   const utter = new SpeechSynthesisUtterance(text);
//   utter.rate = 1;
//   utter.pitch = 1;
//   window.speechSynthesis.speak(utter);
// };


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
          <button className="mic-btn" onClick={startVoiceInput}>
            {isRecording ? "🎙️ Listening..." : "🎤"}
          </button>
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

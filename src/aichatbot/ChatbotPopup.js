import React, { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { profile } from "../data/profile";
import "./ChatbotPopup.css";

const SUGGESTIONS = ["Skills", "Experience", "Projects", "Education", "Contact"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
// whole-word match, so "hi" doesn't match "hire" or "this"
const has = (q, words) => words.some((w) => new RegExp(`\\b${w}`, "i").test(q));

function getBotReply(question) {
  const q = question.toLowerCase();
  const p = profile;

  if (has(q, ["hire", "should we"]))
    return `${p.shortName} would be a great fit if you need a motivated developer who blends frontend engineering with APIs, auth and workflow automation.`;
  if (has(q, ["skill", "tech", "stack", "language"]))
    return `${p.shortName}'s stack: ${p.skills.map((s) => `${s.title} — ${s.items.join(", ")}`).join(". ")}.`;
  if (has(q, ["experience", "work", "job", "company"]))
    return p.experience
      .map((e) => `${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`)
      .join("\n\n");
  if (has(q, ["education", "college", "degree", "cgpa", "study"]))
    return `${p.education.degree}, ${p.education.school} (${p.education.period})${p.education.cgpa ? `, CGPA ${p.education.cgpa}` : ""}.`;
  if (has(q, ["project", "built", "portfolio"]))
    return p.projects.map((x) => `• ${x.title} — ${x.description}`).join("\n");
  if (has(q, ["certif"])) return `Certifications: ${p.certifications.join(", ")}.`;
  if (has(q, ["contact", "email", "phone", "reach", "call"]))
    return `You can reach ${p.shortName} at ${p.email} or ${p.phone}.`;
  if (has(q, ["about", "summary", "profile", "yourself"])) return p.about.join(" ");
  if (has(q, ["strength"]))
    return `${p.shortName}'s strengths: quick learning, problem-solving, clean code, and comfort across frontend, backend and low-code platforms.`;
  if (has(q, ["weakness"]))
    return `${p.shortName} is actively levelling up in performance optimisation and advanced system design.`;
  if (has(q, ["goal", "future"]))
    return `${p.shortName} aims to grow as a full-stack engineer, building scalable applications and AI-assisted automation.`;
  if (has(q, ["soft skill", "communication", "team"]))
    return `${p.shortName} is a strong team player who communicates clearly and adapts quickly in fast-paced environments.`;
  if (has(q, ["available", "notice", "join"]))
    return `${p.shortName} is open to new opportunities and happy to discuss availability.`;
  if (has(q, ["location", "relocat", "remote", "where"]))
    return `${p.shortName} is based in ${p.location} and open to relocation or remote roles.`;
  if (has(q, ["who are you", "your name"]))
    return `I'm ${p.shortName}'s resume assistant — ask me about skills, experience, projects or how to get in touch.`;
  if (has(q, ["how are you"])) return pick(["Doing great — ready to help!", "All good! What would you like to know?"]);
  if (has(q, ["thank"])) return pick(["You're welcome!", "Happy to help!", "Anytime!"]);
  if (has(q, ["joke"])) return "Why do developers love JavaScript? Because it keeps them event-ful.";
  if (/^\s*(hi+|hello|hey|yo)\b/i.test(q))
    return pick([
      "Hi there! What would you like to know about Varun?",
      "Hello! Ask me about Varun's skills, projects or experience.",
    ]);

  return pick([
    "I don't have that exact detail, but try asking about skills, experience, projects, education or contact.",
    `Good question! For specifics, you can email ${p.shortName} directly at ${p.email}.`,
  ]);
}

function ChatbotPopup() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi! I'm ${profile.shortName}'s resume assistant. Ask me about his skills, experience, education or projects.`,
    },
  ]);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text) => {
    const msg = text.trim();
    if (!msg || typing) return;
    setMessages((m) => [...m, { sender: "user", text: msg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { sender: "bot", text: getBotReply(msg) }]);
      setTyping(false);
    }, 500 + Math.random() * 400);
  };

  return (
    <>
      <button
        className={`chat-fab ${open ? "is-open" : ""}`}
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>

      {open && (
        <div className="chat" role="dialog" aria-label="Resume assistant">
          <div className="chat__head">
            <span className="chat__avatar">{profile.shortName[0]}</span>
            <div>
              <strong>{profile.shortName}'s Assistant</strong>
              <span className="chat__status">Online · replies instantly</span>
            </div>
          </div>

          <div className="chat__body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat__msg chat__msg--${m.sender}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="chat__msg chat__msg--bot chat__typing" aria-label="Typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className="chat__suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <form
            className="chat__input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={`Ask about ${profile.shortName}…`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatbotPopup;

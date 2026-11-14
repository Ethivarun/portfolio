import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatbotPopup from "./aichatbot/ChatbotPopup";
import useReveal from "./hooks/useReveal";
import { Intro, ScrollProgress } from "./components/Cinematic";

import "./App.css";

function App() {
  useReveal();

  return (
    <>
      <Intro />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatbotPopup />
    </>
  );
}

export default App;

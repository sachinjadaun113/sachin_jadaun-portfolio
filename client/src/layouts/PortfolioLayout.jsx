import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Documents from "../components/Documents";
import Contact from "../components/Contact";
import Rating from "../components/Rating";
import Footer from "../components/Footer";
import Resume from "../components/Resume";

function PortfolioLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <div
      className="
        min-h-screen
        bg-white
        w-full
        overflow-x-hidden
        text-gray-900
        transition-colors
        duration-300

        dark:bg-[#090909]
        dark:text-white
      "
    >
      {/* =========================
          NAVBAR
          ========================= */}
      <Navbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* =========================
          SIDEBAR
          ========================= */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* =========================
          MAIN CONTENT
          ========================= */}
      <main
        className={`
          min-h-screen
          pt-[73px]
          transition-all
          duration-300

          ${
            sidebarOpen
              ? "lg:ml-64"
              : "ml-0"
          }
        `}
      >
        <Hero />

        <About />

        <Skills />

        <Projects />

        <Experience />

        <Education />

        <Documents />

        <Resume />

        <Contact />

        <Rating />

        <Footer />
      </main>
    </div>
  );
}

export default PortfolioLayout;
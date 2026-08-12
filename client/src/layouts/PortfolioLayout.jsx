import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

function PortfolioLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-[#090909] dark:text-white">

      <Navbar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
      />

      <main
        className={`min-h-screen pt-[73px] transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >

        {/* HOME */}
       <Hero />
       
       <Projects />
      </main>

    </div>
  );
}

export default PortfolioLayout;
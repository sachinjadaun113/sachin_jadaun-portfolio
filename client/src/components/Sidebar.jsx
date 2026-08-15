import { useNavigate } from "react-router-dom";

const navigationItems = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "about", label: "About", icon: "◉" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "documents", label: "Achievements", icon: "🏆" },
  { id: "documents", label: "Certificates", icon: "📜" },
  { id: "resume", label: "Resume / CV", icon: "📄" },
  { id: "rating", label: "Reviews", icon: "⭐" },
  { id: "contact", label: "Contact", icon: "✉" },
];

function Sidebar({ sidebarOpen, onClose }) {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(
        `Section with id "${sectionId}" was not found.`
      );
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    onClose();
  };

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <>
      {/* ================================
          MOBILE OVERLAY
          ================================ */}
      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-[2px]
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      {/* ================================
          SIDEBAR
          ================================ */}
      <aside
        className={`
          fixed
          left-0
          top-[73px]
          z-50
          h-[calc(100vh-73px)]
          w-64

          border-r
          border-[#DDD8CC]

          bg-[#F8F6F0]

          shadow-xl

          transition-transform
          duration-300
          ease-in-out

          dark:border-[#2D2B27]
          dark:bg-[#151412]
          dark:shadow-black/40

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">

          {/* ================================
              HEADER
              ================================ */}
          <div
            className="
              flex
              h-16
              shrink-0
              items-center
              justify-between

              border-b
              border-[#DDD8CC]

              px-5

              dark:border-[#2D2B27]
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#927016]

                  dark:text-[#D6B84C]
                "
              >
                Portfolio
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  text-[#25231F]

                  dark:text-[#F1EFE8]
                "
              >
                Navigation
              </p>
            </div>
          </div>

          {/* ================================
              NAVIGATION
              ================================ */}
          <nav
            className="
              flex-1
              overflow-y-auto

              px-3
              py-4
            "
          >
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="
                    group
                    flex
                    min-h-11
                    w-full
                    items-center

                    rounded-xl

                    px-3
                    py-2.5

                    text-left

                    text-[#666158]

                    transition-all
                    duration-200

                    hover:bg-[#ECE7DC]
                    hover:text-[#806510]

                    dark:text-[#A6A198]
                    dark:hover:bg-[#24221E]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center

                      rounded-lg

                      bg-[#EDE8DC]

                      text-sm

                      transition-all
                      duration-200

                      group-hover:scale-105
                      group-hover:bg-[#E5D9B8]

                      dark:bg-[#211F1B]
                      dark:group-hover:bg-[#302B20]
                    "
                  >
                    {item.icon}
                  </span>

                  <span
                    className="
                      ml-3
                      truncate
                      text-sm
                      font-medium
                    "
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          {/* ================================
              OWNER LOGIN
              ================================ */}
          <div
            className="
              shrink-0

              border-t
              border-[#DDD8CC]

              p-4

              dark:border-[#2D2B27]
            "
          >
            <button
              type="button"
              onClick={handleLogin}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                border
                border-[#B18A22]/30

                bg-[#EFE7D3]

                px-4
                py-3

                text-sm
                font-semibold
                text-[#806510]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-[#A37D1D]/50
                hover:bg-[#E7D9B8]
                hover:shadow-md

                dark:border-[#D6B84C]/25
                dark:bg-[#29251D]
                dark:text-[#D6B84C]

                dark:hover:bg-[#332D20]
              "
            >
              <span>🔐</span>
              <span>Owner Login</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;
const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: "⌂",
  },
  {
    id: "about",
    label: "About",
    icon: "◉",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "⚡",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "🚀",
  },
  {
    id: "education",
    label: "Education",
    icon: "🎓",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "🏆",
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "📜",
  },
  {
    id: "resume",
    label: "Resume / CV",
    icon: "📄",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "⭐",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "✉",
  },
];

function Sidebar({ sidebarOpen }) {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside
      className={`
        fixed
        left-0
        top-[73px]
        z-40
        h-[calc(100vh-73px)]
        w-64
        border-r
        border-gray-200
        bg-white
        shadow-xl
        transition-transform
        duration-300
        dark:border-white/10
        dark:bg-[#0d0d0d]
        dark:shadow-black/40
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4">

        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className="
              group
              flex
              h-12
              w-full
              items-center
              rounded-xl
              px-4
              text-left
              text-gray-600
              transition-all
              duration-200
              hover:bg-amber-50
              hover:text-amber-600
              dark:text-gray-300
              dark:hover:bg-amber-400/10
              dark:hover:text-amber-300
            "
          >
            <span
              className="
                flex
                w-7
                justify-center
                text-lg
                transition-transform
                duration-200
                group-hover:scale-110
              "
            >
              {item.icon}
            </span>

            <span className="ml-3 whitespace-nowrap text-sm font-medium">
              {item.label}
            </span>
          </button>
        ))}

      </nav>
    </aside>
  );
}

export default Sidebar;
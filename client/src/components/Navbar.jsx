import { useTheme } from "../context/ThemeContext";

function Navbar({ sidebarOpen, toggleSidebar }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#090909]/90">

      <div className="mx-auto flex h-[73px] items-center justify-between px-4 sm:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-gray-800 transition-all duration-300 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-amber-400/60 dark:hover:bg-amber-400/10 dark:hover:text-amber-300"
            aria-label={
              sidebarOpen
                ? "Close navigation"
                : "Open navigation"
            }
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-600 p-[1px] shadow-lg shadow-amber-500/10">

              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-[#090909]">

                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-sm font-bold text-transparent">
                  SJ
                </span>

              </div>

            </div>

            <div className="hidden sm:block">

              <h1 className="text-base font-semibold tracking-wide text-gray-900 dark:text-white">
                Sachin Jadaun
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Software Developer
              </p>

            </div>

          </div>

        </div>

        {/* THEME */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-lg transition-all duration-300 hover:border-amber-500 hover:bg-amber-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/10"
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>

    </header>
  );
}

export default Navbar;
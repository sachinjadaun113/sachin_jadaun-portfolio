import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import api from "../services/api";

function Hero() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /*
  ============================================================
  SEARCHABLE PORTFOLIO SECTIONS
  ============================================================
  */

  const searchableSections = [
    {
      id: "home",
      title: "Home",
      keywords:
        "home Sachin Jadaun Sachin Kumar software developer full stack developer portfolio",
    },

    {
      id: "about",
      title: "About",
      keywords:
        "about Sachin Jadaun Sachin Kumar computer science engineering developer AKTU",
    },

    {
      id: "skills",
      title: "Skills",
      keywords:
        "skills Java JavaScript React Node.js Express MongoDB Spring Boot Spring Java backend frontend full stack HTML CSS Tailwind Git GitHub DSA",
    },

    {
      id: "experience",
      title: "Experience",
      keywords:
        "experience internship software developer backend developer frontend developer full stack Java Node React Spring Boot",
    },

    {
      id: "projects",
      title: "Projects",
      keywords:
        "projects portfolio Wonderlust Student Management System ecommerce web application full stack React Java Spring Boot Node Express MongoDB",
    },

    {
      id: "education",
      title: "Education",
      keywords:
        "education B.Tech Computer Science Engineering AKTU Aligarh College of Engineering and Technology degree graduation",
    },

    {
      id: "documents",
      title: "Achievements & Certificates",
      keywords:
        "achievement achievements certificates certification certificate Apna College DSA Web Development credentials awards accomplishments",
    },

    {
      id: "resume",
      title: "Resume / CV",
      keywords:
        "resume CV curriculum vitae download resume download cv Sachin Jadaun software developer",
    },

    {
      id: "rating",
      title: "Reviews",
      keywords:
        "reviews review rating ratings feedback stars visitor feedback portfolio review",
    },

    {
      id: "contact",
      title: "Contact",
      keywords:
        "contact email message reach Sachin Jadaun contact me send message Gmail",
    },
  ];

  /*
  ============================================================
  FETCH PORTFOLIO
  ============================================================
  */

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");

        if (response.data.success) {
          setPortfolio(response.data.portfolio);
        } else {
          setError("Unable to load portfolio information.");
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        setError("Unable to load portfolio information.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  /*
  ============================================================
  SEARCH
  ============================================================
  */

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = searchableSections.filter((section) => {
      return (
        section.title.toLowerCase().includes(query) ||
        section.keywords.toLowerCase().includes(query)
      );
    });

    setSearchResults(results);
  }, [searchQuery]);

  /*
  ============================================================
  GO TO SECTION
  ============================================================
  */

  const goToSection = (sectionId) => {
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

    setSearchQuery("");
    setSearchResults([]);
  };

  /*
  ============================================================
  CLEAR SEARCH
  ============================================================
  */

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  /*
  ============================================================
  SEARCH BUTTON
  ============================================================
  */

  const handleSearchClick = () => {
    const searchInput = document.getElementById(
      "portfolio-search-input"
    );

    if (searchInput) {
      searchInput.focus();
    }
  };

  /*
  ============================================================
  LOADING
  ============================================================
  */

  if (loading) {
    return (
      <section
        id="home"
        className="
          flex
          min-h-[calc(100vh-73px)]
          items-center
          justify-center
          bg-[#F3F0E8]
          px-5
          dark:bg-[#10100F]
        "
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-9
              w-9
              animate-spin
              rounded-full
              border-2
              border-[#D8D1BF]
              border-t-[#B18A22]
              dark:border-[#292824]
              dark:border-t-[#D6B84C]
            "
          />

          <p
            className="
              text-sm
              text-[#777266]
              dark:text-[#A4A19A]
            "
          >
            Loading portfolio...
          </p>
        </div>
      </section>
    );
  }

  /*
  ============================================================
  ERROR
  ============================================================
  */

  if (error || !portfolio) {
    return (
      <section
        id="home"
        className="
          flex
          min-h-[calc(100vh-73px)]
          items-center
          justify-center
          bg-[#F3F0E8]
          px-5
          dark:bg-[#10100F]
        "
      >
        <p
          className="
            text-sm
            text-[#9B4038]
            dark:text-[#D06A60]
          "
        >
          {error || "Portfolio not found."}
        </p>
      </section>
    );
  }

  /*
  ============================================================
  MAIN HERO
  ============================================================
  */

  return (
    <section
      id="home"
      className="
        relative
        min-h-[calc(100vh-73px)]
        overflow-visible

        bg-[#F3F0E8]

        px-5
        py-8

        transition-colors
        duration-300

        sm:px-8
        sm:py-12

        lg:px-16
        lg:py-16

        dark:bg-[#10100F]
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
          ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-[#B18A22]/[0.07]
          blur-3xl

          dark:bg-[#D6B84C]/[0.035]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-80
          w-80
          rounded-full
          bg-[#8F3028]/[0.035]
          blur-3xl

          dark:bg-[#A83D34]/[0.025]
        "
      />

      {/* ======================================================
          MAIN CONTAINER
          ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-[calc(100vh-120px)]
          max-w-7xl
          items-center
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-8

            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-16
          "
        >
          {/* ==================================================
              PROFILE IMAGE
              ================================================== */}

          <div
            className="
              order-1
              flex
              justify-start

              lg:order-2
              lg:justify-end
            "
          >
            <div className="relative">
              {/* Image glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  scale-110
                  rounded-full
                  bg-[#B18A22]/[0.07]
                  blur-3xl

                  dark:bg-[#D6B84C]/[0.045]
                "
              />

              {/* Profile image */}

              <div
                className="
                  relative
                  h-28
                  w-28
                  overflow-hidden
                  rounded-full

                  border-2
                  border-[#B18A22]/50

                  bg-[#E7E2D5]

                  shadow-lg
                  shadow-black/[0.08]

                  sm:h-36
                  sm:w-36

                  lg:h-[350px]
                  lg:w-[350px]

                  dark:border-[#D6B84C]/55
                  dark:bg-[#1A1917]
                  dark:shadow-black/40
                "
              >
                {portfolio.profileImage ? (
                  <img
                    src={portfolio.profileImage}
                    alt={portfolio.fullName}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      px-5
                      text-center
                      text-xs
                      text-[#777266]

                      dark:text-[#8D8A82]
                    "
                  >
                    Profile image not available
                  </div>
                )}
              </div>

              {/* Gold ring */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-2
                  -top-2
                  h-7
                  w-7
                  rounded-full
                  border
                  border-[#B18A22]/40

                  dark:border-[#D6B84C]/40

                  sm:-right-3
                  sm:-top-3
                  sm:h-9
                  sm:w-9

                  lg:h-11
                  lg:w-11
                "
              />

              {/* Red ring */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-2
                  -left-2
                  h-5
                  w-5
                  rounded-full
                  border
                  border-[#8F3028]/30

                  dark:border-[#A83D34]/35

                  sm:h-7
                  sm:w-7
                "
              />
            </div>
          </div>

          {/* ==================================================
              CONTENT
              ================================================== */}

          <div
            className="
              order-2
              text-left

              lg:order-1
            "
          >
            {/* Developer label */}

            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2.5
                rounded-full

                border
                border-[#B18A22]/30

                bg-[#E9E4D7]

                px-3.5
                py-1.5

                dark:border-[#D6B84C]/25
                dark:bg-[#1B1916]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#A37D1D]

                  dark:bg-[#D6B84C]
                "
              />

              <span
                className="
                  text-[11px]
                  font-semibold
                  tracking-wide
                  text-[#80651A]

                  dark:text-[#D6B84C]
                "
              >
                Software Developer
              </span>
            </div>

            {/* Name */}

            <h1
              className="
                max-w-3xl

                text-4xl
                font-bold
                leading-[1.08]
                tracking-tight

                text-[#1C1B18]

                sm:text-5xl

                lg:text-6xl
                xl:text-7xl

                dark:text-[#F1EFE8]
              "
            >
              {portfolio.fullName}
            </h1>

            {/* Title */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-[2px]
                  w-7
                  rounded-full
                  bg-[#A37D1D]

                  sm:w-9

                  dark:bg-[#D6B84C]
                "
              />

              <h2
                className="
                  text-sm
                  font-medium
                  text-[#68645A]

                  sm:text-base

                  lg:text-lg

                  dark:text-[#B0ADA4]
                "
              >
                {portfolio.title}
              </h2>
            </div>

            {/* Bio */}

            <p
              className="
                mt-5
                max-w-2xl

                text-sm
                leading-6

                text-[#6E6A60]

                sm:text-base
                sm:leading-7

                lg:text-lg
                lg:leading-8

                dark:text-[#A6A39A]
              "
            >
              {portfolio.bio}
            </p>

            {/* ==================================================
                SEARCH
                ================================================== */}

            <div
              className="
                relative
                mt-7
                w-full
                max-w-xl

                sm:mt-8
              "
            >
              <div
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-full

                  border
                  border-[#B18A22]/35

                  bg-[#FAF8F2]

                  px-4
                  py-2.5

                  shadow-sm

                  transition-all
                  duration-300

                  focus-within:border-[#A37D1D]/65
                  focus-within:shadow-md
                  focus-within:shadow-[#B18A22]/10

                  dark:border-[#D6B84C]/30
                  dark:bg-[#181715]

                  dark:focus-within:border-[#D6B84C]/55
                "
              >
                {/* Search icon */}

                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    bg-[#B18A22]/10

                    text-[#80651A]

                    dark:bg-[#D6B84C]/10
                    dark:text-[#D6B84C]
                  "
                >
                  <Search
                    size={17}
                    strokeWidth={1.8}
                  />
                </span>

                {/* Input */}

                <input
                  id="portfolio-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  onFocus={handleSearchClick}
                  placeholder="Search portfolio..."
                  autoComplete="off"
                  className="
                    min-w-0
                    flex-1
                    bg-transparent

                    text-sm
                    font-medium

                    text-[#35322C]

                    outline-none

                    placeholder:text-[#89857B]

                    dark:text-[#F1EFE8]
                    dark:placeholder:text-[#77736A]
                  "
                />

                {/* Clear button */}

                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      text-[#77736A]

                      transition

                      hover:bg-[#E9E4D8]
                      hover:text-[#25231F]

                      dark:hover:bg-[#292722]
                      dark:hover:text-white
                    "
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}

                {/* Search label */}

                {!searchQuery && (
                  <span
                    className="
                      hidden

                      rounded-md

                      border
                      border-[#DED9CB]

                      bg-[#F1EEE6]

                      px-2
                      py-1

                      text-[10px]
                      font-medium

                      text-[#89857B]

                      sm:block

                      dark:border-[#302E29]
                      dark:bg-[#211F1B]
                      dark:text-[#77736A]
                    "
                  >
                    Search
                  </span>
                )}
              </div>

              {/* =================================================
                  SEARCH RESULTS
                  ================================================= */}

              {searchQuery && (
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-full
                    z-50
                    mt-2

                    overflow-hidden

                    rounded-2xl

                    border
                    border-[#D8D1C3]

                    bg-[#FAF8F2]

                    shadow-2xl

                    dark:border-[#302E29]
                    dark:bg-[#181715]
                  "
                >
                  {searchResults.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto p-2">
                      <p
                        className="
                          px-3
                          pb-2
                          pt-1

                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]

                          text-[#927016]

                          dark:text-[#D6B84C]
                        "
                      >
                        Search Results
                      </p>

                      {searchResults.map((result) => (
                        <button
                          key={result.id + result.title}
                          type="button"
                          onClick={() =>
                            goToSection(result.id)
                          }
                          className="
                            flex
                            w-full
                            items-center
                            gap-3

                            rounded-xl

                            px-3
                            py-3

                            text-left

                            transition-all

                            hover:bg-[#EEE8DA]

                            dark:hover:bg-[#24221E]
                          "
                        >
                          <span
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center

                              rounded-lg

                              bg-[#E9E0CA]

                              text-sm
                              text-[#806510]

                              dark:bg-[#2A251B]
                              dark:text-[#D6B84C]
                            "
                          >
                            <Search size={15} />
                          </span>

                          <span className="min-w-0">
                            <span
                              className="
                                block
                                truncate

                                text-sm
                                font-semibold

                                text-[#302D27]

                                dark:text-[#F1EFE8]
                              "
                            >
                              {result.title}
                            </span>

                            <span
                              className="
                                mt-0.5
                                block
                                text-xs

                                text-[#817B71]

                                dark:text-[#918C83]
                              "
                            >
                              Go to this section
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-5 py-6 text-center">
                      <Search
                        size={22}
                        className="
                          mx-auto
                          mb-2
                          text-[#A39D91]

                          dark:text-[#69655E]
                        "
                      />

                      <p
                        className="
                          text-sm
                          font-medium

                          text-[#5F5B53]

                          dark:text-[#A6A198]
                        "
                      >
                        No matching section found
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs

                          text-[#8A857B]

                          dark:text-[#706C64]
                        "
                      >
                        Try Java, React, projects, resume,
                        certificates, or contact.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
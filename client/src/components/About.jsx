import { useEffect, useState } from "react";
import api from "../services/api";

function About() {
  const [portfolio, setPortfolio] = useState(null);

  // ==========================================
  // GET PORTFOLIO DATA
  // ==========================================

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");

        if (response.data.success) {
          setPortfolio(response.data.portfolio);
        }
      } catch (error) {
        console.error("Portfolio fetch error:", error);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <section
      id="about"
      className="
        bg-[#F1ECE2]
        px-5
        py-20
        transition-colors
        duration-300

        sm:px-8
        lg:px-14
        lg:py-24

        dark:bg-[#11100E]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            SECTION HEADER
            ========================= */}

        <div className="mb-12">
          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#927016]

              dark:text-[#D6B84C]
            "
          >
            About Me
          </p>

          <h2
            className="
              max-w-3xl
              text-3xl
              font-bold
              tracking-tight
              text-[#211F1B]

              sm:text-4xl
              lg:text-5xl

              dark:text-[#F1EFE8]
            "
          >
            {portfolio?.title || "Web Developer focused on"}

            <span className="block">
              building practical software.
            </span>
          </h2>
        </div>

        {/* =========================
            MAIN ABOUT CONTENT
            ========================= */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1.4fr_0.8fr]
            lg:items-stretch
          "
        >

          {/* =========================
              INTRODUCTION
              ========================= */}

          <div
            className="
              rounded-3xl
              border
              border-[#D8D0C0]
              bg-[#F8F4EB]

              p-7

              sm:p-9
              lg:p-10

              dark:border-[#302D28]
              dark:bg-[#191816]
            "
          >
            <p
              className="
                text-base
                leading-8
                text-[#4F4A42]

                sm:text-lg

                dark:text-[#C0BBB2]
              "
            >
              {portfolio?.bio ||
                "I am a Computer Science and Engineering student and a web developer who enjoys building complete, practical web applications."}
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#6D6960]

                sm:text-base

                dark:text-[#A6A198]
              "
            >
              My development experience includes building web
              applications with the MERN stack as well as
              Node.js, Express and EJS applications without React.
              I also work with Java backend development and am
              continuously improving my understanding of backend
              architecture and application development.
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#6D6960]

                sm:text-base

                dark:text-[#A6A198]
              "
            >
              Currently, I am focusing on strengthening React for
              modern frontend development while continuing to build
              full-stack projects and improve my problem-solving
              skills through regular DSA practice.
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#6D6960]

                sm:text-base

                dark:text-[#A6A198]
              "
            >
              Alongside development, I regularly solve problems on
              LeetCode and GeeksforGeeks and continue studying
              computer science core subjects for technical
              interviews and GATE-oriented preparation.
            </p>

            {/* Accent */}

            <div
              className="
                mt-8
                h-px
                w-20
                bg-[#B18A25]

                dark:bg-[#D6B84C]
              "
            />
          </div>

          {/* =========================
              CURRENT FOCUS
              ========================= */}

          <div
            className="
              rounded-3xl
              border
              border-[#D8D0C0]
              bg-[#E9E1D1]

              p-7

              sm:p-9

              dark:border-[#302D28]
              dark:bg-[#191816]
            "
          >
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[#806510]

                dark:text-[#D6B84C]
              "
            >
              Currently Focused On
            </p>

            <div className="mt-7 space-y-6">

              {/* =========================
                  FULL STACK
                  ========================= */}

              <div
                className="
                  border-b
                  border-[#D2C8B7]
                  pb-5

                  dark:border-[#302D28]
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#292620]

                    dark:text-[#F1EFE8]
                  "
                >
                  Full Stack Web Development
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#6D6960]

                    dark:text-[#9F9A91]
                  "
                >
                  MERN stack, Node.js, Express, EJS and
                  database-driven web applications.
                </p>
              </div>

              {/* =========================
                  JAVA BACKEND
                  ========================= */}

              <div
                className="
                  border-b
                  border-[#D2C8B7]
                  pb-5

                  dark:border-[#302D28]
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#292620]

                    dark:text-[#F1EFE8]
                  "
                >
                  Java Backend Development
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#6D6960]

                    dark:text-[#9F9A91]
                  "
                >
                  Building backend applications and
                  strengthening Java, Spring and database
                  development skills.
                </p>
              </div>

              {/* =========================
                  REACT
                  ========================= */}

              <div
                className="
                  border-b
                  border-[#D2C8B7]
                  pb-5

                  dark:border-[#302D28]
                "
              >
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#292620]

                    dark:text-[#F1EFE8]
                  "
                >
                  React & Frontend
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#6D6960]

                    dark:text-[#9F9A91]
                  "
                >
                  Continuously improving React and modern
                  frontend development practices.
                </p>
              </div>

              {/* =========================
                  DSA
                  ========================= */}

              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-[#292620]

                    dark:text-[#F1EFE8]
                  "
                >
                  DSA & Computer Science
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#6D6960]

                    dark:text-[#9F9A91]
                  "
                >
                  Regular problem solving on LeetCode and
                  GeeksforGeeks while preparing CS core subjects
                  for interviews and GATE-oriented preparation.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-[#D3CCBD]
        bg-[#E9E4D8]
        text-[#211F1B]
        transition-colors
        duration-300

        dark:border-[#302D28]
        dark:bg-[#141311]
        dark:text-[#F1EFE8]
      "
    >
      {/* =========================
          MAIN FOOTER
          ========================= */}
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-16

          sm:px-8
          lg:px-14
          lg:py-20
        "
      >
        <div
          className="
            grid
            gap-12

            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
          "
        >
          {/* =========================
              ABOUT
              ========================= */}
          <div className="lg:col-span-1">
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              Sachin Jadaun
            </h2>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-[#927016]

                dark:text-[#D6B84C]
              "
            >
              Full Stack Developer
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              I am a Computer Science engineering student and
              aspiring software developer focused on building
              responsive, scalable and user-friendly web
              applications.
            </p>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              I work across frontend and backend development,
              with experience in React, Node.js, Express,
              MongoDB, Java, Spring Boot and PostgreSQL.
            </p>

            {/* GitHub */}
            <a
              href="https://github.com/sachinjadaun113"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                inline-flex
                items-center
                rounded-full
                border
                border-[#C9A227]/40
                px-4
                py-2

                text-xs
                font-semibold
                text-[#806510]

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#E8D9A8]/40

                dark:border-[#D6B84C]/40
                dark:text-[#D6B84C]
                dark:hover:bg-[#D6B84C]/10
              "
            >
              GitHub: sachinjadaun113
            </a>
          </div>

          {/* =========================
              DEVELOPMENT
              ========================= */}
          <div>
            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#927016]

                dark:text-[#D6B84C]
              "
            >
              Development
            </h3>

            <ul
              className="
                mt-6
                space-y-3
                text-sm
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              <li>React.js</li>
              <li>JavaScript</li>
              <li>HTML & CSS</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>Java</li>
              <li>Spring Boot</li>
              <li>Spring MVC</li>
              <li>Hibernate / JPA</li>
              <li>PostgreSQL</li>
            </ul>
          </div>

          {/* =========================
              DSA & PROBLEM SOLVING
              ========================= */}
          <div>
            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#927016]

                dark:text-[#D6B84C]
              "
            >
              DSA & Problem Solving
            </h3>

            <p
              className="
                mt-6
                text-3xl
                font-bold
                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              200+
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              Problems Solved
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-7
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              Regularly practicing Data Structures and
              Algorithms and solving coding problems on
              LeetCode and GeeksforGeeks.
            </p>

            <div className="mt-5 space-y-3">
              <a
                href="https://leetcode.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#806510]
                  transition-colors
                  hover:text-[#5F4A0C]

                  dark:text-[#D6B84C]
                  dark:hover:text-[#E7D47A]
                "
              >
                LeetCode →
              </a>

              <a
                href="https://www.geeksforgeeks.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  text-sm
                  font-medium
                  text-[#806510]
                  transition-colors
                  hover:text-[#5F4A0C]

                  dark:text-[#D6B84C]
                  dark:hover:text-[#E7D47A]
                "
              >
                GeeksforGeeks →
              </a>
            </div>
          </div>

          {/* =========================
              QUICK LINKS
              ========================= */}
          <div>
            <h3
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#927016]

                dark:text-[#D6B84C]
              "
            >
              Quick Links
            </h3>

            <ul
              className="
                mt-6
                space-y-4
                text-sm
              "
            >
              <li>
                <a
                  href="#home"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#skills"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  Skills
                </a>
              </li>

              <li>
                <a
                  href="#projects"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="#documents"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  Certifications
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="
                    text-[#6D6960]
                    transition-colors
                    hover:text-[#927016]

                    dark:text-[#A6A198]
                    dark:hover:text-[#D6B84C]
                  "
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* =========================
            TECHNOLOGY SUMMARY
            ========================= */}
        <div
          className="
            mt-14
            border-t
            border-[#D3CCBD]
            pt-10

            dark:border-[#302D28]
          "
        >
          <div
            className="
              grid
              gap-8

              md:grid-cols-3
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#927016]

                  dark:text-[#D6B84C]
                "
              >
                Frontend
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                React • JavaScript • HTML • CSS • Responsive
                Design • REST APIs
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#927016]

                  dark:text-[#D6B84C]
                "
              >
                Backend
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                Node.js • Express • Java • Spring Boot •
                Hibernate • MongoDB • PostgreSQL
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#927016]

                  dark:text-[#D6B84C]
                "
              >
                Problem Solving
              </p>

              <p
                className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#6D6960]

                  dark:text-[#A6A198]
                "
              >
                200+ DSA problems solved across LeetCode and
                GeeksforGeeks using Java.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            SOCIAL LINKS
            ========================= */}
        <div
          className="
            mt-12
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-sm
                font-semibold
                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              Let's build something meaningful.
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[#817B71]

                dark:text-[#918C83]
              "
            >
              Open to internships, opportunities and
              interesting projects.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/sachinjadaun113"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full
                border
                border-[#D3CCBD]
                px-4
                py-2
                text-xs
                font-semibold
                text-[#6D6960]

                transition-all
                hover:border-[#A77C16]
                hover:text-[#927016]

                dark:border-[#302D28]
                dark:text-[#A6A198]
                dark:hover:border-[#D6B84C]
                dark:hover:text-[#D6B84C]
              "
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full
                border
                border-[#D3CCBD]
                px-4
                py-2
                text-xs
                font-semibold
                text-[#6D6960]

                transition-all
                hover:border-[#A77C16]
                hover:text-[#927016]

                dark:border-[#302D28]
                dark:text-[#A6A198]
                dark:hover:border-[#D6B84C]
                dark:hover:text-[#D6B84C]
              "
            >
              LinkedIn
            </a>

            <a
              href="#contact"
              className="
                rounded-full
                bg-[#9B7416]
                px-4
                py-2
                text-xs
                font-semibold
                text-white

                transition-all
                hover:-translate-y-0.5
                hover:bg-[#806010]

                dark:bg-[#C09A2D]
                dark:text-[#171511]
                dark:hover:bg-[#D6B84C]
              "
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM BAR
          ========================= */}
      <div
        className="
          border-t
          border-[#D3CCBD]

          dark:border-[#302D28]
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-3
            px-5
            py-6
            text-center

            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
            md:text-left

            lg:px-14
          "
        >
          <p
            className="
              text-xs
              text-[#817B71]

              dark:text-[#918C83]
            "
          >
            © {currentYear} Sachin Jadaun. All rights reserved.
          </p>

          <p
            className="
              text-xs
              text-[#817B71]

              dark:text-[#918C83]
            "
          >
            Built with React, Node.js, Java & Spring Boot.
          </p>

          <p
            className="
              text-xs
              font-medium
              text-[#927016]

              dark:text-[#D6B84C]
            "
          >
           <a
             href="https://github.com/sachinjadaun113/sachin_jadaun-portfolio"
             target="_blank"
             rel="noopener noreferrer"
             className="
               text-sm
               text-[#6D6960]
               transition-colors
               hover:text-[#927016]

               dark:text-[#A6A198]
               dark:hover:text-[#D6B84C]
             "
           >
             Portfolio Source Code →
           </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
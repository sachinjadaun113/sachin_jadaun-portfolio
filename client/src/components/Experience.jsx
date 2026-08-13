import { useEffect, useState } from "react";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/experience"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }

        const data = await response.json();

        console.log("Experiences:", data);

        if (
          data.success &&
          Array.isArray(data.experiences)
        ) {
          setExperiences(data.experiences);
        }
      } catch (error) {
        console.error(
          "Experience fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="
        bg-[#F0EBE1]
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

        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <div className="mb-14">
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
            My Journey
          </p>

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-[#211F1B]

              sm:text-4xl
              lg:text-5xl

              dark:text-[#F1EFE8]
            "
          >
            Experience
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-[#6D6960]

              sm:text-base

              dark:text-[#A6A198]
            "
          >
            My professional journey, practical experience,
            and the technologies I have worked with.
          </p>
        </div>

        {/* =========================================
            LOADING
        ========================================= */}

        {loading && (
          <div
            className="
              rounded-3xl
              border
              border-[#D3CCBD]
              bg-[#F7F3EA]
              p-10
              text-center

              dark:border-[#302D28]
              dark:bg-[#1A1917]
            "
          >
            <p
              className="
                text-sm
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              Loading experience...
            </p>
          </div>
        )}

        {/* =========================================
            EXPERIENCE TIMELINE
        ========================================= */}

        {!loading && experiences.length > 0 && (
          <div className="relative">

            {/* Timeline line */}

            <div
              className="
                absolute
                left-[7px]
                top-2
                hidden
                h-[calc(100%-16px)]
                w-px
                bg-[#D2CABB]

                sm:block

                dark:bg-[#39362F]
              "
            />

            <div className="space-y-10">

              {experiences.map((experience) => (
                <article
                  key={experience._id}
                  className="
                    relative
                    sm:pl-12
                  "
                >

                  {/* =================================
                      TIMELINE DOT
                  ================================= */}

                  <div
                    className="
                      absolute
                      left-0
                      top-1
                      hidden
                      h-4
                      w-4
                      rounded-full
                      border-4
                      border-[#F0EBE1]
                      bg-[#A77C16]

                      sm:block

                      dark:border-[#11100E]
                      dark:bg-[#D6B84C]
                    "
                  />

                  {/* =================================
                      EXPERIENCE CARD
                  ================================= */}

                  <div
                    className="
                      rounded-3xl
                      border
                      border-[#D3CCBD]
                      bg-[#F7F3EA]
                      p-6

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-[#A77C16]/50
                      hover:shadow-lg

                      sm:p-7

                      dark:border-[#302D28]
                      dark:bg-[#1A1917]

                      dark:hover:border-[#D6B84C]/40
                    "
                  >

                    {/* =================================
                        TOP ROW
                    ================================= */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-4

                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                      "
                    >

                      <div>

                        {/* ROLE */}

                        <h3
                          className="
                            text-xl
                            font-semibold
                            text-[#211F1B]

                            dark:text-[#F1EFE8]
                          "
                        >
                          {experience.role}
                        </h3>

                        {/* COMPANY */}

                        <div
                          className="
                            mt-2
                            flex
                            flex-wrap
                            items-center
                            gap-x-2
                            gap-y-1
                            text-sm
                          "
                        >
                          {experience.companyUrl ? (
                            <a
                              href={experience.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                font-medium
                                text-[#927016]

                                hover:underline

                                dark:text-[#D6B84C]
                              "
                            >
                              {experience.company}
                            </a>
                          ) : (
                            <span
                              className="
                                font-medium
                                text-[#927016]

                                dark:text-[#D6B84C]
                              "
                            >
                              {experience.company}
                            </span>
                          )}

                          {experience.location && (
                            <>
                              <span
                                className="
                                  text-[#AAA39A]

                                  dark:text-[#625E56]
                                "
                              >
                                •
                              </span>

                              <span
                                className="
                                  text-[#6D6960]

                                  dark:text-[#A6A198]
                                "
                              >
                                {experience.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* =================================
                          DATE
                      ================================= */}

                      <div
                        className="
                          shrink-0
                          rounded-full
                          border
                          border-[#D2CABB]
                          bg-[#ECE7DC]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-[#625E56]

                          dark:border-[#39362F]
                          dark:bg-[#24221F]
                          dark:text-[#AAA59B]
                        "
                      >
                        {experience.startDate || "—"}
                        {" - "}
                        {experience.currentlyWorking
                          ? "Present"
                          : experience.endDate || "—"}
                      </div>
                    </div>

                    {/* =================================
                        DESCRIPTION
                    ================================= */}

                    {experience.description && (
                      <p
                        className="
                          mt-5
                          text-sm
                          leading-7
                          text-[#6D6960]

                          dark:text-[#A6A198]
                        "
                      >
                        {experience.description}
                      </p>
                    )}

                    {/* =================================
                        TECHNOLOGIES
                    ================================= */}

                    {Array.isArray(
                      experience.technologies
                    ) &&
                      experience.technologies.length > 0 && (
                        <div
                          className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                          "
                        >
                          {experience.technologies.map(
                            (technology, index) => (
                              <span
                                key={index}
                                className="
                                  rounded-full
                                  border
                                  border-[#D2CABB]
                                  bg-[#ECE7DC]
                                  px-3
                                  py-1
                                  text-xs
                                  font-medium
                                  text-[#625E56]

                                  dark:border-[#39362F]
                                  dark:bg-[#24221F]
                                  dark:text-[#AAA59B]
                                "
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            EMPTY STATE
        ========================================= */}

        {!loading && experiences.length === 0 && (
          <div
            className="
              rounded-3xl
              border
              border-[#D3CCBD]
              bg-[#F7F3EA]
              px-6
              py-12
              text-center

              dark:border-[#302D28]
              dark:bg-[#1A1917]
            "
          >
            <p
              className="
                text-sm
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              No experience available.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Experience;
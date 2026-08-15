import { useEffect, useState } from "react";
import api from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/skills");

        console.log("Skills:", response.data);

        if (
          response.data.success &&
          Array.isArray(response.data.skills)
        ) {
          setSkills(response.data.skills);
        }
      } catch (error) {
        console.error("Skills fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="
        bg-[#E9E4D8]
        px-5
        py-20
        transition-colors
        duration-300

        sm:px-8
        lg:px-14
        lg:py-24

        dark:bg-[#141311]
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}

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
            Expertise
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
            Skills & Technologies
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
            Technologies and tools I use to build web
            applications, backend systems, and software
            solutions.
          </p>
        </div>

        {/* LOADING */}

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
              Loading skills...
            </p>
          </div>
        )}

        {/* SKILLS */}

        {!loading && skills.length > 0 && (
          <div
            className="
              grid
              gap-6

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {skills.map((skill) => (
              <article
                key={skill._id}
                className="
                  group
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

                  dark:border-[#302D28]
                  dark:bg-[#1A1917]

                  dark:hover:border-[#D6B84C]/40
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-[#D2CABB]

                      bg-[#ECE7DC]

                      text-sm
                      font-semibold
                      text-[#806010]

                      transition-all
                      duration-300

                      group-hover:border-[#A77C16]/50

                      dark:border-[#39362F]
                      dark:bg-[#24221F]
                      dark:text-[#D6B84C]

                      dark:group-hover:border-[#D6B84C]/50
                    "
                  >
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <span>
                        {skill.name?.charAt(0)?.toUpperCase() || "S"}
                      </span>
                    )}
                  </div>

                  {/* LEVEL */}

                  <span
                    className="
                      rounded-full

                      border
                      border-[#D2CABB]

                      bg-[#ECE7DC]

                      px-3
                      py-1

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wide
                      text-[#625E56]

                      dark:border-[#39362F]
                      dark:bg-[#24221F]
                      dark:text-[#AAA59B]
                    "
                  >
                    {skill.level}
                  </span>
                </div>

                {/* NAME */}

                <h3
                  className="
                    mt-5
                    text-lg
                    font-semibold
                    text-[#211F1B]

                    dark:text-[#F1EFE8]
                  "
                >
                  {skill.name}
                </h3>

                {/* CATEGORY */}

                <div className="mt-3">
                  <span
                    className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-[#927016]

                      dark:text-[#D6B84C]
                    "
                  >
                    {skill.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && skills.length === 0 && (
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
              No skills available.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;
import { useEffect, useState } from "react";

function Education() {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/education"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch education");
        }

        const data = await response.json();

        console.log("Education API response:", data);

        if (data.success && Array.isArray(data.educations)) {
          setEducations(data.educations);
        } else {
          setEducations([]);
        }
      } catch (error) {
        console.error("Education fetch error:", error);
        setEducations([]);
      }
    };

    fetchEducations();
  }, []);

  return (
    <section
      id="education"
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

        {/* =========================
            SECTION HEADING
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
            Academic Journey
          </p>

          <h2
            className="
              text-3xl
              font-bold
              text-[#211F1B]

              sm:text-4xl

              dark:text-[#F1EFE8]
            "
          >
            Education
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
            My academic background and educational journey.
          </p>
        </div>

        {/* =========================
            EDUCATION LIST
            ========================= */}

        {educations.length > 0 ? (
          <div className="relative">

            {/* Timeline line */}

            <div
              className="
                absolute
                left-[7px]
                top-2
                hidden
                h-full
                w-px
                bg-[#CFC6B6]

                sm:block

                dark:bg-[#39362F]
              "
            />

            <div className="space-y-8">

              {educations.map((education) => (
                <div
                  key={education._id}
                  className="
                    relative
                    sm:pl-10
                  "
                >

                  {/* Timeline dot */}

                  <div
                    className="
                      absolute
                      left-0
                      top-7
                      hidden
                      h-4
                      w-4
                      rounded-full
                      border-4
                      border-[#E9E4D8]
                      bg-[#A77C16]

                      sm:block

                      dark:border-[#141311]
                      dark:bg-[#D6B84C]
                    "
                  />

                  {/* Education Card */}

                  <div
                    className="
                      rounded-2xl
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

                    {/* Degree + Year */}

                    <div
                      className="
                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                      "
                    >

                      <div>

                        <h3
                          className="
                            text-xl
                            font-semibold
                            text-[#211F1B]

                            dark:text-[#F1EFE8]
                          "
                        >
                          {education.degree}
                        </h3>

                        {education.institution && (
                          <p
                            className="
                              mt-2
                              text-sm
                              font-medium
                              text-[#927016]

                              dark:text-[#D6B84C]
                            "
                          >
                            {education.institution}
                          </p>
                        )}

                      </div>

                      {/* Year */}

                      {(education.startYear ||
                        education.endYear) && (
                        <span
                          className="
                            inline-flex
                            w-fit
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
                          {education.startYear || ""}
                          {education.startYear &&
                            education.endYear
                            ? " — "
                            : ""}
                          {education.endYear || ""}
                        </span>
                      )}

                    </div>

                    {/* Field */}

                    {education.field && (
                      <p
                        className="
                          mt-4
                          text-sm
                          font-medium
                          text-[#514D46]

                          dark:text-[#C2BDB3]
                        "
                      >
                        {education.field}
                      </p>
                    )}

                    {/* Grade */}

                    {education.grade && (
                      <div
                        className="
                          mt-4
                          inline-flex
                          rounded-full
                          border
                          border-[#C9A227]/30
                          bg-[#E8D9A8]/40
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-[#806510]

                          dark:border-[#D6B84C]/30
                          dark:bg-[#D6B84C]/10
                          dark:text-[#D6B84C]
                        "
                      >
                        {education.grade}
                      </div>
                    )}

                    {/* Description */}

                    {education.description && (
                      <p
                        className="
                          mt-4
                          max-w-3xl
                          text-sm
                          leading-7
                          text-[#6D6960]

                          dark:text-[#A6A198]
                        "
                      >
                        {education.description}
                      </p>
                    )}

                  </div>
                </div>
              ))}

            </div>
          </div>
        ) : (

          /* =========================
             EMPTY STATE
             ========================= */

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#CFC6B6]
              bg-[#F2EEE5]
              px-6
              py-12
              text-center

              dark:border-[#39362F]
              dark:bg-[#1A1917]
            "
          >
            <p
              className="
                text-sm
                font-medium
                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              No education information available yet.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default Education;
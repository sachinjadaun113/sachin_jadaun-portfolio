import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({});

  // ==========================================
  // FETCH PROJECTS
  // ==========================================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");

        const data = response.data;

        console.log("Projects:", data);

        if (data.success) {
          setProjects(data.projects || []);
        }
      } catch (error) {
        console.error("Project fetch error:", error);
      }
    };

    fetchProjects();
  }, []);

  // ==========================================
  // SELECT MEDIA
  // ==========================================

  const handleMediaSelect = (projectId, mediaIndex) => {
    setSelectedMedia((previous) => ({
      ...previous,
      [projectId]: mediaIndex,
    }));
  };

  return (
    <section
      id="projects"
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

        <div className="mb-10">
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
            Selected Work
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
            My Projects
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
            A collection of projects built with modern
            technologies and practical solutions.
          </p>
        </div>

        {/* =========================
            PROJECT GRID
            ========================= */}

        <div
          className="
            grid
            gap-6

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {projects.map((project) => {
            // ==========================================
            // IMAGES
            // ==========================================

            const images = Array.isArray(project.images)
              ? project.images.filter(Boolean)
              : [];

            // ==========================================
            // VIDEOS
            // ==========================================

            const videos = Array.isArray(project.videos)
              ? project.videos.filter(Boolean)
              : [];

            // ==========================================
            // COMBINE MEDIA
            // ==========================================

            const media = [
              ...images.map((url) => ({
                type: "image",
                url,
              })),

              ...videos.map((url) => ({
                type: "video",
                url,
              })),
            ];

            // ==========================================
            // SELECTED MEDIA
            // ==========================================

            const selectedIndex =
              selectedMedia[project._id] ?? 0;

            const selected =
              media[selectedIndex] || media[0];

            return (
              <div
                key={project._id}
                className="
                  flex
                  flex-col

                  overflow-hidden
                  rounded-2xl

                  border
                  border-[#D3CCBD]

                  bg-[#F7F3EA]

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

                {/* =========================
                    MEDIA GALLERY
                    ========================= */}

                {media.length > 0 && (
                  <div
                    className="
                      border-b
                      border-[#DDD6C9]

                      dark:border-[#302D28]
                    "
                  >

                    {/* =========================
                        MAIN MEDIA

                        IMPORTANT:
                        No fixed height.
                        No object-cover.

                        This allows the complete
                        image/video to be visible.
                        ========================= */}

                    <div
                      className="
                        w-full
                        overflow-hidden

                        bg-[#DDD6C8]

                        dark:bg-[#24221E]
                      "
                    >
                      {selected?.type === "video" ? (
                        <video
                          key={selected.url}
                          src={selected.url}
                          controls
                          preload="metadata"
                          className="
                            block
                            h-auto
                            max-h-[500px]
                            w-full
                            object-contain
                          "
                        />
                      ) : (
                        <img
                          src={selected?.url}
                          alt={`${project.title} preview`}
                          className="
                            block
                            h-auto
                            max-h-[500px]
                            w-full
                            object-contain

                            transition-transform
                            duration-300
                          "
                        />
                      )}
                    </div>

                    {/* =========================
                        MEDIA THUMBNAILS
                        ========================= */}

                    {media.length > 1 && (
                      <div
                        className="
                          flex
                          gap-2
                          overflow-x-auto
                          p-3
                        "
                      >
                        {media.map((item, index) => (
                          <button
                            key={`${project._id}-media-${index}`}
                            type="button"
                            onClick={() =>
                              handleMediaSelect(
                                project._id,
                                index
                              )
                            }
                            className={`
                              relative
                              h-14
                              w-20
                              shrink-0
                              overflow-hidden
                              rounded-lg
                              border-2
                              transition-all

                              ${
                                selectedIndex === index
                                  ? "border-[#A77C16] dark:border-[#D6B84C]"
                                  : "border-[#D2CABB] dark:border-[#39362F]"
                              }
                            `}
                          >

                            {/* IMAGE THUMBNAIL */}

                            {item.type === "image" ? (
                              <img
                                src={item.url}
                                alt={`${project.title} media ${
                                  index + 1
                                }`}
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            ) : (
                              /* VIDEO THUMBNAIL */

                              <video
                                src={item.url}
                                muted
                                preload="metadata"
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            )}

                            {/* VIDEO LABEL */}

                            {item.type === "video" && (
                              <span
                                className="
                                  absolute
                                  bottom-1
                                  left-1

                                  rounded
                                  bg-black/70

                                  px-1.5
                                  py-0.5

                                  text-[9px]
                                  font-semibold
                                  text-white
                                "
                              >
                                VIDEO
                              </span>
                            )}

                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                )}

                {/* =========================
                    PROJECT CONTENT
                    ========================= */}

                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    p-6
                  "
                >

                  {/* =========================
                      FEATURED
                      ========================= */}

                  {project.featured && (
                    <div className="mb-4">
                      <span
                        className="
                          inline-flex
                          rounded-full

                          border
                          border-[#C9A227]/30

                          bg-[#E8D9A8]/40

                          px-3
                          py-1.5

                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider

                          text-[#806510]

                          dark:border-[#D6B84C]/30
                          dark:bg-[#D6B84C]/10
                          dark:text-[#D6B84C]
                        "
                      >
                        Featured
                      </span>
                    </div>
                  )}

                  {/* =========================
                      TITLE
                      ========================= */}

                  <h3
                    className="
                      text-xl
                      font-semibold

                      text-[#211F1B]

                      dark:text-[#F1EFE8]
                    "
                  >
                    {project.title}
                  </h3>

                  {/* =========================
                      DESCRIPTION
                      ========================= */}

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-6

                      text-[#6D6960]

                      dark:text-[#A6A198]
                    "
                  >
                    {project.description}
                  </p>

                  {/* =========================
                      TECHNOLOGIES
                      ========================= */}

                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {project.technologies.map(
                          (technology, index) => (
                            <span
                              key={`${project._id}-technology-${index}`}
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

                  {/* =========================
                      BOTTOM AREA
                      ========================= */}

                  <div
                    className="
                      mt-auto

                      flex
                      items-end
                      justify-between

                      gap-4

                      border-t
                      border-[#DDD6C9]

                      pt-5

                      dark:border-[#302D28]
                    "
                  >

                    {/* =========================
                        PROJECT LINKS
                        ========================= */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full

                            bg-[#9B7416]

                            px-4
                            py-2.5

                            text-xs
                            font-semibold
                            text-white

                            transition-colors
                            duration-300

                            hover:bg-[#806010]

                            dark:bg-[#C09A2D]
                            dark:text-[#171511]

                            dark:hover:bg-[#D6B84C]
                          "
                        >
                          View Project
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            rounded-full

                            border
                            border-[#D0C8B9]

                            bg-[#EEEAE1]

                            px-4
                            py-2.5

                            text-xs
                            font-semibold

                            text-[#5F5A51]

                            transition-all
                            duration-300

                            hover:border-[#A77C16]/50
                            hover:text-[#806010]

                            dark:border-[#38352E]
                            dark:bg-[#24221F]
                            dark:text-[#AAA59F]

                            dark:hover:border-[#D6B84C]/50
                            dark:hover:text-[#D6B84C]
                          "
                        >
                          GitHub
                        </a>
                      )}

                    </div>

                    {/* =========================
                        MEDIA COUNT
                        ========================= */}

                    {media.length > 0 && (
                      <span
                        className="
                          shrink-0
                          rounded-full

                          bg-[#ECE7DC]

                          px-3
                          py-1.5

                          text-[10px]
                          font-semibold

                          text-[#625E56]

                          dark:bg-[#24221F]
                          dark:text-[#AAA59B]
                        "
                      >
                        {media.length} Media
                      </span>
                    )}

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Projects;
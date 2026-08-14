import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";
import api from "../services/api";

function Resume() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get("/portfolio");

        if (response.data.success) {
          setPortfolio(response.data.portfolio);
        }
      } catch (error) {
        console.error(
          "Failed to fetch portfolio:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  /*
   * Download PDF
   */
  const downloadPDF = async (url, fileName) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);

      /*
       * Fallback:
       * If browser blocks the Cloudinary download,
       * open the PDF instead.
       */
      window.open(url, "_blank");
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <section
        id="resume"
        className="
          bg-[#F3F0E8]
          px-5
          py-20
          dark:bg-[#10100F]
        "
      >
        <div className="mx-auto max-w-7xl text-center">
          <p
            className="
              text-sm
              text-[#777266]
              dark:text-[#A6A198]
            "
          >
            Loading resume...
          </p>
        </div>
      </section>
    );
  }

  /*
   * No portfolio
   */
  if (!portfolio) {
    return null;
  }

  return (
    <section
      id="resume"
      className="
        bg-[#F3F0E8]
        px-5
        py-20

        transition-colors
        duration-300

        sm:px-8
        lg:px-14
        lg:py-24

        dark:bg-[#10100F]
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
            Resume & CV
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
            My Professional Documents
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
            View or download my resume and CV to learn more
            about my education, technical skills, projects,
            experience, and professional background.
          </p>

        </div>

        {/* =========================
            DOCUMENT GRID
        ========================= */}

        <div
          className="
            grid
            gap-6

            md:grid-cols-2
          "
        >

          {/* ==================================================
              RESUME
          ================================================== */}

          <div
            className="
              group
              flex
              flex-col

              rounded-2xl

              border
              border-[#D3CCBD]

              bg-[#F8F5ED]

              p-6

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[#A77C16]/50
              hover:shadow-xl

              dark:border-[#302D28]
              dark:bg-[#1A1917]

              dark:hover:border-[#D6B84C]/40
            "
          >

            {/* Icon */}

            <div
              className="
                mb-6

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-[#E8D9A8]/50

                text-[#806510]

                dark:bg-[#D6B84C]/10
                dark:text-[#D6B84C]
              "
            >
              <FileText size={28} />
            </div>

            {/* Title */}

            <h3
              className="
                text-2xl
                font-semibold

                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              Resume
            </h3>

            <p
              className="
                mt-3
                flex-1

                text-sm
                leading-7

                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              A concise overview of my education, technical
              skills, projects, experience, and achievements.
            </p>

            {/* Actions */}

            {portfolio.resumeUrl ? (
              <div
                className="
                  mt-7

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                "
              >

                {/* VIEW */}

                <a
                  href={portfolio.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    flex-1
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
                    duration-300

                    hover:bg-[#E5D8B9]

                    dark:border-[#D6B84C]/25
                    dark:bg-[#29251D]
                    dark:text-[#D6B84C]

                    dark:hover:bg-[#332D20]
                  "
                >
                  <Eye size={17} />

                  View Resume

                  <ExternalLink size={14} />
                </a>

                {/* DOWNLOAD */}

                <button
                  type="button"
                  onClick={() =>
                    downloadPDF(
                      portfolio.resumeUrl,
                      "Sachin-Jadaun-Resume.pdf"
                    )
                  }
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-[#9B7416]

                    px-4
                    py-3

                    text-sm
                    font-semibold

                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#806010]
                    hover:shadow-md

                    dark:bg-[#C09A2D]
                    dark:text-[#171511]

                    dark:hover:bg-[#D6B84C]
                  "
                >
                  <Download size={17} />

                  Download
                </button>

              </div>
            ) : (
              <div
                className="
                  mt-7
                  rounded-xl

                  bg-[#ECE7DC]

                  px-4
                  py-3

                  text-center
                  text-sm

                  text-[#777266]

                  dark:bg-[#24221E]
                  dark:text-[#A6A198]
                "
              >
                Resume not available yet.
              </div>
            )}

          </div>

          {/* ==================================================
              CV
          ================================================== */}

          <div
            className="
              group
              flex
              flex-col

              rounded-2xl

              border
              border-[#D3CCBD]

              bg-[#F8F5ED]

              p-6

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[#A77C16]/50
              hover:shadow-xl

              dark:border-[#302D28]
              dark:bg-[#1A1917]

              dark:hover:border-[#D6B84C]/40
            "
          >

            {/* Icon */}

            <div
              className="
                mb-6

                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-[#E8D9A8]/50

                text-[#806510]

                dark:bg-[#D6B84C]/10
                dark:text-[#D6B84C]
              "
            >
              <FileText size={28} />
            </div>

            {/* Title */}

            <h3
              className="
                text-2xl
                font-semibold

                text-[#211F1B]

                dark:text-[#F1EFE8]
              "
            >
              Curriculum Vitae
            </h3>

            <p
              className="
                mt-3
                flex-1

                text-sm
                leading-7

                text-[#6D6960]

                dark:text-[#A6A198]
              "
            >
              A detailed professional profile containing my
              complete academic background, technical expertise,
              projects, and career information.
            </p>

            {/* Actions */}

            {portfolio.cvUrl ? (
              <div
                className="
                  mt-7

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                "
              >

                {/* VIEW */}

                <a
                  href={portfolio.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    flex-1
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
                    duration-300

                    hover:bg-[#E5D8B9]

                    dark:border-[#D6B84C]/25
                    dark:bg-[#29251D]
                    dark:text-[#D6B84C]

                    dark:hover:bg-[#332D20]
                  "
                >
                  <Eye size={17} />

                  View CV

                  <ExternalLink size={14} />
                </a>

                {/* DOWNLOAD */}

                <button
                  type="button"
                  onClick={() =>
                    downloadPDF(
                      portfolio.cvUrl,
                      "Sachin-Jadaun-CV.pdf"
                    )
                  }
                  className="
                    inline-flex
                    flex-1
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-[#9B7416]

                    px-4
                    py-3

                    text-sm
                    font-semibold

                    text-white

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#806010]
                    hover:shadow-md

                    dark:bg-[#C09A2D]
                    dark:text-[#171511]

                    dark:hover:bg-[#D6B84C]
                  "
                >
                  <Download size={17} />

                  Download
                </button>

              </div>
            ) : (
              <div
                className="
                  mt-7
                  rounded-xl

                  bg-[#ECE7DC]

                  px-4
                  py-3

                  text-center
                  text-sm

                  text-[#777266]

                  dark:bg-[#24221E]
                  dark:text-[#A6A198]
                "
              >
                CV not available yet.
              </div>
            )}

          </div>

        </div>

        {/* =========================
            BOTTOM NOTE
        ========================= */}

        <div
          className="
            mt-8

            rounded-2xl

            border
            border-[#D3CCBD]

            bg-[#EEE9DE]

            px-5
            py-5

            dark:border-[#302D28]
            dark:bg-[#191815]
          "
        >
          <p
            className="
              text-center

              text-xs
              leading-6

              text-[#777266]

              sm:text-sm

              dark:text-[#A6A198]
            "
          >
            Interested in working together? View or download
            my resume and CV to learn more about my professional
            background.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Resume;
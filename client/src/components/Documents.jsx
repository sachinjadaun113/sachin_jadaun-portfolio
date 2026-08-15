import { useEffect, useState } from "react";
import api from "../services/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // ==========================================
  // FETCH DOCUMENTS
  // ==========================================

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/documents");

        const data = response.data;

        console.log("Documents API response:", data);

        if (
          data.success &&
          Array.isArray(data.documents)
        ) {
          setDocuments(data.documents);
        } else {
          setDocuments([]);
        }
      } catch (error) {
        console.error(
          "Documents fetch error:",
          error
        );

        setDocuments([]);
      }
    };

    fetchDocuments();
  }, []);

  // ==========================================
  // TYPE LABEL
  // ==========================================

  const getTypeLabel = (type) => {
    if (type === "certificate") {
      return "Certificate";
    }

    if (type === "achievement") {
      return "Achievement";
    }

    return "Document";
  };

  // ==========================================
  // GET PDF PREVIEW
  // ==========================================

  const getPdfPreviewUrl = (url) => {
    if (!url) {
      return "";
    }

    if (url.includes("/image/upload/")) {
      return url
        .replace(
          "/image/upload/",
          "/image/upload/pg_1/"
        )
        .replace(/\.pdf$/i, ".jpg");
    }

    return url;
  };

  // ==========================================
  // OPEN DOCUMENT
  // ==========================================

  const openDocument = (document) => {
    if (!document?.url) {
      return;
    }

    setSelectedDocument(document);
  };

  // ==========================================
  // CLOSE DOCUMENT
  // ==========================================

  const closeDocument = () => {
    setSelectedDocument(null);
  };

  // ==========================================
  // ESC KEY
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedDocument(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <>
      {/* =====================================================
          DOCUMENTS SECTION
          ===================================================== */}

      <section
        id="documents"
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

          {/* =================================================
              HEADING
              ================================================= */}

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
              Credentials & Achievements
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
              Certifications & Achievements
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
              A collection of certifications,
              achievements, and professional
              documents.
            </p>
          </div>

          {/* =================================================
              DOCUMENT GRID
              ================================================= */}

          {documents.length > 0 ? (

            <div
              className="
                grid
                gap-6

                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {documents.map((document) => {

                const previewUrl =
                  document.fileType === "pdf"
                    ? getPdfPreviewUrl(
                        document.url
                      )
                    : document.url;

                return (
                  <div
                    key={document._id}
                    className="
                      flex
                      h-full
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

                    {/* =====================================
                        PREVIEW
                        ===================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        openDocument(document)
                      }
                      className="
                        group
                        relative

                        block

                        h-56
                        w-full

                        cursor-pointer
                        overflow-hidden

                        bg-[#DDD6C8]

                        dark:bg-[#24221F]
                      "
                    >

                      {document.url ? (

                        <img
                          src={previewUrl}
                          alt={document.title}
                          className="
                            h-full
                            w-full

                            object-cover

                            transition-transform
                            duration-500

                            group-hover:scale-105
                          "
                          onError={(event) => {
                            console.error(
                              "Preview failed:",
                              previewUrl
                            );

                            event.currentTarget.style.display =
                              "none";
                          }}
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-full
                            w-full

                            items-center
                            justify-center
                          "
                        >
                          <span
                            className="
                              text-xs
                              font-medium

                              text-[#817B71]

                              dark:text-[#918C83]
                            "
                          >
                            No preview available
                          </span>
                        </div>
                      )}

                      {/* PDF BADGE */}

                      {document.fileType === "pdf" && (
                        <div
                          className="
                            absolute
                            left-4
                            top-4

                            rounded-full

                            bg-black/70

                            px-3
                            py-1.5

                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wider

                            text-white
                          "
                        >
                          PDF
                        </div>
                      )}

                      {/* VIEW OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0

                          flex
                          items-center
                          justify-center

                          bg-black/0

                          transition-all
                          duration-300

                          group-hover:bg-black/40
                        "
                      >
                        <span
                          className="
                            rounded-full

                            bg-white/90

                            px-4
                            py-2

                            text-xs
                            font-semibold

                            text-[#211F1B]

                            opacity-0

                            transition-opacity
                            duration-300

                            group-hover:opacity-100
                          "
                        >
                          Click to View
                        </span>
                      </div>

                    </button>

                    {/* =====================================
                        DOCUMENT CONTENT
                        ===================================== */}

                    <div className="flex flex-1 flex-col p-6">

                      {/* TYPE */}

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
                          {getTypeLabel(
                            document.type
                          )}
                        </span>

                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                          text-xl
                          font-semibold
                          leading-7

                          text-[#211F1B]

                          dark:text-[#F1EFE8]
                        "
                      >
                        {document.title}
                      </h3>

                      {/* ISSUER */}

                      {document.issuer && (
                        <p
                          className="
                            mt-2

                            text-sm
                            font-medium

                            text-[#927016]

                            dark:text-[#D6B84C]
                          "
                        >
                          {document.issuer}
                        </p>
                      )}

                      {/* DATE */}

                      {document.date && (
                        <p
                          className="
                            mt-3

                            text-xs
                            font-medium

                            text-[#817B71]

                            dark:text-[#918C83]
                          "
                        >
                          {document.date}
                        </p>
                      )}

                      {/* DESCRIPTION */}

                      {document.description && (
                        <p
                          className="
                            mt-4

                            text-sm
                            leading-6

                            text-[#6D6960]

                            dark:text-[#A6A198]
                          "
                        >
                          {document.description}
                        </p>
                      )}

                      {/* VIEW BUTTON */}

                      {document.url && (
                        <div
                          className="
                            mt-auto
                            border-t
                            border-[#DDD6C9]
                            pt-5

                            dark:border-[#302D28]
                          "
                        >

                          <button
                            type="button"
                            onClick={() =>
                              openDocument(document)
                            }
                            className="
                              w-full

                              rounded-full

                              bg-[#9B7416]

                              px-4
                              py-2.5

                              text-xs
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
                            View Certificate
                          </button>

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          ) : (

            /* =================================================
               EMPTY STATE
               ================================================= */

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
                No certifications or achievements
                available yet.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          DOCUMENT MODAL
          ===================================================== */}

      {selectedDocument &&
        selectedDocument.url && (

          <div
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              bg-black/90

              p-3
              sm:p-6
            "
            onClick={closeDocument}
          >

            <div
              className="
                relative

                flex

                h-[95vh]
                w-full
                max-w-6xl

                flex-col

                overflow-hidden

                rounded-2xl

                bg-[#1A1917]

                shadow-2xl
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* =============================================
                  CLOSE BUTTON
                  ============================================= */}

              <button
                type="button"
                onClick={closeDocument}
                className="
                  absolute
                  right-4
                  top-4

                  z-50

                  flex
                  h-10
                  w-10

                  items-center
                  justify-center

                  rounded-full

                  bg-black/80

                  text-2xl
                  font-bold

                  text-white

                  transition-all

                  hover:bg-black
                "
              >
                ×
              </button>

              {/* =============================================
                  HEADER
                  ============================================= */}

              <div
                className="
                  shrink-0

                  border-b
                  border-[#302D28]

                  bg-[#1A1917]

                  px-5
                  py-4
                "
              >

                <h3
                  className="
                    pr-12

                    text-base
                    font-semibold

                    text-[#F1EFE8]
                  "
                >
                  {selectedDocument.title}
                </h3>

                {selectedDocument.issuer && (
                  <p
                    className="
                      mt-1

                      text-xs

                      text-[#D6B84C]
                    "
                  >
                    {selectedDocument.issuer}
                  </p>
                )}

              </div>

              {/* =============================================
                  VIEWER
                  ============================================= */}

              <div
                className="
                  min-h-0
                  flex-1

                  overflow-auto

                  bg-[#292723]

                  p-3
                  sm:p-6
                "
              >

                {/* =========================================
                    IMAGE DOCUMENT
                    ========================================= */}

                {selectedDocument.fileType ===
                  "image" && (

                  <div
                    className="
                      flex
                      min-h-full

                      items-center
                      justify-center
                    "
                  >

                    <img
                      src={
                        selectedDocument.url
                      }
                      alt={
                        selectedDocument.title
                      }
                      className="
                        max-h-full
                        max-w-full

                        rounded-lg

                        object-contain

                        shadow-2xl
                      "
                    />

                  </div>
                )}

                {/* =========================================
                    PDF DOCUMENT
                    ========================================= */}

                {selectedDocument.fileType ===
                  "pdf" && (

                  <div
                    className="
                      flex
                      min-h-full

                      items-start
                      justify-center
                    "
                  >

                    <img
                      src={getPdfPreviewUrl(
                        selectedDocument.url
                      )}
                      alt={
                        selectedDocument.title
                      }
                      className="
                        w-full
                        max-w-3xl

                        rounded-lg

                        bg-white

                        object-contain

                        shadow-2xl
                      "
                    />

                  </div>
                )}

              </div>

              {/* =============================================
                  FOOTER
                  ============================================= */}

              <div
                className="
                  flex
                  shrink-0

                  items-center
                  justify-end

                  border-t
                  border-[#302D28]

                  bg-[#1A1917]

                  px-5
                  py-4
                "
              >

                <button
                  type="button"
                  onClick={closeDocument}
                  className="
                    rounded-full

                    border
                    border-[#38352E]

                    px-5
                    py-2.5

                    text-xs
                    font-semibold

                    text-[#AAA59F]

                    transition-all

                    hover:border-[#AAA59F]
                    hover:text-white
                  "
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}
    </>
  );
}

export default Documents;
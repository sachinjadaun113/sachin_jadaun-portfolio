import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Image as ImageIcon,
  X,
  Save,
  Loader2,
  CalendarDays,
  Building2,
  FileCheck2,
  Trophy,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function OwnerCertificateAchievement() {
  const location = useLocation();
  const navigate = useNavigate();

  /*
   * =====================================================
   * DETERMINE CURRENT TYPE
   * =====================================================
   */

  const isAchievement =
    location.pathname.includes("/achievements");

  const documentType = isAchievement
    ? "achievement"
    : "certificate";

  const pageTitle = "Certificates & Achivements";

  const pageDescription = isAchievement
    ? "Manage your achievements, awards and accomplishments."
    : "Manage your certificates, credentials and qualifications.";

  /*
   * =====================================================
   * FORM REF
   * =====================================================
   */

  const formRef = useRef(null);

  /*
   * =====================================================
   * STATE
   * =====================================================
   */

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    issuer: "",
    date: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  /*
   * =====================================================
   * FETCH DOCUMENTS
   * =====================================================
   */

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await api.get("/documents");

      if (response.data.success) {
        const allDocuments =
          response.data.documents || [];

        const filteredDocuments =
          allDocuments.filter(
            (document) =>
              document.type === documentType
          );

        setDocuments(filteredDocuments);
      }
    } catch (error) {
      console.error(
        "Fetch documents error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          `Unable to load ${pageTitle.toLowerCase()}`
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =====================================================
   * FETCH WHEN PAGE TYPE CHANGES
   * =====================================================
   */

  useEffect(() => {
    fetchDocuments();
  }, [documentType]);

  /*
   * =====================================================
   * SCROLL TO FORM
   * =====================================================
   */

  const scrollToForm = () => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  /*
   * =====================================================
   * RESET FORM
   * =====================================================
   */

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      issuer: "",
      date: "",
    });

    setSelectedFile(null);
    setEditingDocument(null);
    setShowForm(false);
  };

  /*
   * =====================================================
   * ADD DOCUMENT
   * =====================================================
   */

  const handleAdd = () => {
    setEditingDocument(null);

    setFormData({
      title: "",
      description: "",
      issuer: "",
      date: "",
    });

    setSelectedFile(null);

    setShowForm(true);

    scrollToForm();
  };

  /*
   * =====================================================
   * EDIT DOCUMENT
   * =====================================================
   */

  const handleEdit = (document) => {
    setEditingDocument(document);

    setFormData({
      title: document.title || "",
      description: document.description || "",
      issuer: document.issuer || "",
      date: document.date || "",
    });

    setSelectedFile(null);

    setShowForm(true);

    /*
     * Automatically scroll
     * to update form
     */
    scrollToForm();
  };

  /*
   * =====================================================
   * INPUT CHANGE
   * =====================================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * =====================================================
   * FILE CHANGE
   * =====================================================
   */

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Only PDF, JPG, JPEG, PNG and WEBP files are allowed."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error(
        "File size must be less than 50MB."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
  };

  /*
   * =====================================================
   * CREATE / UPDATE
   * =====================================================
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "type",
        documentType
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "issuer",
        formData.issuer.trim()
      );

      data.append(
        "date",
        formData.date.trim()
      );

      /*
       * Only append file if
       * user selected a new file.
       */

      if (selectedFile) {
        data.append(
          "document",
          selectedFile
        );
      }

      let response;

      /*
       * UPDATE
       */

      if (editingDocument) {
        response = await api.put(
          `/documents/${editingDocument._id}`,
          data
        );
      }

      /*
       * CREATE
       */

      else {
        response = await api.post(
          "/documents",
          data
        );
      }

      if (response.data.success) {
        toast.success(
          editingDocument
            ? `${
                isAchievement
                  ? "Achievement"
                  : "Certificate"
              } updated successfully`
            : `${
                isAchievement
                  ? "Achievement"
                  : "Certificate"
              } added successfully`
        );

        resetForm();

        await fetchDocuments();
      }
    } catch (error) {
      console.error(
        "Save document error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          `Unable to save ${
            isAchievement
              ? "achievement"
              : "certificate"
          }`
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * =====================================================
   * DELETE
   * =====================================================
   */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${
        isAchievement
          ? "achievement"
          : "certificate"
      }?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await api.delete(
        `/documents/${id}`
      );

      if (response.data.success) {
        toast.success(
          `${
            isAchievement
              ? "Achievement"
              : "Certificate"
          } deleted successfully`
        );

        setDocuments((previous) =>
          previous.filter(
            (document) =>
              document._id !== id
          )
        );
      }
    } catch (error) {
      console.error(
        "Delete document error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to delete document"
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =====================================================
   * LOADING
   * =====================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#DDD8CC] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm font-medium text-[#777266] dark:text-[#A6A198]">
            Loading{" "}
            {pageTitle.toLowerCase()}...
          </p>
        </div>
      </div>
    );
  }

  /*
   * =====================================================
   * MAIN UI
   * =====================================================
   */

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8]">

      {/* =================================================
          HEADER
          ================================================= */}

      <header className="sticky top-0 z-30 border-b border-[#DDD8CC]/80 bg-[#FAF8F2]/95 backdrop-blur-xl dark:border-[#2D2B27] dark:bg-[#181715]/95">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-3">

            <button
              type="button"
              onClick={() =>
                navigate("/owner")
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D8D1BF] bg-[#FAF8F2] text-[#666158] transition hover:bg-[#ECE7DC] hover:text-[#806510] dark:border-[#34312B] dark:bg-[#24221E] dark:text-[#A6A198] dark:hover:bg-[#302D26] dark:hover:text-[#D6B84C]"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] shadow-sm dark:bg-[#29251D] dark:text-[#D6B84C]">

              {isAchievement ? (
                <Trophy size={21} />
              ) : (
                <Award size={21} />
              )}

            </div>

            <div className="min-w-0">

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                Portfolio
              </p>

              <h1 className="truncate text-lg font-bold">
                {pageTitle}
              </h1>

            </div>

          </div>

          {/* ADD BUTTON */}

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#A37D1D] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#8F6D18] hover:shadow-lg dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
          >

            <Plus size={17} />

            <span className="hidden sm:inline">
              Add{" "}
              {isAchievement
                ? "Achievement"
                : "Certificate"}
            </span>

            <span className="sm:hidden">
              Add
            </span>

          </button>

        </div>
      </header>

      {/* =================================================
          MAIN
          ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE INTRO
            ================================================= */}

        <section className="mb-8 overflow-hidden rounded-3xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

          <div className="flex items-start gap-4">

            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] shadow-sm sm:flex dark:bg-[#29251D] dark:text-[#D6B84C]">

              {isAchievement ? (
                <Trophy size={25} />
              ) : (
                <Award size={25} />
              )}

            </div>

            <div>

              <p className="mb-1 text-sm font-semibold text-[#927016] dark:text-[#D6B84C]">
                Owner Panel
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Manage {pageTitle}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                {pageDescription}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            FORM
            ================================================= */}

        {showForm && (
          <section
            ref={formRef}
            className={`mb-8 scroll-mt-28 rounded-3xl border bg-[#FAF8F2] p-6 shadow-xl dark:bg-[#181715] ${
              editingDocument
                ? "border-[#A37D1D] ring-2 ring-[#EFE7D3] dark:border-[#D6B84C] dark:ring-[#29251D]"
                : "border-[#DDD8CC] dark:border-[#2D2B27]"
            }`}
          >

            {/* FORM HEADER */}

            <div className="mb-6 flex items-start justify-between gap-4">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">

                  {editingDocument ? (
                    <Pencil size={19} />
                  ) : (
                    <Plus size={19} />
                  )}

                </div>

                <div>

                  <h2 className="text-xl font-bold">

                    {editingDocument
                      ? `Update ${
                          isAchievement
                            ? "Achievement"
                            : "Certificate"
                        }`
                      : `Add ${
                          isAchievement
                            ? "Achievement"
                            : "Certificate"
                        }`}

                  </h2>

                  <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">

                    {editingDocument
                      ? "Update the information and optionally replace the file."
                      : "Fill in the information below to add a new item."}

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={resetForm}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#777266] transition hover:bg-[#ECE7DC] hover:text-[#25231F] dark:text-[#A6A198] dark:hover:bg-[#24221E] dark:hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* EDITING INDICATOR */}

            {editingDocument && (
              <div className="mb-6 rounded-2xl border border-[#D8D1BF] bg-[#EFE7D3] px-4 py-3 dark:border-[#4A4029] dark:bg-[#29251D]">

                <div className="flex items-center gap-2 text-sm font-medium text-[#806510] dark:text-[#D6B84C]">

                  <Pencil size={16} />

                  <span>
                    Editing:
                  </span>

                  <span className="font-bold">
                    {editingDocument.title}
                  </span>

                </div>

              </div>
            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* TITLE */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                  <FileCheck2
                    size={16}
                    className="text-[#A37D1D] dark:text-[#D6B84C]"
                  />

                  Title

                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={
                    isAchievement
                      ? "e.g. Hackathon Winner"
                      : "e.g. Full Stack Development Certificate"
                  }
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:bg-white focus:ring-4 focus:ring-[#EFE7D3] dark:border-[#34312B] dark:bg-[#121210] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#29251D]"
                />

              </div>

              {/* ISSUER */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                  <Building2
                    size={16}
                    className="text-[#A37D1D] dark:text-[#D6B84C]"
                  />

                  {isAchievement
                    ? "Organization"
                    : "Issuer"}

                </label>

                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder={
                    isAchievement
                      ? "e.g. AKTU"
                      : "e.g. Coursera"
                  }
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:bg-white focus:ring-4 focus:ring-[#EFE7D3] dark:border-[#34312B] dark:bg-[#121210] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#29251D]"
                />

              </div>

              {/* DATE */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                  <CalendarDays
                    size={16}
                    className="text-[#A37D1D] dark:text-[#D6B84C]"
                  />

                  Date

                </label>

                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="e.g. August 2026"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:bg-white focus:ring-4 focus:ring-[#EFE7D3] dark:border-[#34312B] dark:bg-[#121210] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#29251D]"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add a short description..."
                  className="w-full resize-none rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:bg-white focus:ring-4 focus:ring-[#EFE7D3] dark:border-[#34312B] dark:bg-[#121210] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#29251D]"
                />

              </div>

              {/* FILE */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">

                  <FileText
                    size={16}
                    className="text-[#A37D1D] dark:text-[#D6B84C]"
                  />

                  {editingDocument
                    ? "Replace File (optional)"
                    : `${
                        isAchievement
                          ? "Achievement"
                          : "Certificate"
                      } File`}

                </label>

                <div className="rounded-2xl border-2 border-dashed border-[#D8D1BF] bg-[#F5F1E8] p-4 dark:border-[#4A4029] dark:bg-[#24221E]">

                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="block w-full cursor-pointer rounded-xl border border-[#D8D1BF] bg-white p-3 text-sm text-[#555149] dark:border-[#34312B] dark:bg-[#121210] dark:text-[#D8D1BF]"
                  />

                  <p className="mt-2 text-xs text-[#777266] dark:text-[#A6A198]">
                    PDF, JPG, JPEG, PNG or WEBP.
                    Maximum 50MB.
                  </p>

                  {selectedFile && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#C9D8C1] bg-[#EEF5EA] px-3 py-2 text-sm font-medium text-[#49633D] dark:border-[#35462F] dark:bg-[#1D291B] dark:text-[#9FC58E]">

                      <FileCheck2 size={16} />

                      <span>
                        Selected:
                      </span>

                      <span className="truncate">
                        {selectedFile.name}
                      </span>

                    </div>
                  )}

                  {editingDocument?.url &&
                    !selectedFile && (
                      <p className="mt-3 text-xs text-[#777266] dark:text-[#A6A198]">
                        Existing file will remain
                        unchanged unless you
                        select a new file.
                      </p>
                    )}

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-[#D8D1BF] px-5 py-3 text-sm font-semibold text-[#666158] transition hover:bg-[#ECE7DC] disabled:opacity-50 dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A37D1D] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#8F6D18] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />

                      {editingDocument
                        ? "Update"
                        : "Save"}
                    </>
                  )}

                </button>

              </div>

            </form>
          </section>
        )}

        {/* =================================================
            DOCUMENT LIST
            ================================================= */}

        {documents.length === 0 ? (
          <section className="rounded-3xl border-2 border-dashed border-[#D8D1BF] bg-[#FAF8F2] p-10 text-center shadow-sm dark:border-[#34312B] dark:bg-[#181715]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] shadow-sm dark:bg-[#29251D] dark:text-[#D6B84C]">

              {isAchievement ? (
                <Trophy size={28} />
              ) : (
                <Award size={28} />
              )}

            </div>

            <h3 className="mt-5 text-xl font-bold">
              No {pageTitle.toLowerCase()} yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777266] dark:text-[#A6A198]">

              Add your first{" "}

              {isAchievement
                ? "achievement"
                : "certificate"}{" "}

              to display it on your portfolio.

            </p>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#8F6D18] hover:shadow-lg dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >

              <Plus size={17} />

              Add{" "}

              {isAchievement
                ? "Achievement"
                : "Certificate"}

            </button>

          </section>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">

            {documents.map((document) => (
              <article
                key={document._id}
                className="group rounded-3xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-[#B18A22]/50 hover:shadow-xl dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/40"
              >

                {/* =================================================
                    CARD HEADER
                    ================================================= */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] shadow-sm dark:bg-[#29251D] dark:text-[#D6B84C]">

                      {document.fileType ===
                      "image" ? (
                        <ImageIcon
                          size={21}
                        />
                      ) : (
                        <FileText
                          size={21}
                        />
                      )}

                    </div>

                    <div className="min-w-0">

                      <h3 className="break-words font-bold text-[#25231F] dark:text-white">
                        {document.title}
                      </h3>

                      {document.issuer && (
                        <p className="mt-1 text-sm font-medium text-[#927016] dark:text-[#D6B84C]">
                          {document.issuer}
                        </p>
                      )}

                    </div>

                  </div>

                  {document.date && (
                    <span className="flex shrink-0 items-center gap-1 rounded-lg bg-[#EFE7D3] px-2.5 py-1 text-xs font-semibold text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">

                      <CalendarDays
                        size={12}
                      />

                      {document.date}

                    </span>
                  )}

                </div>

                {/* =================================================
                    DESCRIPTION
                    ================================================= */}

                {document.description && (
                  <p className="mt-4 text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                    {document.description}
                  </p>
                )}

                {/* =================================================
                    FILE INFORMATION
                    ================================================= */}

                <div className="mt-5 rounded-2xl border border-[#E3DED2] bg-[#F5F1E8] px-4 py-3 dark:border-[#34312B] dark:bg-[#24221E]">

                  <div className="flex items-center gap-2 text-xs font-semibold text-[#666158] dark:text-[#C4BFB5]">

                    {document.fileType ===
                    "image" ? (
                      <>
                        <ImageIcon
                          size={15}
                          className="text-[#806510] dark:text-[#D6B84C]"
                        />

                        Image file
                      </>
                    ) : (
                      <>
                        <FileText
                          size={15}
                          className="text-[#A37D1D] dark:text-[#D6B84C]"
                        />

                        PDF document
                      </>
                    )}

                  </div>

                </div>

                {/* =================================================
                    ACTIONS
                    ================================================= */}

                <div className="mt-5 grid grid-cols-2 gap-2">

                  {/* EDIT */}

                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(document)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D1BF] bg-[#EFE7D3] px-3 py-2.5 text-sm font-semibold text-[#806510] transition hover:bg-[#E5D8B9] dark:border-[#4A4029] dark:bg-[#29251D] dark:text-[#D6B84C] dark:hover:bg-[#332D20]"
                  >

                    <Pencil size={16} />

                    Edit

                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        document._id
                      )
                    }
                    disabled={
                      deletingId ===
                      document._id
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E6B8B8] bg-[#FAEEEE] px-3 py-2.5 text-sm font-semibold text-[#B94A48] transition hover:bg-[#F6DEDE] disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/30"
                  >

                    {deletingId ===
                    document._id ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />

                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2
                          size={16}
                        />

                        Delete
                      </>
                    )}

                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default OwnerCertificateAchievement;
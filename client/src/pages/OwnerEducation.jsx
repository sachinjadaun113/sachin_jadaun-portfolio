import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Edit3,
  Trash2,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const initialForm = {
  degree: "",
  institution: "",
  field: "",
  startYear: "",
  endYear: "",
  grade: "",
  description: "",
  order: 0,
};

function OwnerEducation() {
  const navigate = useNavigate();

  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // FETCH EDUCATION
  // =====================================================

  const fetchEducations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/education");

      if (response.data.success) {
        setEducations(response.data.educations || []);
      } else {
        setEducations([]);
      }
    } catch (error) {
      console.error("Education fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load education"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // CREATE
  // =====================================================

  const handleCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (education) => {
    setEditingId(education._id);

    setFormData({
      degree: education.degree || "",
      institution: education.institution || "",
      field: education.field || "",
      startYear: education.startYear || "",
      endYear: education.endYear || "",
      grade: education.grade || "",
      description: education.description || "",
      order: education.order ?? 0,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const handleCloseForm = () => {
    if (submitLoading) {
      return;
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.degree.trim()) {
      toast.error("Please enter your degree");
      return;
    }

    if (!formData.institution.trim()) {
      toast.error("Please enter your institution");
      return;
    }

    try {
      setSubmitLoading(true);

      const payload = {
        degree: formData.degree.trim(),
        institution: formData.institution.trim(),
        field: formData.field.trim(),
        startYear: formData.startYear.trim(),
        endYear: formData.endYear.trim(),
        grade: formData.grade.trim(),
        description: formData.description.trim(),
        order: Number(formData.order) || 0,
      };

      let response;

      if (editingId) {
        response = await api.put(
          `/education/${editingId}`,
          payload
        );
      } else {
        response = await api.post(
          "/education",
          payload
        );
      }

      if (response.data.success) {
        toast.success(
          editingId
            ? "Education updated successfully"
            : "Education created successfully"
        );

        setShowForm(false);
        setEditingId(null);
        setFormData(initialForm);

        await fetchEducations();
      }
    } catch (error) {
      console.error("Education save error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save education"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      const response = await api.delete(
        `/education/${id}`
      );

      if (response.data.success) {
        toast.success(
          "Education deleted successfully"
        );

        setEducations((previous) =>
          previous.filter(
            (education) =>
              education._id !== id
          )
        );
      }
    } catch (error) {
      console.error("Education delete error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete education"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading education...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8]">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#DDD8CC] bg-[#FAF8F2]/95 backdrop-blur dark:border-[#2D2B27] dark:bg-[#181715]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/owner")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8D1BF] text-[#666158] transition hover:bg-[#ECE7DC] dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                Portfolio
              </p>

              <h1 className="text-lg font-bold">
                Education Management
              </h1>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="hidden items-center gap-2 rounded-xl border border-[#D8D1BF] px-4 py-2.5 text-sm font-medium text-[#666158] transition hover:bg-[#ECE7DC] sm:flex dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
          >
            <ExternalLink size={16} />
            View Portfolio
          </button>

        </div>
      </header>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE INTRO
            ================================================= */}

        <section className="mb-8 rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                <GraduationCap size={22} />
              </div>

              <div>

                <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                  Manage your academic background
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Education
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                  Add and manage your degrees,
                  institutions, academic achievements
                  and educational qualifications displayed
                  on your portfolio.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] hover:shadow-md dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <Plus size={17} />
              Add Education
            </button>

          </div>

        </section>

        {/* =================================================
            FORM
            ================================================= */}

        {showForm && (
          <section className="mb-8 rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Update Education"
                    : "Add New Education"}
                </h2>

                <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
                  Fill in your academic details below.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777266] transition hover:bg-[#ECE7DC] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
              >
                <X size={19} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* DEGREE + INSTITUTION */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Degree
                  </label>

                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech"
                    required
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Institution
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="e.g. Aligarh College of Engineering & Technology"
                    required
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

              </div>

              {/* FIELD + GRADE */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Field of Study
                  </label>

                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Grade / CGPA
                  </label>

                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    placeholder="e.g. 8.0 CGPA"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

              </div>

              {/* YEARS */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Start Year
                  </label>

                  <input
                    type="text"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                    placeholder="e.g. 2023"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    End Year
                  </label>

                  <input
                    type="text"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />
                </div>

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
                  rows={5}
                  placeholder="Describe your education, coursework, achievements, activities, etc."
                  className="w-full resize-y rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                />
              </div>

              {/* ORDER */}

              <div className="max-w-xs">

                <label className="mb-2 block text-sm font-semibold">
                  Display Order
                </label>

                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                />

                <p className="mt-2 text-xs text-[#777266] dark:text-[#A6A198]">
                  Lower numbers appear first.
                </p>

              </div>

              {/* FORM BUTTONS */}

              <div className="flex flex-col gap-3 border-t border-[#DDD8CC] pt-6 sm:flex-row sm:justify-end dark:border-[#302D28]">

                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={submitLoading}
                  className="rounded-xl border border-[#D8D1BF] px-5 py-3 text-sm font-semibold text-[#666158] transition hover:bg-[#ECE7DC] disabled:opacity-50 dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="rounded-xl bg-[#A37D1D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
                >
                  {submitLoading
                    ? editingId
                      ? "Updating..."
                      : "Creating..."
                    : editingId
                    ? "Update Education"
                    : "Create Education"}
                </button>

              </div>

            </form>

          </section>
        )}

        {/* =================================================
            EDUCATION LIST HEADING
            ================================================= */}

        <div className="mb-5">

          <h2 className="text-xl font-bold">
            Your Education
          </h2>

          <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
            {educations.length}{" "}
            {educations.length === 1
              ? "education"
              : "education records"}{" "}
            available
          </p>

        </div>

        {/* =================================================
            EMPTY STATE
            ================================================= */}

        {educations.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-[#CFC6B6] bg-[#FAF8F2] px-6 py-16 text-center dark:border-[#39362F] dark:bg-[#181715]">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <GraduationCap size={24} />
            </div>

            <h3 className="text-lg font-semibold">
              No education added yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
              Add your educational qualification
              to display it on your public portfolio.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <Plus size={17} />
              Add Education
            </button>

          </section>
        ) : (

          /* =================================================
             EDUCATION CARDS
             ================================================= */

          <div className="grid gap-5 lg:grid-cols-2">

            {educations.map((education) => (

              <article
                key={education._id}
                className="group rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B18A22]/40 hover:shadow-lg dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/30"
              >

                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                      <GraduationCap size={20} />
                    </div>

                    <div>

                      <h3 className="text-lg font-bold">
                        {education.degree}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-[#927016] dark:text-[#D6B84C]">
                        {education.institution}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex shrink-0 items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(education)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1BF] text-[#777266] transition hover:border-[#A37D1D]/50 hover:bg-[#EFE7D3] hover:text-[#806510] dark:border-[#34312B] dark:text-[#A6A198] dark:hover:border-[#D6B84C]/40 dark:hover:bg-[#29251D] dark:hover:text-[#D6B84C]"
                      title="Edit education"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          education._id
                        )
                      }
                      disabled={
                        deleteLoading ===
                        education._id
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1BF] text-[#777266] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#34312B] dark:text-[#A6A198] dark:hover:border-red-900/50 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                      title="Delete education"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {(education.startYear ||
                    education.endYear) && (
                    <span className="rounded-full border border-[#C9A227]/30 bg-[#E8D9A8]/40 px-3 py-1.5 text-xs font-semibold text-[#806510] dark:border-[#D6B84C]/30 dark:bg-[#D6B84C]/10 dark:text-[#D6B84C]">
                      {education.startYear ||
                        "Start"}

                      {" — "}

                      {education.endYear ||
                        "Present"}
                    </span>
                  )}

                  {education.field && (
                    <span className="rounded-full border border-[#DDD8CC] bg-[#F3F0E8] px-3 py-1.5 text-xs font-medium text-[#777266] dark:border-[#34312B] dark:bg-[#24221F] dark:text-[#A6A198]">
                      {education.field}
                    </span>
                  )}

                  {education.grade && (
                    <span className="rounded-full border border-[#DDD8CC] bg-[#F3F0E8] px-3 py-1.5 text-xs font-medium text-[#777266] dark:border-[#34312B] dark:bg-[#24221F] dark:text-[#A6A198]">
                      {education.grade}
                    </span>
                  )}

                </div>

                {/* DESCRIPTION */}

                {education.description && (
                  <p className="mt-5 text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                    {education.description}
                  </p>
                )}

              </article>

            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default OwnerEducation;
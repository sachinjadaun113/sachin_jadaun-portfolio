import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Edit3,
  Trash2,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const initialForm = {
  role: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  technologies: "",
  companyUrl: "",
  order: 0,
};

function OwnerExperience() {
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialForm);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // =====================================================
  // FETCH EXPERIENCES
  // =====================================================

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const response = await api.get("/experience");

      if (response.data.success) {
        setExperiences(response.data.experiences || []);
      } else {
        setExperiences([]);
      }
    } catch (error) {
      console.error("Experience fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load experiences"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // OPEN CREATE FORM
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
  // OPEN EDIT FORM
  // =====================================================

  const handleEdit = (experience) => {
    setEditingId(experience._id);

    setFormData({
      role: experience.role || "",
      company: experience.company || "",
      location: experience.location || "",
      startDate: experience.startDate || "",
      endDate: experience.endDate || "",
      currentlyWorking: experience.currentlyWorking || false,
      description: experience.description || "",
      technologies: Array.isArray(experience.technologies)
        ? experience.technologies.join(", ")
        : "",
      companyUrl: experience.companyUrl || "",
      order: experience.order ?? 0,
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
  // SUBMIT FORM
  // CREATE + UPDATE
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.role.trim()) {
      toast.error("Please enter your role");
      return;
    }

    if (!formData.company.trim()) {
      toast.error("Please enter company name");
      return;
    }

    try {
      setSubmitLoading(true);

      const technologies = formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

      const payload = {
        role: formData.role.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        startDate: formData.startDate.trim(),
        endDate: formData.currentlyWorking
          ? ""
          : formData.endDate.trim(),
        currentlyWorking: formData.currentlyWorking,
        description: formData.description.trim(),
        technologies,
        companyUrl: formData.companyUrl.trim(),
        order: Number(formData.order) || 0,
      };

      let response;

      // =================================================
      // UPDATE EXPERIENCE
      // =================================================

      if (editingId) {
        response = await api.put(
          `/experience/${editingId}`,
          payload
        );
      }

      // =================================================
      // CREATE EXPERIENCE
      // =================================================

      else {
        response = await api.post(
          "/experience",
          payload
        );
      }

      if (response.data.success) {
        toast.success(
          editingId
            ? "Experience updated successfully"
            : "Experience created successfully"
        );

        setShowForm(false);
        setEditingId(null);
        setFormData(initialForm);

        await fetchExperiences();
      }
    } catch (error) {
      console.error("Experience save error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save experience"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =====================================================
  // DELETE EXPERIENCE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      const response = await api.delete(
        `/experience/${id}`
      );

      if (response.data.success) {
        toast.success(
          "Experience deleted successfully"
        );

        setExperiences((previous) =>
          previous.filter(
            (experience) =>
              experience._id !== id
          )
        );
      }
    } catch (error) {
      console.error("Experience delete error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete experience"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading experiences...
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
                Experience Management
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
                <BriefcaseBusiness size={22} />
              </div>

              <div>

                <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                  Manage your professional journey
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Experience
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                  Add and manage your work experience,
                  internships, roles and professional
                  responsibilities displayed on your portfolio.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] hover:shadow-md dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <Plus size={17} />
              Add Experience
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
                    ? "Update Experience"
                    : "Add New Experience"}
                </h2>

                <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
                  Fill in the details below.
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

              {/* ROLE + COMPANY */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Role / Position
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer Intern"
                    required
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. ABC Technologies"
                    required
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

              </div>

              {/* LOCATION + COMPANY URL */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Noida, India / Remote"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Company Website
                  </label>

                  <input
                    type="url"
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

              </div>

              {/* DATES */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Start Date
                  </label>

                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g. June 2025"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    End Date
                  </label>

                  <input
                    type="text"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.currentlyWorking}
                    placeholder="e.g. August 2025"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                  />

                </div>

              </div>

              {/* CURRENTLY WORKING */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#DDD8CC] bg-[#F5F1E8] p-4 dark:border-[#302D28] dark:bg-[#211F1C]">

                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#A37D1D]"
                />

                <div>

                  <p className="text-sm font-semibold">
                    I currently work here
                  </p>

                  <p className="mt-1 text-xs text-[#777266] dark:text-[#A6A198]">
                    The end date will be hidden when this is enabled.
                  </p>

                </div>

              </label>

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
                  placeholder="Describe your responsibilities, achievements and work..."
                  className="w-full resize-y rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                />

              </div>

              {/* TECHNOLOGIES */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, Express, MongoDB"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#34312B] dark:bg-[#121210] dark:focus:border-[#D6B84C]"
                />

                <p className="mt-2 text-xs text-[#777266] dark:text-[#A6A198]">
                  Separate technologies with commas.
                </p>

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
                    ? "Update Experience"
                    : "Create Experience"}
                </button>

              </div>

            </form>

          </section>
        )}

        {/* =================================================
            EXPERIENCE LIST HEADING
            ================================================= */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Your Experiences
            </h2>

            <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
              {experiences.length}{" "}
              {experiences.length === 1
                ? "experience"
                : "experiences"}{" "}
              available
            </p>

          </div>

        </div>

        {/* =================================================
            EMPTY STATE
            ================================================= */}

        {experiences.length === 0 ? (

          <section className="rounded-2xl border border-dashed border-[#CFC6B6] bg-[#FAF8F2] px-6 py-16 text-center dark:border-[#39362F] dark:bg-[#181715]">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <BriefcaseBusiness size={24} />
            </div>

            <h3 className="text-lg font-semibold">
              No experience added yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
              Add your first work experience or internship
              to display it on your public portfolio.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <Plus size={17} />
              Add Experience
            </button>

          </section>

        ) : (

          /* =================================================
             EXPERIENCE CARDS
             ================================================= */

          <div className="grid gap-5 lg:grid-cols-2">

            {experiences.map((experience) => (

              <article
                key={experience._id}
                className="group rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B18A22]/40 hover:shadow-lg dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/30"
              >

                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                      <BriefcaseBusiness size={20} />
                    </div>

                    <div>

                      <h3 className="text-lg font-bold">
                        {experience.role}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-[#927016] dark:text-[#D6B84C]">
                        {experience.company}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex shrink-0 items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(experience)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1BF] text-[#777266] transition hover:border-[#A37D1D]/50 hover:bg-[#EFE7D3] hover:text-[#806510] dark:border-[#34312B] dark:text-[#A6A198] dark:hover:border-[#D6B84C]/40 dark:hover:bg-[#29251D] dark:hover:text-[#D6B84C]"
                      title="Edit experience"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(experience._id)
                      }
                      disabled={
                        deleteLoading ===
                        experience._id
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D8D1BF] text-[#777266] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#34312B] dark:text-[#A6A198] dark:hover:border-red-900/50 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                      title="Delete experience"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

                {/* DATE + LOCATION */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {(experience.startDate ||
                    experience.endDate ||
                    experience.currentlyWorking) && (

                    <span className="rounded-full border border-[#C9A227]/30 bg-[#E8D9A8]/40 px-3 py-1.5 text-xs font-semibold text-[#806510] dark:border-[#D6B84C]/30 dark:bg-[#D6B84C]/10 dark:text-[#D6B84C]">

                      {experience.startDate ||
                        "Start"}

                      {" — "}

                      {experience.currentlyWorking
                        ? "Present"
                        : experience.endDate ||
                          "End"}

                    </span>

                  )}

                  {experience.location && (

                    <span className="rounded-full border border-[#DDD8CC] bg-[#F3F0E8] px-3 py-1.5 text-xs font-medium text-[#777266] dark:border-[#34312B] dark:bg-[#24221F] dark:text-[#A6A198]">
                      {experience.location}
                    </span>

                  )}

                </div>

                {/* DESCRIPTION */}

                {experience.description && (

                  <p className="mt-5 text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                    {experience.description}
                  </p>

                )}

                {/* TECHNOLOGIES */}

                {Array.isArray(
                  experience.technologies
                ) &&
                  experience.technologies.length >
                    0 && (

                    <div className="mt-5 flex flex-wrap gap-2">

                      {experience.technologies.map(
                        (technology, index) => (

                          <span
                            key={`${technology}-${index}`}
                            className="rounded-lg bg-[#EFE7D3] px-2.5 py-1.5 text-xs font-medium text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]"
                          >
                            {technology}
                          </span>

                        )
                      )}

                    </div>

                  )}

                {/* COMPANY LINK */}

                {experience.companyUrl && (

                  <div className="mt-5 border-t border-[#DDD8CC] pt-4 dark:border-[#302D28]">

                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#927016] transition hover:text-[#806010] dark:text-[#D6B84C] dark:hover:text-[#E3C867]"
                    >
                      <ExternalLink size={14} />
                      Visit Company Website
                    </a>

                  </div>

                )}

              </article>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default OwnerExperience;
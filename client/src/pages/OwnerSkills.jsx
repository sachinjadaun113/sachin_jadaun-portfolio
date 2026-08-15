import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Code2,
  X,
  Save,
  Loader2,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Programming",
  "Tools",
  "Other",
];

const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const emptyForm = {
  name: "",
  category: "Frontend",
  level: "Intermediate",
  icon: "",
  order: 0,
};

function OwnerSkills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // FETCH SKILLS
  // ==========================================

  const fetchSkills = async () => {
    try {
      setLoading(true);

      const response = await api.get("/skills");

      if (response.data.success) {
        setSkills(response.data.skills || []);
      } else {
        setSkills([]);
      }
    } catch (error) {
      console.error("Fetch skills error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load skills"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ==========================================
  // OPEN CREATE FORM
  // ==========================================

  const openCreateForm = () => {
    setEditingSkill(null);

    setFormData({
      ...emptyForm,
    });

    setFormOpen(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (skill) => {
    setEditingSkill(skill);

    setFormData({
      name: skill.name || "",
      category: skill.category || "Frontend",
      level: skill.level || "Intermediate",
      icon: skill.icon || "",
      order: skill.order ?? 0,
    });

    setFormOpen(true);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {
    if (saving) {
      return;
    }

    setFormOpen(false);
    setEditingSkill(null);
    setFormData({
      ...emptyForm,
    });
  };

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  // ==========================================
  // CREATE / UPDATE SKILL
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Skill name is required");
      return;
    }

    try {
      setSaving(true);

      if (editingSkill) {
        const response = await api.put(
          `/skills/${editingSkill._id}`,
          formData
        );

        if (response.data.success) {
          toast.success(
            "Skill updated successfully"
          );

          closeForm();
          fetchSkills();
        }
      } else {
        const response = await api.post(
          "/skills",
          formData
        );

        if (response.data.success) {
          toast.success(
            "Skill created successfully"
          );

          closeForm();
          fetchSkills();
        }
      }
    } catch (error) {
      console.error("Save skill error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to save skill"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE SKILL
  // ==========================================

  const handleDelete = async (skill) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${skill.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(skill._id);

      const response = await api.delete(
        `/skills/${skill._id}`
      );

      if (response.data.success) {
        toast.success(
          "Skill deleted successfully"
        );

        setSkills((previous) =>
          previous.filter(
            (item) => item._id !== skill._id
          )
        );
      }
    } catch (error) {
      console.error("Delete skill error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete skill"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // LEVEL STYLE
  // ==========================================

  const getLevelStyle = (level) => {
    if (level === "Advanced") {
      return "bg-[#E8D9A8]/50 text-[#806510] border-[#C9A227]/30 dark:bg-[#D6B84C]/10 dark:text-[#D6B84C] dark:border-[#D6B84C]/30";
    }

    if (level === "Intermediate") {
      return "bg-[#EEE9DE] text-[#6D6960] border-[#D8D1BF] dark:bg-[#292720] dark:text-[#B8B2A7] dark:border-[#3A372F]";
    }

    return "bg-[#F2EEE5] text-[#817B71] border-[#DDD6C9] dark:bg-[#211F1C] dark:text-[#918C83] dark:border-[#34312B]";
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#A37D1D] dark:bg-[#29251D] dark:text-[#D6B84C]">
            <Loader2
              size={22}
              className="animate-spin"
            />
          </div>

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading skills...
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
              onClick={() =>
                navigate("/owner")
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8D1BF] text-[#666158] transition hover:bg-[#ECE7DC] dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <Code2 size={21} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                Portfolio
              </p>

              <h1 className="text-lg font-bold">
                Manage Skills
              </h1>
            </div>

          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-xl bg-[#A37D1D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8F6D18] dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
          >
            <Plus size={17} />

            <span className="hidden sm:inline">
              Add Skill
            </span>

            <span className="sm:hidden">
              Add
            </span>
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

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-medium text-[#927016] dark:text-[#D6B84C]">
                Technical Skills
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Manage Your Skills
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                Add, update, organize and remove
                the skills displayed on your
                public portfolio.
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-[#D8D1BF] bg-[#F3F0E8] px-5 py-3 text-center dark:border-[#34312B] dark:bg-[#211F1C]">
              <p className="text-2xl font-bold text-[#806510] dark:text-[#D6B84C]">
                {skills.length}
              </p>

              <p className="text-xs font-medium text-[#777266] dark:text-[#A6A198]">
                Total Skills
              </p>
            </div>

          </div>

        </section>

        {/* =================================================
            SKILLS LIST
            ================================================= */}

        {skills.length > 0 ? (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {skills.map((skill) => (

              <div
                key={skill._id}
                className="group flex h-full flex-col rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B18A22]/40 hover:shadow-lg dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/30"
              >

                {/* CARD TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                      <Code2 size={20} />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate font-semibold text-[#25231F] dark:text-[#F1EFE8]">
                        {skill.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-[#817B71] dark:text-[#918C83]">
                        {skill.category}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-1 text-[#A6A198]">
                    <GripVertical size={16} />
                  </div>

                </div>

                {/* CATEGORY / LEVEL */}

                <div className="mt-5 flex flex-wrap gap-2">

                  <span className="rounded-full border border-[#C9A227]/30 bg-[#E8D9A8]/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#806510] dark:border-[#D6B84C]/30 dark:bg-[#D6B84C]/10 dark:text-[#D6B84C]">
                    {skill.category}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${getLevelStyle(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>

                </div>

                {/* ICON / ORDER */}

                <div className="mt-5 space-y-2 text-xs text-[#817B71] dark:text-[#918C83]">

                  {skill.icon && (
                    <p>
                      <span className="font-semibold text-[#666158] dark:text-[#A6A198]">
                        Icon:
                      </span>{" "}
                      {skill.icon}
                    </p>
                  )}

                  <p>
                    <span className="font-semibold text-[#666158] dark:text-[#A6A198]">
                      Display order:
                    </span>{" "}
                    {skill.order ?? 0}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-auto flex gap-3 border-t border-[#DDD6C9] pt-5 dark:border-[#302D28]">

                  <button
                    type="button"
                    onClick={() =>
                      openEditForm(skill)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D8D1BF] px-4 py-2.5 text-xs font-semibold text-[#666158] transition hover:border-[#A37D1D]/50 hover:bg-[#F1ECDD] hover:text-[#806510] dark:border-[#38352E] dark:text-[#A6A198] dark:hover:border-[#D6B84C]/40 dark:hover:bg-[#24221E] dark:hover:text-[#D6B84C]"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(skill)
                    }
                    disabled={
                      deletingId === skill._id
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D8C8C1] px-4 py-2.5 text-xs font-semibold text-[#8A5C50] transition hover:bg-[#F2E5E0] hover:text-[#7A493D] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#49332E] dark:text-[#B68B80] dark:hover:bg-[#2A201D] dark:hover:text-[#D1A49A]"
                  >
                    {deletingId === skill._id ? (
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={15} />
                    )}

                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
             ================================================= */

          <div className="rounded-2xl border border-dashed border-[#CFC6B6] bg-[#FAF8F2] px-6 py-16 text-center dark:border-[#39362F] dark:bg-[#181715]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <Code2 size={24} />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No skills added yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
              Start building your skills section
              by adding your first technical skill.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <Plus size={17} />
              Add Your First Skill
            </button>

          </div>
        )}

      </main>

      {/* =====================================================
          CREATE / EDIT MODAL
          ===================================================== */}

      {formOpen && (

        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeForm}
        >

          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] shadow-2xl dark:border-[#302D28] dark:bg-[#181715]"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-[#DDD8CC] px-6 py-5 dark:border-[#302D28]">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                  {editingSkill
                    ? "Update Skill"
                    : "New Skill"}
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {editingSkill
                    ? "Edit Skill"
                    : "Add Skill"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777266] transition hover:bg-[#ECE7DC] hover:text-[#25231F] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#A6A198] dark:hover:bg-[#24221E] dark:hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Skill Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. React.js"
                  required
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA49A] focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#38352E] dark:bg-[#211F1C] dark:text-[#F1EFE8] dark:placeholder:text-[#68645D] dark:focus:border-[#D6B84C] dark:focus:ring-[#D6B84C]/10"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#38352E] dark:bg-[#211F1C] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#D6B84C]/10"
                >
                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* LEVEL */}

              <div>

                <label
                  htmlFor="level"
                  className="mb-2 block text-sm font-semibold"
                >
                  Skill Level
                </label>

                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#38352E] dark:bg-[#211F1C] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#D6B84C]/10"
                >
                  {levels.map((level) => (
                    <option
                      key={level}
                      value={level}
                    >
                      {level}
                    </option>
                  ))}
                </select>

              </div>

              {/* ICON */}

              <div>

                <label
                  htmlFor="icon"
                  className="mb-2 block text-sm font-semibold"
                >
                  Icon Identifier
                  <span className="ml-2 text-xs font-normal text-[#817B71] dark:text-[#918C83]">
                    Optional
                  </span>
                </label>

                <input
                  id="icon"
                  name="icon"
                  type="text"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="e.g. react, java, mongodb"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA49A] focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#38352E] dark:bg-[#211F1C] dark:text-[#F1EFE8] dark:placeholder:text-[#68645D] dark:focus:border-[#D6B84C] dark:focus:ring-[#D6B84C]/10"
                />

                <p className="mt-2 text-xs leading-5 text-[#817B71] dark:text-[#918C83]">
                  Store the identifier used by your
                  public Skills component.
                </p>

              </div>

              {/* ORDER */}

              <div>

                <label
                  htmlFor="order"
                  className="mb-2 block text-sm font-semibold"
                >
                  Display Order
                </label>

                <input
                  id="order"
                  name="order"
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#AAA49A] focus:border-[#A37D1D] focus:ring-2 focus:ring-[#A37D1D]/10 dark:border-[#38352E] dark:bg-[#211F1C] dark:text-[#F1EFE8] dark:focus:border-[#D6B84C] dark:focus:ring-[#D6B84C]/10"
                />

                <p className="mt-2 text-xs leading-5 text-[#817B71] dark:text-[#918C83]">
                  Lower numbers appear first.
                </p>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-[#DDD8CC] pt-5 sm:flex-row sm:justify-end dark:border-[#302D28]">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="rounded-xl border border-[#D8D1BF] px-5 py-2.5 text-sm font-semibold text-[#666158] transition hover:bg-[#ECE7DC] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#38352E] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#A37D1D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin"
                      />

                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />

                      {editingSkill
                        ? "Update Skill"
                        : "Create Skill"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default OwnerSkills;
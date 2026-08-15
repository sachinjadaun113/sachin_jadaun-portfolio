import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function OwnerProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  const [media, setMedia] = useState([]);

  // Images selected for deletion
  const [deleteImages, setDeleteImages] = useState([]);

  // ==========================================
  // GET PROJECTS
  // ==========================================

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await api.get("/projects");

      if (response.data.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);

      if (error.response?.status === 401) {
        toast.error("Please login again");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Unable to load projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================================
  // TECHNOLOGY CHANGE
  // ==========================================

  const handleTechnologyChange = (
    index,
    value
  ) => {
    setFormData((previous) => {
      const technologies = [
        ...previous.technologies,
      ];

      technologies[index] = value;

      return {
        ...previous,
        technologies,
      };
    });
  };

  // ==========================================
  // ADD TECHNOLOGY
  // ==========================================

  const addTechnology = () => {
    setFormData((previous) => ({
      ...previous,
      technologies: [
        ...previous.technologies,
        "",
      ],
    }));
  };

  // ==========================================
  // REMOVE TECHNOLOGY
  // ==========================================

  const removeTechnology = (index) => {
    setFormData((previous) => ({
      ...previous,
      technologies:
        previous.technologies.filter(
          (_, technologyIndex) =>
            technologyIndex !== index
        ),
    }));
  };

  // ==========================================
  // MEDIA CHANGE
  // ==========================================

  const handleMediaChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length > 10) {
      toast.error(
        "You can upload maximum 10 files"
      );

      event.target.value = "";
      return;
    }

    setMedia(files);
  };

  // ==========================================
  // SELECT IMAGE FOR DELETION
  // ==========================================

  const handleDeleteImageSelect = (imageUrl) => {
    setDeleteImages((previous) => {
      if (previous.includes(imageUrl)) {
        return previous.filter(
          (image) => image !== imageUrl
        );
      }

      return [...previous, imageUrl];
    });
  };

  // ==========================================
  // CREATE / UPDATE PROJECT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      toast.error(
        "Project title is required"
      );

      return;
    }

    if (!formData.description.trim()) {
      toast.error(
        "Project description is required"
      );

      return;
    }

    try {
      setFormLoading(true);

      const data = new FormData();

      // ==========================================
      // BASIC DATA
      // ==========================================

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      // ==========================================
      // TECHNOLOGIES
      // ==========================================

      const technologies =
        formData.technologies
          .map((technology) =>
            technology.trim()
          )
          .filter(Boolean);

      data.append(
        "technologies",
        JSON.stringify(technologies)
      );

      // ==========================================
      // URLS
      // ==========================================

      data.append(
        "githubUrl",
        formData.githubUrl
      );

      data.append(
        "liveUrl",
        formData.liveUrl
      );

      data.append(
        "featured",
        String(formData.featured)
      );

      // ==========================================
      // DELETE SELECTED EXISTING IMAGES
      // ==========================================

      if (
        editingProject &&
        deleteImages.length > 0
      ) {
        data.append(
          "deleteImages",
          JSON.stringify(deleteImages)
        );
      }

      // ==========================================
      // ADD NEW MEDIA
      // ==========================================

      media.forEach((file) => {
        data.append(
          "media",
          file
        );
      });

      // ==========================================
      // API REQUEST
      // ==========================================

      let response;

      if (editingProject) {
        response = await api.put(
          `/projects/${editingProject._id}`,
          data
        );
      } else {
        response = await api.post(
          "/projects",
          data
        );
      }

      if (response.data.success) {
        toast.success(
          editingProject
            ? "Project updated successfully"
            : "Project created successfully"
        );

        resetForm();

        await fetchProjects();
      }
    } catch (error) {
      console.error(
        "Save project error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        toast.error(
          "Please login again"
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Unable to save project"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ==========================================
  // EDIT PROJECT
  // ==========================================

  const handleEdit = (project) => {
    setEditingProject(project);

    setFormData({
      title: project.title || "",

      description:
        project.description || "",

      technologies:
        Array.isArray(
          project.technologies
        )
          ? [...project.technologies]
          : [],

      githubUrl:
        project.githubUrl || "",

      liveUrl:
        project.liveUrl || "",

      featured:
        Boolean(project.featured),
    });

    setMedia([]);

    // Clear previous image deletion selections
    setDeleteImages([]);

    const mediaInput =
      document.getElementById(
        "project-media"
      );

    if (mediaInput) {
      mediaInput.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE COMPLETE PROJECT
  // ==========================================

  const handleDelete = async (
    projectId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(true);

      const response =
        await api.delete(
          `/projects/${projectId}`
        );

      if (response.data.success) {
        toast.success(
          "Project deleted successfully"
        );

        setProjects((previous) =>
          previous.filter(
            (project) =>
              project._id !== projectId
          )
        );

        if (
          editingProject &&
          editingProject._id ===
            projectId
        ) {
          resetForm();
        }
      }
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      if (
        error.response?.status === 401
      ) {
        toast.error(
          "Please login again"
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Unable to delete project"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setEditingProject(null);

    setFormData({
      title: "",
      description: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      featured: false,
    });

    setMedia([]);

    setDeleteImages([]);

    const mediaInput =
      document.getElementById(
        "project-media"
      );

    if (mediaInput) {
      mediaInput.value = "";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-[#D8D1BF]
              border-t-[#A37D1D]
              dark:border-[#34312B]
              dark:border-t-[#D6B84C]
            "
          />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className="
        min-h-screen
        bg-[#F3F0E8]
        px-4
        py-8
        text-[#25231F]
        dark:bg-[#10100F]
        dark:text-[#F1EFE8]
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* ==========================================
            HEADER
            ========================================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#927016]
                dark:text-[#D6B84C]
              "
            >
              Portfolio
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Manage Projects
            </h1>

            <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
              Create, update and delete your
              portfolio projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/owner")
            }
            className="
              rounded-xl
              border
              border-[#D8D1BF]
              px-4
              py-2.5
              text-sm
              font-semibold
              transition
              hover:bg-[#ECE7DC]
              dark:border-[#34312B]
              dark:hover:bg-[#24221E]
            "
          >
            ← Dashboard
          </button>
        </div>

        {/* ==========================================
            FORM
            ========================================== */}

        <section
          className="
            mb-10
            rounded-2xl
            border
            border-[#DDD8CC]
            bg-[#FAF8F2]
            p-6
            shadow-sm
            dark:border-[#2D2B27]
            dark:bg-[#181715]
          "
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold">
              {editingProject
                ? "Update Project"
                : "Create Project"}
            </h2>

            <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
              {editingProject
                ? "Update the selected project."
                : "Add a new project to your portfolio."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* ==========================================
                TITLE
                ========================================== */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#D8D1BF]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#A37D1D]
                  dark:border-[#34312B]
                  dark:bg-[#10100F]
                "
              />
            </div>

            {/* ==========================================
                DESCRIPTION
                ========================================== */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                rows={5}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#D8D1BF]
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#A37D1D]
                  dark:border-[#34312B]
                  dark:bg-[#10100F]
                "
              />
            </div>

            {/* ==========================================
                TECHNOLOGIES
                ========================================== */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Technologies
              </label>

              <div className="space-y-3">
                {formData.technologies.length ===
                  0 && (
                  <p className="text-sm text-[#777266] dark:text-[#A6A198]">
                    No technologies added yet.
                  </p>
                )}

                {formData.technologies.map(
                  (
                    technology,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={
                          technology
                        }
                        onChange={(
                          event
                        ) =>
                          handleTechnologyChange(
                            index,
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="React"
                        className="
                          flex-1
                          rounded-xl
                          border
                          border-[#D8D1BF]
                          bg-white
                          px-4
                          py-3
                          text-sm
                          outline-none
                          transition
                          focus:border-[#A37D1D]
                          dark:border-[#34312B]
                          dark:bg-[#10100F]
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeTechnology(
                            index
                          )
                        }
                        className="
                          rounded-xl
                          border
                          border-red-300
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-red-600
                          transition
                          hover:bg-red-50
                          dark:border-red-900
                          dark:hover:bg-red-950
                        "
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={
                  addTechnology
                }
                className="
                  mt-3
                  rounded-xl
                  border
                  border-[#D8D1BF]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  transition
                  hover:bg-[#ECE7DC]
                  dark:border-[#34312B]
                  dark:hover:bg-[#24221E]
                "
              >
                + Add Technology
              </button>

              <p className="mt-2 text-xs text-[#777266] dark:text-[#A6A198]">
                Add each technology separately.
              </p>
            </div>

            {/* ==========================================
                URLS
                ========================================== */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  GitHub URL
                </label>

                <input
                  type="url"
                  name="githubUrl"
                  value={
                    formData.githubUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://github.com/..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#D8D1BF]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#A37D1D]
                    dark:border-[#34312B]
                    dark:bg-[#10100F]
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Live URL
                </label>

                <input
                  type="url"
                  name="liveUrl"
                  value={
                    formData.liveUrl
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="https://..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#D8D1BF]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#A37D1D]
                    dark:border-[#34312B]
                    dark:bg-[#10100F]
                  "
                />
              </div>

            </div>

            {/* ==========================================
                EXISTING IMAGES
                ========================================== */}

            {editingProject &&
              Array.isArray(
                editingProject.images
              ) &&
              editingProject.images.length >
                0 && (
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-semibold">
                      Existing Images
                    </label>

                    <p className="mt-1 text-xs text-[#777266] dark:text-[#A6A198]">
                      Click "Delete" on the
                      images you want to remove.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {editingProject.images.map(
                      (
                        image,
                        index
                      ) => {
                        const isSelected =
                          deleteImages.includes(
                            image
                          );

                        return (
                          <div
                            key={`${image}-${index}`}
                            className={`
                              overflow-hidden
                              rounded-xl
                              border
                              ${
                                isSelected
                                  ? "border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-950/20"
                                  : "border-[#D8D1BF] bg-white dark:border-[#34312B] dark:bg-[#10100F]"
                              }
                            `}
                          >
                            <div className="relative h-40 w-full overflow-hidden bg-[#ECE7DC] dark:bg-[#24221E]">
                              <img
                                src={image}
                                alt={`${editingProject.title} image ${
                                  index + 1
                                }`}
                                className={`
                                  h-full
                                  w-full
                                  object-cover
                                  ${
                                    isSelected
                                      ? "opacity-40"
                                      : ""
                                  }
                                `}
                              />

                              {isSelected && (
                                <div
                                  className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                    bg-red-900/20
                                  "
                                >
                                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                                    Selected for deletion
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between gap-2 p-3">
                              <span className="text-xs font-medium text-[#777266] dark:text-[#A6A198]">
                                Image{" "}
                                {index + 1}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteImageSelect(
                                    image
                                  )
                                }
                                className={`
                                  rounded-lg
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-semibold
                                  transition
                                  ${
                                    isSelected
                                      ? "bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
                                      : "bg-red-600 text-white hover:bg-red-700"
                                  }
                                `}
                              >
                                {isSelected
                                  ? "Undo"
                                  : "Delete"}
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {deleteImages.length >
                    0 && (
                    <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
                      {
                        deleteImages.length
                      } image
                      {deleteImages.length !==
                      1
                        ? "s"
                        : ""}{" "}
                      selected for deletion.
                      Click Update Project
                      to apply.
                    </p>
                  )}
                </div>
              )}

            {/* ==========================================
                NEW MEDIA
                ========================================== */}

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Add New Images / Videos
              </label>

              <input
                id="project-media"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={
                  handleMediaChange
                }
                className="
                  block
                  w-full
                  rounded-xl
                  border
                  border-[#D8D1BF]
                  bg-white
                  p-3
                  text-sm
                  dark:border-[#34312B]
                  dark:bg-[#10100F]
                "
              />

              <p className="mt-1 text-xs text-[#777266] dark:text-[#A6A198]">
                Maximum 10 new images/videos.
              </p>

              {media.length > 0 && (
                <p className="mt-2 text-xs font-medium text-[#806510] dark:text-[#D6B84C]">
                  {media.length} file(s)
                  selected
                </p>
              )}
            </div>

            {/* ==========================================
                FEATURED
                ========================================== */}

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleChange
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Featured Project
              </span>
            </label>

            {/* ==========================================
                BUTTONS
                ========================================== */}

            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                disabled={
                  formLoading
                }
                className="
                  rounded-xl
                  bg-[#A37D1D]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#8F6D18]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:bg-[#B18A22]
                  dark:hover:bg-[#C09A2E]
                "
              >
                {formLoading
                  ? "Saving..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </button>

              {editingProject && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="
                    rounded-xl
                    border
                    border-[#D8D1BF]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    transition
                    hover:bg-[#ECE7DC]
                    dark:border-[#34312B]
                    dark:hover:bg-[#24221E]
                  "
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>
        </section>

        {/* ==========================================
            PROJECT LIST
            ========================================== */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Existing Projects
            </h2>

            <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
              {projects.length} project
              {projects.length !== 1
                ? "s"
                : ""}
            </p>
          </div>

          {projects.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#D8D1BF]
                bg-[#FAF8F2]
                p-10
                text-center
                dark:border-[#34312B]
                dark:bg-[#181715]
              "
            >
              <p className="font-semibold">
                No projects found
              </p>

              <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
                Create your first project
                using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">

              {projects.map(
                (project) => (
                  <article
                    key={
                      project._id
                    }
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#DDD8CC]
                      bg-[#FAF8F2]
                      shadow-sm
                      dark:border-[#2D2B27]
                      dark:bg-[#181715]
                    "
                  >

                    {/* PROJECT IMAGE */}

                    {project.images?.length >
                    0 ? (
                      <img
                        src={
                          project.images[0]
                        }
                        alt={
                          project.title
                        }
                        className="
                          h-48
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-48
                          items-center
                          justify-center
                          bg-[#ECE7DC]
                          text-sm
                          text-[#777266]
                          dark:bg-[#24221E]
                          dark:text-[#A6A198]
                        "
                      >
                        No image
                      </div>
                    )}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="text-lg font-bold">
                          {
                            project.title
                          }
                        </h3>

                        {project.featured && (
                          <span
                            className="
                              rounded-full
                              bg-[#EFE7D3]
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-[#806510]
                              dark:bg-[#29251D]
                              dark:text-[#D6B84C]
                            "
                          >
                            Featured
                          </span>
                        )}

                      </div>

                      <p
                        className="
                          mt-2
                          line-clamp-3
                          text-sm
                          leading-6
                          text-[#777266]
                          dark:text-[#A6A198]
                        "
                      >
                        {
                          project.description
                        }
                      </p>

                      {project.technologies?.length >
                        0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map(
                            (
                              technology,
                              index
                            ) => (
                              <span
                                key={`${technology}-${index}`}
                                className="
                                  rounded-lg
                                  bg-[#EFE7D3]
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-medium
                                  text-[#806510]
                                  dark:bg-[#29251D]
                                  dark:text-[#D6B84C]
                                "
                              >
                                {
                                  technology
                                }
                              </span>
                            )
                          )}
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              project
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-[#D8D1BF]
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            transition
                            hover:bg-[#ECE7DC]
                            dark:border-[#34312B]
                            dark:hover:bg-[#24221E]
                          "
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              project._id
                            )
                          }
                          disabled={
                            deleteLoading
                          }
                          className="
                            rounded-lg
                            bg-red-600
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          Delete
                        </button>

                        {project.liveUrl && (
                          <a
                            href={
                              project.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                              rounded-lg
                              border
                              border-[#D8D1BF]
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              transition
                              hover:bg-[#ECE7DC]
                              dark:border-[#34312B]
                              dark:hover:bg-[#24221E]
                            "
                          >
                            Live
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={
                              project.githubUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                              rounded-lg
                              border
                              border-[#D8D1BF]
                              px-4
                              py-2
                              text-sm
                              font-semibold
                              transition
                              hover:bg-[#ECE7DC]
                              dark:border-[#34312B]
                              dark:hover:bg-[#24221E]
                            "
                          >
                            GitHub
                          </a>
                        )}

                      </div>
                    </div>
                  </article>
                )
              )}

            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default OwnerProjects;
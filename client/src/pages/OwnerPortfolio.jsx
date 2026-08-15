import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function OwnerPortfolio() {
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    email: "",
    phone: "",
    location: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);
  const [cv, setCv] = useState(null);

  // ==========================================
  // FETCH PORTFOLIO
  // ==========================================

  const fetchPortfolio = async () => {
    try {
      setLoading(true);

      const response = await api.get("/portfolio");

      if (response.data.success) {
        const data = response.data.portfolio;

        setPortfolio(data);

        setFormData({
          fullName: data.fullName || "",
          title: data.title || "",
          bio: data.bio || "",
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      }
    } catch (error) {
      console.error("Fetch portfolio error:", error);

      if (error.response?.status === 401) {
        toast.error("Please login again");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Unable to load portfolio"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");

      event.target.value = "";
      return;
    }

    setProfileImage(file);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Resume must be a PDF file");

      event.target.value = "";
      return;
    }

    setResume(file);
  };

  const handleCvChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("CV must be a PDF file");

      event.target.value = "";
      return;
    }

    setCv(file);
  };

  // ==========================================
  // UPDATE PORTFOLIO
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.bio.trim()) {
      toast.error("Bio is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!portfolio?._id) {
      toast.error("Portfolio information not found");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append(
        "fullName",
        formData.fullName
      );

      data.append(
        "title",
        formData.title
      );

      data.append(
        "bio",
        formData.bio
      );

      data.append(
        "githubUrl",
        formData.githubUrl
      );

      data.append(
        "linkedinUrl",
        formData.linkedinUrl
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "location",
        formData.location
      );

      // Only send files when a new file is selected
      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      if (resume) {
        data.append(
          "resume",
          resume
        );
      }

      if (cv) {
        data.append(
          "cv",
          cv
        );
      }

      const response = await api.put(
        `/portfolio/${portfolio._id}`,
        data
      );

      if (response.data.success) {
        toast.success(
          "Portfolio updated successfully"
        );

        setPortfolio(response.data.portfolio);

        setProfileImage(null);
        setResume(null);
        setCv(null);

        const profileInput =
          document.getElementById(
            "profile-image"
          );

        const resumeInput =
          document.getElementById("resume");

        const cvInput =
          document.getElementById("cv");

        if (profileInput) {
          profileInput.value = "";
        }

        if (resumeInput) {
          resumeInput.value = "";
        }

        if (cvInput) {
          cvInput.value = "";
        }
      }
    } catch (error) {
      console.error(
        "Update portfolio error:",
        error
      );

      if (error.response?.status === 401) {
        toast.error("Please login again");

        navigate("/login", {
          replace: true,
        });

        return;
      }

      toast.error(
        error.response?.data?.message ||
          "Unable to update portfolio"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F3F0E8] px-4 py-8 text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8] sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
              Portfolio
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Manage Portfolio
            </h1>

            <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
              Update the information displayed on your public portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/owner")}
            className="rounded-xl border border-[#D8D1BF] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#ECE7DC] dark:border-[#34312B] dark:hover:bg-[#24221E]"
          >
            ← Dashboard
          </button>

        </div>

        {/* =====================================
            FORM
        ===================================== */}

        <section className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* =================================
                PROFILE IMAGE
            ================================= */}

            <div className="border-b border-[#DDD8CC] pb-6 dark:border-[#2D2B27]">

              <h2 className="text-lg font-bold">
                Profile Information
              </h2>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">

                {portfolio?.profileImage ? (
                  <img
                    src={portfolio.profileImage}
                    alt={portfolio.fullName}
                    className="h-28 w-28 rounded-2xl border border-[#D8D1BF] object-cover dark:border-[#34312B]"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-dashed border-[#D8D1BF] text-xs text-[#777266] dark:border-[#34312B] dark:text-[#A6A198]">
                    No image
                  </div>
                )}

                <div className="flex-1">

                  <label className="mb-2 block text-sm font-semibold">
                    Change Profile Image
                  </label>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={
                      handleProfileImageChange
                    }
                    className="block w-full rounded-xl border border-[#D8D1BF] bg-white p-3 text-sm dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                  {profileImage && (
                    <p className="mt-2 text-xs font-medium text-[#806510] dark:text-[#D6B84C]">
                      New image selected:{" "}
                      {profileImage.name}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* =================================
                BASIC INFORMATION
            ================================= */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* FULL NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                />
              </div>

              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Professional Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Full Stack Developer"
                  className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                />
              </div>

            </div>

            {/* =================================
                BIO
            ================================= */}

            <div>

              <label className="mb-2 block text-sm font-semibold">
                Bio
              </label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={6}
                placeholder="Write your professional bio..."
                className="w-full resize-none rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
              />

            </div>

            {/* =================================
                CONTACT
            ================================= */}

            <div className="border-t border-[#DDD8CC] pt-6 dark:border-[#2D2B27]">

              <h2 className="mb-5 text-lg font-bold">
                Contact Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                  />
                </div>

                {/* LOCATION */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Aligarh, Uttar Pradesh, India"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                </div>

              </div>

            </div>

            {/* =================================
                SOCIAL LINKS
            ================================= */}

            <div className="border-t border-[#DDD8CC] pt-6 dark:border-[#2D2B27]">

              <h2 className="mb-5 text-lg font-bold">
                Social Links
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* GITHUB */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                </div>

                {/* LINKEDIN */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    LinkedIn URL
                  </label>

                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#A37D1D] dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                </div>

              </div>

            </div>

            {/* =================================
                RESUME / CV
            ================================= */}

            <div className="border-t border-[#DDD8CC] pt-6 dark:border-[#2D2B27]">

              <h2 className="mb-5 text-lg font-bold">
                Resume & CV
              </h2>

              <div className="grid gap-5 md:grid-cols-2">

                {/* RESUME */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Replace Resume
                  </label>

                  <input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeChange}
                    className="block w-full rounded-xl border border-[#D8D1BF] bg-white p-3 text-sm dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                  {portfolio?.resumeUrl && (
                    <a
                      href={portfolio.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-[#927016] hover:underline dark:text-[#D6B84C]"
                    >
                      View current Resume
                    </a>
                  )}

                  {resume && (
                    <p className="mt-2 text-xs font-medium text-[#806510] dark:text-[#D6B84C]">
                      New resume selected:{" "}
                      {resume.name}
                    </p>
                  )}

                </div>

                {/* CV */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Replace CV
                  </label>

                  <input
                    id="cv"
                    type="file"
                    accept="application/pdf"
                    onChange={handleCvChange}
                    className="block w-full rounded-xl border border-[#D8D1BF] bg-white p-3 text-sm dark:border-[#34312B] dark:bg-[#10100F]"
                  />

                  {portfolio?.cvUrl && (
                    <a
                      href={portfolio.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-[#927016] hover:underline dark:text-[#D6B84C]"
                    >
                      View current CV
                    </a>
                  )}

                  {cv && (
                    <p className="mt-2 text-xs font-medium text-[#806510] dark:text-[#D6B84C]">
                      New CV selected:{" "}
                      {cv.name}
                    </p>
                  )}

                </div>

              </div>

            </div>

            {/* =================================
                BUTTONS
            ================================= */}

            <div className="flex flex-wrap gap-3 border-t border-[#DDD8CC] pt-6 dark:border-[#2D2B27]">

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#A37D1D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
              >
                {saving
                  ? "Saving..."
                  : "Save Portfolio"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/owner")}
                className="rounded-xl border border-[#D8D1BF] px-6 py-3 text-sm font-semibold transition hover:bg-[#ECE7DC] dark:border-[#34312B] dark:hover:bg-[#24221E]"
              >
                Cancel
              </button>

            </div>

          </form>

        </section>

      </div>
    </div>
  );
}

export default OwnerPortfolio;
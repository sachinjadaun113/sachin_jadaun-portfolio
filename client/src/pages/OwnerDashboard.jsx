import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  FileText,
  Star,
  Lock,
  LogOut,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

const managementItems = [
  {
    title: "Projects",
    description: "Create, update and delete your portfolio projects.",
    icon: FolderKanban,
    path: "/owner/projects",
  },
  {
    title: "Skills",
    description: "Manage your technical and professional skills.",
    icon: Code2,
    path: "/owner/skills",
  },
  {
    title: "Experience",
    description: "Manage your work and internship experience.",
    icon: BriefcaseBusiness,
    path: "/owner/experience",
  },
  {
    title: "Education",
    description: "Manage your education details.",
    icon: GraduationCap,
    path: "/owner/education",
  },
  {
    title: "Certificates",
    description: "Add, update and remove certificates.",
    icon: Award,
    path: "/owner/certificates",
  },
  {
    title: "Achievements",
    description: "Manage your achievements and accomplishments.",
    icon: Award,
    path: "/owner/achievements",
  },
  {
    title: "Resume / CV",
    description: "Manage your downloadable resume.",
    icon: FileText,
    path: "/owner/resume",
  },
  {
    title: "Reviews",
    description: "Manage portfolio reviews and ratings.",
    icon: Star,
    path: "/owner/reviews",
  },
];

function OwnerDashboard() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data.success) {
          setOwner(response.data.owner);
        }
      } catch (error) {
        console.error("Owner fetch error:", error);

        toast.error("Unable to load owner information");

        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      const response = await api.post("/auth/logout");

      if (response.data.success) {
        toast.success("Logout successful");

        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to logout"
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Loading owner dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#DDD8CC] bg-[#FAF8F2]/95 backdrop-blur dark:border-[#2D2B27] dark:bg-[#181715]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <LayoutDashboard size={21} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#927016] dark:text-[#D6B84C]">
                Portfolio
              </p>

              <h1 className="text-lg font-bold">
                Owner Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden items-center gap-2 rounded-xl border border-[#D8D1BF] px-4 py-2.5 text-sm font-medium text-[#666158] transition hover:bg-[#ECE7DC] sm:flex dark:border-[#34312B] dark:text-[#A6A198] dark:hover:bg-[#24221E]"
            >
              <ExternalLink size={16} />
              View Portfolio
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-2 rounded-xl bg-[#A37D1D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
            >
              <LogOut size={16} />

              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-8 rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-sm dark:border-[#2D2B27] dark:bg-[#181715]">
          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Welcome back
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {owner?.fullName || "Owner"}
          </h2>

          <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
            {owner?.email}
          </p>
        </section>

        {/* Management Heading */}
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Manage Portfolio
          </h2>

          <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
            Manage the content displayed on your public portfolio.
          </p>
        </div>

        {/* Management Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {managementItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className="group rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#B18A22]/40 hover:shadow-lg dark:border-[#2D2B27] dark:bg-[#181715] dark:hover:border-[#D6B84C]/30"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] transition group-hover:scale-105 dark:bg-[#29251D] dark:text-[#D6B84C]">
                  <Icon size={21} />
                </div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                  {item.description}
                </p>

                <p className="mt-4 text-sm font-semibold text-[#927016] dark:text-[#D6B84C]">
                  Manage →
                </p>
              </button>
            );
          })}
        </div>

        {/* Account Settings */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold">
            Account
          </h2>

          <button
            type="button"
            onClick={() =>
              navigate("/owner/change-password")
            }
            className="flex w-full items-center gap-4 rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-5 text-left shadow-sm transition hover:border-[#B18A22]/40 hover:shadow-md dark:border-[#2D2B27] dark:bg-[#181715]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
              <Lock size={20} />
            </div>

            <div>
              <h3 className="font-semibold">
                Change Password
              </h3>

              <p className="mt-1 text-sm text-[#777266] dark:text-[#A6A198]">
                Change your owner account password.
              </p>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}

export default OwnerDashboard;
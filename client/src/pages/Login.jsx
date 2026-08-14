import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if owner is already logged in
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data.success) {
          navigate("/owner", { replace: true });
          return;
        }
      } catch (error) {
        // No active session.
        // Stay on login page.
      } finally {
        setCheckingSession(false);
      }
    };

    checkExistingSession();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    // Remove error when user starts typing again
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success("Login successful");

        // Backend creates the HTTP-only cookie.
        navigate("/owner");
      }
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        "Invalid email or password";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  // While checking existing login session
  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Checking login session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0E8] px-4 py-8 text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Back to portfolio */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-sm text-[#777266] transition hover:text-[#806510] dark:text-[#A6A198] dark:hover:text-[#D6B84C]"
          >
            <ArrowLeft size={17} />
            Back to portfolio
          </button>

          {/* Card */}
          <div className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-xl dark:border-[#2D2B27] dark:bg-[#181715] sm:p-8">

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-600 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#FAF8F2] dark:bg-[#181715]">
                  <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-lg font-bold text-transparent">
                    SJ
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-bold">
                Owner Login
              </h1>

              <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
                Login to manage your portfolio
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8579]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter owner email"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#B18A22] focus:ring-2 focus:ring-[#B18A22]/15 dark:border-[#34312B] dark:bg-[#11110F] dark:text-white dark:placeholder:text-[#77736A]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8579]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-[#D8D1BF] bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-[#B18A22] focus:ring-2 focus:ring-[#B18A22]/15 dark:border-[#34312B] dark:bg-[#11110F] dark:text-white dark:placeholder:text-[#77736A]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777266] hover:text-[#806510] dark:text-[#A6A198] dark:hover:text-[#D6B84C]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#927016] hover:underline dark:text-[#D6B84C]"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error message */}
              {errorMessage && (
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {errorMessage}
                </p>
              )}

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#A37D1D] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22] dark:hover:bg-[#C09A2E]"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
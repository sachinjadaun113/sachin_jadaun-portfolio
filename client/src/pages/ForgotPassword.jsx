import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setSubmitted(true);

        toast.success(
          "If the email exists, a reset link has been sent."
        );
      }
    } catch (error) {
      console.error("Forgot password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to process request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0E8] px-4 py-8 text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mb-6 flex items-center gap-2 text-sm text-[#777266] transition hover:text-[#806510] dark:text-[#A6A198] dark:hover:text-[#D6B84C]"
          >
            <ArrowLeft size={17} />
            Back to login
          </button>

          <div className="rounded-2xl border border-[#DDD8CC] bg-[#FAF8F2] p-6 shadow-xl dark:border-[#2D2B27] dark:bg-[#181715] sm:p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFE7D3] text-[#806510] dark:bg-[#29251D] dark:text-[#D6B84C]">
                <Mail size={25} />
              </div>

              <h1 className="text-2xl font-bold">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#777266] dark:text-[#A6A198]">
                Enter your owner email and we will send you
                a password reset link.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-[#D8D1BF] bg-[#F1EEE6] p-4 text-center dark:border-[#34312B] dark:bg-[#211F1B]">
                <p className="text-sm leading-6 text-[#666158] dark:text-[#A6A198]">
                  If an account exists with this email, a
                  password reset link has been sent.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-5 rounded-xl bg-[#A37D1D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8F6D18]"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Owner Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8579]"
                    />

                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full rounded-xl border border-[#D8D1BF] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#B18A22] focus:ring-2 focus:ring-[#B18A22]/15 dark:border-[#34312B] dark:bg-[#11110F] dark:text-white dark:placeholder:text-[#77736A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#A37D1D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8F6D18] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#B18A22]"
                >
                  {loading
                    ? "Sending..."
                    : "Send Reset Link"}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm font-medium text-[#927016] hover:underline dark:text-[#D6B84C]"
              >
                Remember your password? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
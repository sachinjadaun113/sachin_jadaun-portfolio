import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    // Backend requires minimum 8 characters
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Password changed successfully"
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Your dashboard route is /owner
        navigate("/owner", { replace: true });
      }
    } catch (error) {
      console.error("Change password error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0E8] px-4 py-8 text-[#25231F] dark:bg-[#10100F] dark:text-[#F1EFE8]">
      <div className="mx-auto max-w-2xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/owner")}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#777266]
            transition
            hover:text-[#806510]
            dark:text-[#A6A198]
            dark:hover:text-[#D6B84C]
          "
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* Main Card */}
        <div
          className="
            rounded-2xl
            border
            border-[#DDD8CC]
            bg-[#FAF8F2]
            p-6
            shadow-sm
            dark:border-[#2D2B27]
            dark:bg-[#181715]
            sm:p-8
          "
        >

          {/* Header */}
          <div className="mb-8">
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#EFE7D3]
                text-[#806510]
                dark:bg-[#29251D]
                dark:text-[#D6B84C]
              "
            >
              <Lock size={22} />
            </div>

            <h1 className="text-2xl font-bold">
              Change Password
            </h1>

            <p className="mt-2 text-sm text-[#777266] dark:text-[#A6A198]">
              Update your owner account password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
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
                  focus:ring-2
                  focus:ring-[#A37D1D]/10
                  dark:border-[#34312B]
                  dark:bg-[#11110F]
                  dark:text-white
                  dark:focus:border-[#D6B84C]
                "
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
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
                  focus:ring-2
                  focus:ring-[#A37D1D]/10
                  dark:border-[#34312B]
                  dark:bg-[#11110F]
                  dark:text-white
                  dark:focus:border-[#D6B84C]
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
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
                  focus:ring-2
                  focus:ring-[#A37D1D]/10
                  dark:border-[#34312B]
                  dark:bg-[#11110F]
                  dark:text-white
                  dark:focus:border-[#D6B84C]
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-[#A37D1D]
                px-4
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
              {loading
                ? "Changing Password..."
                : "Change Password"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
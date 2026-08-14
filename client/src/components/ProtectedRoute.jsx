import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");

        if (response.data.success) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F0E8] dark:bg-[#10100F]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#D8D1BF] border-t-[#A37D1D] dark:border-[#34312B] dark:border-t-[#D6B84C]" />

          <p className="text-sm text-[#777266] dark:text-[#A6A198]">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
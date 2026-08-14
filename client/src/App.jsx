import { BrowserRouter, Routes, Route } from "react-router-dom";

import PortfolioLayout from "./layouts/PortfolioLayout";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import OwnerDashboard from "./pages/OwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC PORTFOLIO
            ========================= */}
        <Route
          path="/"
          element={<PortfolioLayout />}
        />

        {/* =========================
            OWNER LOGIN
            ========================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            FORGOT PASSWORD
            ========================= */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* =========================
            OWNER DASHBOARD
            ========================= */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* =========================
            CHANGE PASSWORD
            ========================= */}
        <Route
          path="/owner/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
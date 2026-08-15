import { BrowserRouter, Routes, Route } from "react-router-dom";

import PortfolioLayout from "./layouts/PortfolioLayout";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerProjects from "./pages/OwnerProjects";
import OwnerPortfolio from "./pages/OwnerPortfolio";
import OwnerCertificateAchievement from "./pages/OwnerCertificateAchievement";
import OwnerSkills from "./pages/OwnerSkills";
import OwnerExperience from "./pages/OwnerExperience";
import OwnerEducation from "./pages/OwnerEducation";
import OwnerReview from "./pages/OwnerReview";

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
            OWNER PORTFOLIO
            ========================= */}

        <Route
         path="/owner/portfolio"
         element={
            <ProtectedRoute>
             <OwnerPortfolio />
           </ProtectedRoute>
          }
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
            OWNER PROJECTS
            ========================= */}
        <Route
          path="/owner/projects"
          element={
            <ProtectedRoute>
              <OwnerProjects />
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

        {/* =========================
            CERTIFICATES
            ========================= */}
        <Route
          path="/owner/certificates"
          element={
            <ProtectedRoute>
              <OwnerCertificateAchievement />
            </ProtectedRoute>
          }
        />

        {/* skills */}
        <Route
          path="/owner/skills"
          element={
            <ProtectedRoute>
              <OwnerSkills />
            </ProtectedRoute>
          }
        />

        {/* =========================
           OWNER EXPERIENCE
           ========================= */}

      <Route
         path="/owner/experience"
         element={
          <ProtectedRoute>
             <OwnerExperience />
           </ProtectedRoute>
         }
      />

      {/* =========================
          OWNER EDUCATION
          ========================= */}

      <Route
        path="/owner/education"
        element={
          <ProtectedRoute>
            <OwnerEducation />
          </ProtectedRoute>
        }
      />

      {/* =========================
           OWNER REVIEWS
           ========================= */}
       <Route
         path="/owner/reviews"
         element={
           <ProtectedRoute>
             <OwnerReview />
           </ProtectedRoute>
         }
       />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
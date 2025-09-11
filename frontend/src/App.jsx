import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HospitalLoginPage from "./pages/auth/HospitalLoginPage";
import UserLoginPage from "./pages/auth/UserLoginPage";
import SignupSelectionPage from "./pages/SignUpSelectionPage";
import UserSignup from "./components/auth/user-signup";
import HospitalSignup from "./components/auth/HospitalSignup";
import Protected from "./HOC/authprovider";
import HomePage from "./pages/HomePage";
import HospitalDashboardPage from "./pages/HospitalDashboardPage";
import { Toaster } from "./components/ui/toaster";
import HospitalAnalyticsPage from "./pages/HospitalAnalyticsPage";
import HospitalAppointmentPages from "./pages/HospitalAppointmentPages";
import InventoryManagement from "./pages/HospitalInventory";
import HospitalsPage from "./pages/HomePage";
import AppointmentsPage from "./pages/UserAppointmentsPage";
import ProfilePage from "./pages/ProfliePage";
import LogoutButton from "./components/LogoutButton";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App font-main">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/hospital/login" element={<HospitalLoginPage />} />
          <Route path="/auth/login" element={<UserLoginPage />} />
          <Route path="/auth/signup" element={<SignupSelectionPage />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/hospital" element={<HospitalSignup />} />

          <Route
            path="/home"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route
            path="/hospital/dashboard"
            element={
              <Protected>
                <HospitalDashboardPage />
              </Protected>
            }
          />
          <Route
            path="/hospital/dashboard/analytics"
            element={
              <Protected>
                <HospitalAnalyticsPage />
              </Protected>
            }
          />
          <Route
            path="/hospital/dashboard/appointments"
            element={
              <Protected>
                <HospitalAppointmentPages />
              </Protected>
            }
          />
          <Route
            path="/hospital/dashboard/inventory"
            element={
              <Protected>
                <InventoryManagement />
              </Protected>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;

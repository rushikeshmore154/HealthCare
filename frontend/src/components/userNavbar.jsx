import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const navItems = [
  { name: "Hospitals", path: "/hospitals" },
  { name: "Appointments", path: "/appointments" },
  { name: "Profile", path: "/profile" },
  { name: "Chatbot", path: "/chatbot" },
];

export default function UserNavbar() {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login"; // redirect after logout
  };

  return (
    <nav className="bg-white shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-indigo-600">HealthConnect</div>
        <ul className="flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            {!showLogout ? (
              <button
                className="text-lg font-medium text-gray-600 hover:text-red-600 transition-colors"
                onClick={() => setShowLogout(true)}
              >
                Logout
              </button>
            ) : (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleLogout}
              >
                Confirm Logout
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

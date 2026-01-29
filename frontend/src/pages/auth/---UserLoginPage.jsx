"use client";

import React, { useState } from "react";
import UserLogin from "@/components/---auth/user-login";

const UserLoginPage = () => {
  const [userType, setUserType] = useState(""); // "patient" or "hospital"

  const loginConfig = {
    patient: {
      url: "/user/login",
      title: "Patient Login",
      redirect: "/home",
    },
    hospital: {
      url: "/hospital/login",
      title: "Hospital Login",
      redirect: "/hospital/dashboard",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Login Portal</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Please select your user type to log in to the system.
        </p>

        {/* User Type Buttons */}
        <div className="flex gap-6 mb-10">
          <button
            onClick={() => setUserType("patient")}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
              ${
                userType === "patient"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
              }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType("hospital")}
            className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
              ${
                userType === "hospital"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
              }`}
          >
            Hospital
          </button>
        </div>

        {/* Dynamic Login Component */}
        <div className="w-full max-w-lg">
          {userType && (
            <UserLogin
              url={loginConfig[userType].url}
              title={loginConfig[userType].title}
              redirect={loginConfig[userType].redirect}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;

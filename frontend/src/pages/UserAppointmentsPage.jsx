import React, { useEffect, useState } from "react";
import axios from "../services/axios"; // Your axios instance with JWT
import UserLayout from "@/components/userLayout";

export default function UserAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointment/user");
        setAppointments(response.data.appointments);
      } catch (err) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Appointments
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading appointments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-500">You have no appointments yet.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <div
                key={appt._id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <h2 className="text-xl font-semibold text-indigo-600">
                  {appt.hospitalId.name}
                </h2>
                <p className="text-gray-700">📍 {appt.hospitalId.location}</p>
                <p className="text-gray-600 mt-1">
                  📅 {new Date(appt.date).toLocaleDateString()} at{" "}
                  {new Date(
                    `${appt.date.split("T")[0]}T${appt.time}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}

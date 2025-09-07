"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppointmentCard from "./appointment-card";

const HospitalAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        // Fetch appointments from API
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/appointment/get-hospital-appointments",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                const data = await response.json();
                setAppointments(data.appointments);
                setFilteredAppointments(data.appointments);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        const filtered = appointments.filter(
            (appointment) =>
                appointment.patientName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                (statusFilter === "all" || appointment.status === statusFilter)
        );
        setFilteredAppointments(filtered);
    }, [searchTerm, statusFilter, appointments]);

    const handleConfirm = async (appointmentId) => {
        console.log(localStorage.getItem("authToken"));
        try {
            const response = await fetch(
                `http://localhost:5000/api/appointment/confirm/${appointmentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    }
                }
            );
            if (response.ok) {
                setAppointments(
                    appointments.map((app) =>
                        app._id === appointmentId
                            ? { ...app, status: "confirmed" }
                            : app
                    )
                );
            }
        } catch (error) {
            console.error("Error confirming appointment:", error);
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/appointment/cancel/${appointmentId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    }
                }
            );
            if (response.ok) {
                setAppointments(
                    appointments.map((app) =>
                        app._id === appointmentId
                            ? { ...app, status: "cancelled" }
                            : app
                    )
                );
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hospital Appointments</h1>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Label htmlFor="search">Search by patient name</Label>
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <Label htmlFor="status-filter">Filter by status</Label>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger id="status-filter">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                ))}
            </div>
        </div>
    );
};

export default HospitalAppointments;

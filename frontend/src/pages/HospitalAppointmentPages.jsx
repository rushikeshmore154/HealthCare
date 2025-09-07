import HospitalAppointments from "@/components/hospital-dashboard/hospital-appointments";
import HospitalLayout from "@/components/hospital-dashboard/layout/hospital-layout";
import React from "react";

const HospitalAppointmentPages = () => {
    return (
        <HospitalLayout>
            <HospitalAppointments />
        </HospitalLayout>
    );
};

export default HospitalAppointmentPages;

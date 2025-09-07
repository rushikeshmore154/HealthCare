import BedAllocation from "@/components/hospital-dashboard/bed-allocation";
import HospitalLayout from "@/components/hospital-dashboard/layout/hospital-layout";
import React from "react";

const HospitalDashboardPage = () => {
    return (
        <HospitalLayout>
            <div className="flex-col space-y-2 h-screen">
                <BedAllocation />
            </div>
        </HospitalLayout>
    );
};

export default HospitalDashboardPage;

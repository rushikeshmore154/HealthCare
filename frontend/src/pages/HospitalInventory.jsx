import InventoryManagement from "@/components/hospital-dashboard/inventory/InventoryManagement";
import HospitalLayout from "@/components/hospital-dashboard/layout/hospital-layout";
import React from "react";

const HospitalInventory = () => {
    return (
        <HospitalLayout>
            <InventoryManagement />
        </HospitalLayout>
    );
};

export default HospitalInventory;

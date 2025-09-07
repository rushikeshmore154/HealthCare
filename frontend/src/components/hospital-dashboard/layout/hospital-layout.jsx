import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./sidebar";

export default function HospitalLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 p-4 ">
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    );
}

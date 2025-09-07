import React, { use, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Protected({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        const role = localStorage.getItem("role");
        console.log(role);
        if (
            (!authToken || (role !== "hospital" && role !== "subadmin")) &&
            location.pathname.includes("hospital")
        ) {
            navigate("/home");
        }
    }, []);
    return <div>{children}</div>;
}

// components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import UserLayout from "./userLayout";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    navigate("/auth/login");
  };

  return (
    <UserLayout>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </UserLayout>
  );
};

export default LogoutButton;

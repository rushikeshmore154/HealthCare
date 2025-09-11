import React from "react";
import UserNavbar from "./userNavbar";

const UserLayout = ({ children }) => {
  return (
    <div>
      <UserNavbar />
      <div className="p-6">{children}</div>
    </div>
  );
};

export default UserLayout;

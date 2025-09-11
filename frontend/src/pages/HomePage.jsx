import HospitalList from "@/components/home/hospital-list";
import HomeLayout from "@/components/home/layouts/home-layout";
import UserLayout from "@/components/userLayout";
import React from "react";

const HomePage = () => {
  return (
    <UserLayout>
      {/* <UserNavbar /> */}
      <HomeLayout>
        <HospitalList />
      </HomeLayout>
    </UserLayout>
  );
};

export default HomePage;

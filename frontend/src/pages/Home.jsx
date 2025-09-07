import UserLayout from "@/components/userLayout";
import HospitalList from "../components/HospitalList";
import RequestForm from "../components/RequestForm";
import UserLayout from "@/components/userLayout";

function Home() {
  return (
    <UserLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          Hospital Queue Management System
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HospitalList />
          <RequestForm />
        </div>
      </div>
    </UserLayout>
  );
}

export default Home;

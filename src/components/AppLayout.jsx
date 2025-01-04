import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="bg-primary-50 min-h-screen  text-primary-800">
      <Navbar />
      <div className=" mx-auto container py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;

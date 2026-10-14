import { Outlet } from "react-router-dom";

import Navbar from "./NavBar";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
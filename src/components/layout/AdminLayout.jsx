
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const currentPath =
    location.pathname.replace(/\/+$/, "");

  const isFixedContentPage =
    [
      "/admin/products",
      "/admin/products/new",
      "/admin/orders",
      "/admin/users",
    ].includes(currentPath) ||
    currentPath.startsWith("/admin/products/") ||
    currentPath.startsWith("/admin/orders/");

  return (
    <div className="flex h-dvh overflow-hidden bg-[#0b0908] text-[#f5efe6]">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:ml-64">
        <AdminHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main
          className={`min-h-0 flex-1 p-4 sm:p-6 ${
            isFixedContentPage
              ? "overflow-hidden"
              : "overflow-y-auto overscroll-contain"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

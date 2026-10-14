import { Navigate, Outlet } from "react-router-dom";
import { getAdminId } from "../utils/localStorage";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = () => {
  const adminId = getAdminId();

  const {
    data: admin,
    isLoading,
  } = useAdmin();

  if (!adminId) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0908] text-[#b99a63]">
        Checking admin access...
      </div>
    );
  }

  if (!admin || admin.id !== adminId || admin.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  if (admin.isBlock) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
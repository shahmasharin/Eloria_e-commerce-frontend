
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { removeAdminId } from "../../utils/localStorage";
import useAdmin from "../../hooks/useAdmin";

const AdminHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { data: admin } = useAdmin();

  const handleLogout = () => {
    removeAdminId();

    toast.success("Logged out successfully");

    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="relative z-20 flex min-h-18 shrink-0 items-center justify-between border-b border-[#3a3028] bg-[#0f0c0a] px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-[#a79d93] transition hover:bg-[#1d1814] hover:text-[#f5efe6] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <p className="hidden text-xs uppercase tracking-[0.25em] text-[#8e8175] sm:block">
            Admin Panel
          </p>

          <h2 className="truncate font-serif text-lg text-[#f5efe6] sm:mt-1 sm:text-xl">
            Welcome back
          </h2>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-[#f5efe6]">
            {admin?.name || "Admin"}
          </p>

          <p className="text-xs text-[#8e8175]">
            Administrator
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-[#3a3028] px-3 py-2 text-sm text-[#a79d93] transition hover:border-[#b99a63] hover:text-[#c9ac78]"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;

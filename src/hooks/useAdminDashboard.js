import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardData } from "../services/adminService";

const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: getAdminDashboardData,
  });
};

export default useAdminDashboard;
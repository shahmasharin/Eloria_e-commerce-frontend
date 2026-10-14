import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userService";
import { getAdminId } from "../utils/localStorage";

const useAdmin = () => {
  const adminId = getAdminId();

  return useQuery({
    queryKey: ["admin", adminId],
    queryFn: () => getUserById(adminId),
    enabled: Boolean(adminId),
  });
};

export default useAdmin;
import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../services/userService";
import { getUserId } from "../utils/localStorage";

const useUser = () => {
  const userId = getUserId();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  });
};

export default useUser;
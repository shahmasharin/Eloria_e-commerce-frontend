import { getUserId, removeUserId } from "../utils/localStorage";
import useUser from "./useUser";

const useAuth = () => {
  const userId = getUserId();

  const {
    data: user,
    isLoading,
    isError,
  } = useUser();

  const logout = () => {
    removeUserId();
    window.location.href = "/login";
  };

  return {
    user,
    userId,
    isAuthenticated: Boolean(userId),
    isLoading,
    isError,
    logout,
  };
};

export default useAuth;
import { useMutation } from "@tanstack/react-query";

import { getUsers } from "../services/userService";
import { saveUserId , removeAdminId } from "../utils/localStorage";

const loginUser = async ({ email, password }) => {
  const users = await getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.isBlock) {
    throw new Error("Your account has been blocked");
  }

  if (user.role === "admin") {
    throw new Error("Please use the admin login");
  }

  removeAdminId()
  saveUserId(user.id)
  return user;
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

export default useLogin;
import { useMutation } from "@tanstack/react-query"; 
import { getUsers } from "../services/userService";
import { saveAdminId ,removeUserId } from "../utils/localStorage";


const loginAdmin = async ({ email, password }) => {
  const users = await getUsers();

  const admin = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  ); 

  if (!admin) {
    throw new Error("Invalid email or password")
  }
 
  if (admin.isBlock) {
    throw new Error("Your admin account has been blocked")
  }

  if (admin.role !== "admin") {
    throw new Error("Admin access required")
  }

  removeUserId();
  saveAdminId(admin.id)

  return admin
}

const useAdminLogin = () => {
  return useMutation({
    mutationFn: loginAdmin,
  });
};

export default useAdminLogin;
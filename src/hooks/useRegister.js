import { useMutation } from "@tanstack/react-query";
import { getUsers, registerUser,} from "../services/userService";
import { saveUserId } from "../utils/localStorage";

const createUser = async ({
  name,
  email,
  password,
}) => {
  const users = await getUsers();

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const newUser = {
    name,
    email,
    password,
    role: "user",
    isBlock: false,
    cart:[],
    wishlist:[],
    created_at: new Date().toISOString(),
  };

  // User is stored in JSON Server
  const user = await registerUser(newUser);

  // Only ID is stored locally
  saveUserId(user.id);

  return user;
};

const useRegister = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

export default useRegister;
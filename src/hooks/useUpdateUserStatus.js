import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/userService";

const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn: ({ userId, isBlock }) =>
      updateUser(userId, { isBlock }),
  });
};

export default useUpdateUserStatus;
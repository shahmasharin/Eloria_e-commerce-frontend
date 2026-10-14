
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/userService";

const useAdminUsers = ({
  page = 1,
  perPage = 8,
  search = "",
  status = "",
} = {}) => {
  return useQuery({
    queryKey: ["admin", "users", page, perPage, search, status],

    queryFn: async () => {
      const users = await getUsers();

      // Include both admin and customer accounts
      let filteredUsers = users;

      // Search by name or email
      if (search.trim()) {
        const searchValue = search.toLowerCase().trim();

        filteredUsers = filteredUsers.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchValue) ||
            user.fullName?.toLowerCase().includes(searchValue) ||
            user.username?.toLowerCase().includes(searchValue) ||
            user.email?.toLowerCase().includes(searchValue)
        );
      }

      // Filter active users
      if (status === "active") {
        filteredUsers = filteredUsers.filter(
          (user) => !user.isBlock
        );
      }

      // Filter blocked users
      if (status === "blocked") {
        filteredUsers = filteredUsers.filter(
          (user) => user.isBlock
        );
      }

      const total = filteredUsers.length;

      // Pagination
      const start = (page - 1) * perPage;
      const end = start + perPage;

      return {
        data: filteredUsers.slice(start, end),
        items: total,
      };
    },

    placeholderData: (previousData) => previousData,
  });
};

export default useAdminUsers;

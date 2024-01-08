import { useQueries, useQuery } from "react-query";
import UserService from "../api/services/UserService";

function useUsersHook() {
  const usersQuery = useQuery("users", UserService.getAllUsers);
  const users = usersQuery.data ? usersQuery.data.data : [];

  const userRoleQueries = useQueries(
    users.map((user) => ({
      queryKey: ["userRole", user.username],
      queryFn: () => UserService.getUserRole(user.username),
    }))
  );

  const usersWithRoles = users.map((user, index) => ({
    ...user,
    roles:
      userRoleQueries[index].isLoading || userRoleQueries[index].isError
        ? null
        : userRoleQueries[index].data.data,
  }));

  return {
    users: usersWithRoles,
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  };
}

export default useUsersHook;

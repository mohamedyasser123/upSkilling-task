import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users";

export const useDelUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
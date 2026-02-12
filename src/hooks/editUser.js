 import { useMutation, useQueryClient } from "@tanstack/react-query";
export const editUser = () => {
  const queryClient = useQueryClient(); 

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); 
      navigate("/");
    },
  });

  return mutation;
};
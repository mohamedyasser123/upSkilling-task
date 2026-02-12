import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { MainLayout } from "../layout/Layout";
import { updateUser, getUserById } from "../api/users";

// Reusable input component
const InputField = ({ placeholder, registerProps }) => (
  <input
    placeholder={placeholder}
    className="flex-1 border p-3 rounded-[25px] bg-[#F5F5F5] outline-none"
    {...registerProps}
  />
);

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  // Fetch user data by ID
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/");
    },
  });

  // Reset form when user data is fetched
  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
    });
  }, [user, reset]);

  const submitHandler = (formData) => {
    updateMutation.mutate({ id, data: formData });
  };

  if (isLoading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <MainLayout>
      <div className="max-w-[50%] mx-auto flex flex-col items-center justify-center rounded-[25px] px-8 py-8 border border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <form onSubmit={handleSubmit(submitHandler)} className="w-full flex flex-col gap-6 mt-10">

          {/* User Photo */}
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={user?.picture || "https://i.pravatar.cc/150?img=3"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-14 h-14 rounded-full object-cover"
            />
            <span>Upload Photo</span>
          </div>

          {/* Name Fields */}
          <div className="w-full flex gap-4">
            <InputField placeholder="First Name" registerProps={register("firstName", { required: true })} />
            <InputField placeholder="Last Name" registerProps={register("lastName", { required: true })} />
          </div>

          {/* Contact Fields */}
          <div className="w-full flex gap-4">
            <InputField placeholder="Email" registerProps={register("email", { required: true })} />
            <InputField placeholder="Phone" registerProps={register("phone")} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-between mt-20">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-[#D9D9D9] py-5 px-20 rounded-[25px] font-medium hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-[#1BB0F0] text-white py-5 px-20 rounded-[25px] font-medium hover:bg-blue-600 transition-all shadow-md"
            >
              {updateMutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>

        </form>
      </div>
    </MainLayout>
  );
};

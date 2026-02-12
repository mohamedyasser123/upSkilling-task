import { useForm } from "react-hook-form";
import { createUser } from "../api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/Layout";

const InputField = ({ placeholder, registerProps }) => (
  <input
    placeholder={placeholder}
    className="flex-1 border p-3 rounded-[25px] bg-[#F5F5F5] outline-none"
    {...registerProps}
  />
);

export const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <MainLayout>
      <div className="max-w-[50%] mx-auto flex flex-col items-center justify-center rounded-[25px] px-8 py-8 border border-white bg-[#FFFFFF] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6 mt-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-gray-700">Upload Photo</span>
          </div>
          <div className="w-full flex gap-4">
            <InputField placeholder="First Name" registerProps={register("firstName", { required: true })} />
            <InputField placeholder="Last Name" registerProps={register("lastName", { required: true })} />
          </div>
          <div className="w-full flex gap-4">
            <InputField placeholder="Email" registerProps={register("email", { required: true })} />
            <InputField placeholder="Phone" registerProps={register("phone", { required: true })} />
          </div>
          <div className="flex gap-4 justify-between mt-20">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex bg-[#D9D9D9] py-5 px-20 rounded-[25px] font-medium hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex bg-[#1BB0F0] text-white py-5 px-20 rounded-[25px] font-medium hover:bg-blue-600 transition-all shadow-md"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

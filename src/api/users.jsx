import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    "app-id": "64fc4a747b1786417e354f31",
  },
});
export const getUsers = async (page = 0) => {
  const res = await axiosInstance.get(`/user?limit=10&page=${page}`);
  return res.data;
};
export const createUser = async (data) => {
  const res = await axiosInstance.post("/user/create", data);
   return res.data;
};
export const updateUser = async ({ id, data }) => {
  const res = await axiosInstance.put(`/user/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/user/${id}`);
  return res.data;
};
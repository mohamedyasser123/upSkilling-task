import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    "app-id": "64fc4a747b1786417e354f31",
  },
});

export const getUsers = async (page = 0, limit = 10) => {
  try {
    const { data } = await axiosInstance.get("/user", { params: { limit, page } });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async ({ firstName, lastName, email, title = "mr" }) => {
  try {
    const { data } = await axiosInstance.post("/user/create", { firstName, lastName, email, title });
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async ({ id, data }) => {
  try {
    const { data: updated } = await axiosInstance.put(`/user/${id}`, data);
    return updated;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/user/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/user/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

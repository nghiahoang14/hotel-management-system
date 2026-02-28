import { User } from "@/types/user";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/users`;

// ✅ Lấy tất cả user (có phân trang + search)
export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string; 
}) => {
  const res = await axios.get(API_BASE_URL, { params });
  return res.data;
};

// ✅ Lấy chi tiết user theo ID
export const getUserById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo user (admin)
export const createUser = async (data: {
   name: string;
  email: string;
  password:string;
    role: string;
  isActive: boolean;
}) => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update user
export const updateUser = async (id: string, data: {
    name: string;
  email: string;
    role: string;
  isActive: boolean;
}) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa user / deactivate
export const deleteUser = async (id: string) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}/deactivate`);
  return res.data;
};

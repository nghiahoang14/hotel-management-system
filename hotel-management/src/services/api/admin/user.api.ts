import { api } from "@/src/lib/api";


const API_BASE_URL = "/admin/users";

// ✅ Lấy tất cả user (có phân trang + search)
export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string; 
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data;
};

// ✅ Lấy chi tiết user theo ID
export const getUserById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
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
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update user
export const updateUser = async (id: string, data: {
    name: string;
  email: string;
    role: string;
  isActive: boolean;
}) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa user / deactivate
export const deleteUser = async (id: string) => {
  const res = await api.patch(`${API_BASE_URL}/${id}/deactivate`);
  return res.data;
};

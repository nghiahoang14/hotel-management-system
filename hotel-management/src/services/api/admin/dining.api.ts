

import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/dining";

console.log("Fetching: ", API_BASE_URL);

// ✅ GET dining (pagination + search)
export const getDinings = async (params: {
  page?: number;
  limit?: number; 
  title?: string;
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data ;
};

// ✅ Lấy chi tiết dining theo ID
export const getDiningById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo dining (admin)
export const createDining = async (data:FormData) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update dining
export const updateDining = async (id: string, data: FormData) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa dining
export const deleteDining = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};



import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/room-type";

console.log("Fetching: ", API_BASE_URL);

// ✅ GET room type (pagination + search)
export const getRoomTypes = async (params: {
  page?: number;
  limit?: number;
  title?: string;
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data ;
};

// ✅ Lấy chi tiết room type theo ID
export const getRoomTypeById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo room type (admin)
export const createRoomType = async (data:FormData) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update room type
export const updateRoomType = async (id: string, data: FormData) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa room type
export const deleteRoomType = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

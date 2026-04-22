
import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/messages";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả message
export const getMessages = async (params: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data;
};


// ✅ Lấy chi tiết message theo ID
export const getMessageById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};


// ✅ Update message
export const updateMessage = async (id: string, data: { status?: 'unresolved' | 'resolved' }) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa message
export const deleteMessage = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};


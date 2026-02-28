
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/messages`;

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả message
export const getMessages = async (params: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  const res = await axios.get(API_BASE_URL, { params });
  return res.data;
};


// ✅ Lấy chi tiết message theo ID
export const getMessageById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};


// ✅ Update message
export const updateMessage = async (id: string, data: { status?: 'unresolved' | 'resolved' }) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa message
export const deleteMessage = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};


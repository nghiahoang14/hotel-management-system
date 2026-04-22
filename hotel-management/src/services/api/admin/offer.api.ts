
import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/offers";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả offer
export const getOffers = async (params: {
  page?: number;
  limit?: number;
  title?: string;
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data;
};

// ✅ Lấy offer đang active
export const getActiveOffers = async () => {
  const res = await api.get(`${API_BASE_URL}/active`);
  return res.data;
};

// ✅ Lấy chi tiết offer theo ID
export const getOfferById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo offer (admin)
export const createOffer = async (data:FormData) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update offer
export const updateOffer = async (id: string, data: FormData) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa offer
export const deleteOffer = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};


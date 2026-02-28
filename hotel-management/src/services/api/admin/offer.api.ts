import { Offer } from "@/types/offer";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/offers`;

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả offer
export const getOffers = async (params: {
  page?: number;
  limit?: number;
  title?: string;
}) => {
  const res = await axios.get(API_BASE_URL, { params });
  return res.data;
};

// ✅ Lấy offer đang active
export const getActiveOffers = async () => {
  const res = await axios.get(`${API_BASE_URL}/active`);
  return res.data;
};

// ✅ Lấy chi tiết offer theo ID
export const getOfferById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo offer (admin)
export const createOffer = async (data:FormData) => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update offer
export const updateOffer = async (id: string, data: FormData) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa offer
export const deleteOffer = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};


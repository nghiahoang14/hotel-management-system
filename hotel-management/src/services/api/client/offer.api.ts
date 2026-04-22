import { api } from "@/src/lib/api";


const API_BASE_URL = "/offers";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả offer
export const getOffers = async () => {
  const res = await api.get(API_BASE_URL);
  return res.data?.data??"";
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


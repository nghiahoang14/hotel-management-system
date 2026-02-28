import { Offer } from "@/types/offer";
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/offers`;

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả offer
export const getOffers = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data?.data??"";
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


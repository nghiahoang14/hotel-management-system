import { api } from "@/src/lib/api";



const API_BASE_URL = "/room-type";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả room type
export const getRoomTypes = async () => {
  const res = await api.get(API_BASE_URL);
  return res.data?.data??"";
};



 
export const getRoomTypeBySlug = async (slug: string) => {
  const res = await api.get(`${API_BASE_URL}/${slug}`);
  return res.data;
};




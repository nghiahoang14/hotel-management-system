
import { api } from "@/src/lib/api";


const API_BASE_URL = "/facilities";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả facility
export const getFacilities = async () => {
  const res = await api.get(API_BASE_URL);
  return res.data?.data??"";
};

// ✅ Lấy chi tiết facility theo ID
export const getFacilityById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};


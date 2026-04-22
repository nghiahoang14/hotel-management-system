
import { api } from "@/src/lib/api";
import axios from "axios";

const API_BASE_URL = "/dining";

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả dining
export const getDining = async () => {
  const res = await api.get(API_BASE_URL);
  return res.data?.data??"";
};


// ✅ Lấy chi tiết dining theo ID
export const getDiningById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};


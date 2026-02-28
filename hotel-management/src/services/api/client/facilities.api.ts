
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/facilities`;

console.log("Fetching: ", API_BASE_URL);

// ✅ Lấy tất cả facility
export const getFacilities = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data?.data??"";
};

// ✅ Lấy chi tiết facility theo ID
export const getFacilityById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};


import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/facilities";

console.log("Fetching: ", API_BASE_URL);

// ✅ GET FACILITIES (pagination + search)
export const getFacilities = async (params: {
  page?: number;
  limit?: number;
  title?: string;
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data ;
};

// ✅ Lấy chi tiết facility theo ID
export const getFacilityById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// ✅ Tạo facility (admin)
export const createFacility = async (data:FormData) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ✅ Update facility
export const updateFacility = async (id: string, data: FormData) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

// ✅ Xóa facility
export const deleteFacility = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

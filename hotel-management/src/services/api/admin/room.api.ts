
import { api } from "@/src/lib/api";

const API_BASE_URL = "/admin/rooms";

console.log("Fetching: ", API_BASE_URL);

/* ================= GET ALL ROOMS ================= */
export const getRooms = async (params?: {
  page?: number;
  limit?: number;
  roomNumber?: string;
  roomType?: string;
  status?: "available" | "unavailable";
}) => {
  const res = await api.get(API_BASE_URL, { params });
  return res.data;
};

/* ================= GET BY ID ================= */
export const getRoomById = async (id: string) => {
  const res = await api.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

/* ================= CREATE ================= */
export const createRoom = async (data: {
  roomNumber: string;
  roomType: string;
  status?: "available" | "unavailable";
}) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

/* ================= UPDATE ================= */
export const updateRoom = async (
  id: string,
  data: {
    roomNumber?: string;
    roomType?: string;
    status?: "available" | "unavailable";
  }
) => {
  const res = await api.patch(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

/* ================= DELETE ================= */
export const deleteRoom = async (id: string) => {
  const res = await api.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

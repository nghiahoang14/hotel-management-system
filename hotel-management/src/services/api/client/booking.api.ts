import { api } from "@/src/lib/api";


const API_BASE_URL = "/booking";

console.log("Booking API:", API_BASE_URL);

// ======================================================
// 🔍 SEARCH AVAILABLE ROOM TYPES
// ======================================================
export const searchAvailableRooms = async (params: {
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  roomTypeId?: string;
}) => {
  const res = await api.get(`${API_BASE_URL}/search`, {
    params,
  });

  return res.data;
};

// ======================================================
// 🏨 CREATE BOOKING
// ======================================================
export const createBooking = async (data: {
  checkIn: string;
  checkOut: string;
  items: {
    roomTypeId: string;
    quantity: number;
  }[];
  guestInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
}) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};

// ======================================================
// ❌ CANCEL BOOKING
// ======================================================
export const cancelBooking = async (bookingId: string) => {
  const res = await api.patch(
    `${API_BASE_URL}/cancel/${bookingId}`
  );
  return res.data;
};
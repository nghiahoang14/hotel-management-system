
import { api } from "@/src/lib/api";

const API_BASE_URL = "/messages";

console.log("Fetching: ", API_BASE_URL);

export const createMessage = async (data:{
  name: string;
  phone: string;
  email: string;
  message?: string;
}) => {
  const res = await api.post(API_BASE_URL, data);
  return res.data;
};



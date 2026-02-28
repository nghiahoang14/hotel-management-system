
import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

console.log("Fetching: ", API_BASE_URL);

export const createMessage = async (data:{
  name: string;
  phone: string;
  email: string;
  message?: string;
}) => {
  const res = await axios.post(API_BASE_URL, data);
  return res.data;
};



// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: typeof window === "undefined"
    ? process.env.INTERNAL_API_URL ?? "http://localhost:3001"
    : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Request failed. Please try again.";
  }
  return "Unexpected error. Please try again.";
};

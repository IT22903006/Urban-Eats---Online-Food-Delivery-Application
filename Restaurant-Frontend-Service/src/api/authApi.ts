import api from "./axios";
import type { LoginResponse } from "../types/auth.types";

export const loginOwner = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerOwner = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post<LoginResponse>("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
};
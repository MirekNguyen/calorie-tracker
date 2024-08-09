'use client';
import { LoginData } from "@/types/login/loginSchema";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { baseApi } from "./api";

export const submitLogin = async ({ username, password }: LoginData) => {
  const response = await baseApi.post("auth/sign-in", { username, password });
  return response;
};

export const validateLogin = () => {
  const token = Cookies.get("jwt");
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ?? 0 > currentTime;
  } catch (error) {
    return false;
  }
};

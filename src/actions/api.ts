"use client";
import axios from "axios";
import { useCookies } from "react-cookie";

export const useApi = () => {
  const [cookies] = useCookies(['jwt']);
  const jwt = cookies.jwt;
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    withCredentials: false,
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
}

export const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: false,
});

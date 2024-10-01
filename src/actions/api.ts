"use client";
import axios from "axios";
import { useCookies } from "react-cookie";

export const useApi = () => {
  const [cookies] = useCookies(['jwt']);
  const jwt = cookies.jwt;
  return axios.create({
    baseURL: `/api`,
    withCredentials: false,
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
}

export const baseApi = axios.create({
  baseURL: `/api`,
  withCredentials: false,
});

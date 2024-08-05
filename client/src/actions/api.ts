"use client";
import axios from "axios";
import Cookies from "js-cookie";

const jwt = Cookies.get("jwt");
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: false,
  headers: {
    Authorization: "Bearer " + jwt,
    'Access-Control-Allow-Origin': '*',

  },
});

export const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

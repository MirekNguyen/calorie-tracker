'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const jwt = Cookies.get('jwt');
export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: 'Bearer ' + jwt,
  }
});

export const baseApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

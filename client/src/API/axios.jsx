/* eslint-disable quotes */
import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000/api'

export default axios.create({
  baseURL
});

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

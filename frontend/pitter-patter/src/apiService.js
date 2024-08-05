// src/apiService.js
import axios from "axios";

const baseURL = "https://pitter-patter.picel.net/api";
const timeout = 5000;

export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
  timeout: timeout,
});

export const childApi = axios.create({
  baseURL: `${baseURL}/child`,
  timeout: timeout,
});

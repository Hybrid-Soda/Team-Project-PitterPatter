// src/apiService.js
import axios from "axios";

const host = "https://pitter-patter.picel.net";
const baseURL = `${host}/api`;
const timeout = 5000;

export const hostApi = axios.create({
  baseURL: host,
  timeout: timeout,
})

export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
  timeout: timeout,
});

export const childApi = axios.create({
  baseURL: `${baseURL}/child`,
  timeout: timeout,
});

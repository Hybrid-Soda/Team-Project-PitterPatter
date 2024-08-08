// src/apiService.js
import axios from "axios";
import { reissueJwtToken } from "./pages/User/userApi.js";

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

export const assetsApi = axios.create({
  baseURL: `${baseURL}/assets`,
  timeout: timeout,
});

const setupInterceptors = (axiosInstance) => {
  // 응답 인터셉터 설정
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      handleError(error);
      const {
        config,
        response: { status },
      } = error;
  
      const originalRequest = config;
  
      // 토큰 재발급 수행
      if (status === 401) {
        console.log("토큰 만료되어 재발급 함");
        // redux에서 값 가져오기
        const accessToken = 'access token';
        const refreshToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMyIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIzMDk3NjQ1LCJpYXQiOjE3MjMwOTc2NDUsImV4cCI6MTcyMzcwMjQ0NSwianRpIjoiZTUwZDA4MGItZjg5Ni00NmQ3LTkyYzQtNGRiNDk0MWNmM2VjIn0.W_vGUiyeABFCn2jEE5PscfWtmW8WNn_iRKfi2LdD6Woa4bCcHxVg1w5v_8tUeMTq2IC8g2snwiya_JnxLjuixw';
  
        try {
          const { data } = await axios({
            method: 'patch',
            url: `https://pitter-patter.picel.net/api/user/reissue`,
            headers: { "Authorization": `Bearer ${refreshToken}` },
          });

          if (data.exception !== undefined) {
            throw new Error("토큰 검증 실패");
          }

          const newAccessToken = data.data.accessToken;
          const newRefreshToken = data.data.refreshToken;
          
          // redux에 새로 받아온 토큰 값 저장
          // ...

          originalRequest.headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + newAccessToken,
          };

          return await axios(originalRequest);
        } catch (error) {
          // 로그아웃 시키기
          // ...
          new Error(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

const handleError = (error) => {
  // 오류 처리
  if (error.response) {
   // 서버가 응답을 반환했지만 상태 코드가 2xx 범위가 아님
   console.error('Error Response Status:', error.response.status);
   console.error('Error Response Data:', error.response.data);
   console.error('Error Response Headers:', error.response.headers);
 } else if (error.request) {
   // 요청은 성공적으로 전송되었지만 응답을 받지 못함
   console.error('Error Request:', error.request);
 } else {
   // 요청 설정에서 발생한 오류
   console.error('Error Message:', error.message);
 }
};

// 각 Axios 인스턴스에 인터셉터 적용
setupInterceptors(hostApi);
setupInterceptors(userApi);
setupInterceptors(childApi);
setupInterceptors(assetsApi);
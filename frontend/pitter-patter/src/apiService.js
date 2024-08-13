// src/apiService.js
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, clearToken } from "./redux/tokenSlice";
import store from "./redux/store";
import Modal from "./pages/Components/modal";

const host = "https://pitter-patter.picel.net";
const baseURL = `${host}/api`;
const timeout = 5000;

export const hostApi = axios.create({
  baseURL: host,
  timeout: timeout,
});

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

export const gameApi = axios.create({
  baseURL: `${baseURL}/game`,
  timeout: timeout,
});

export const handleReissueCatch = (error) => {
  if (error.response && error.response.status === 401) {
    // intercetor에서 토큰 재발급 수행
    alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
    window.location.href = "/";
  } else if (error.msg && error.msg === "토큰 검증 실패") {
    // intercetor에서 토큰 재발급 수행
    alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
    window.location.href = "/";
  } else {
    // alert("문제가 발생했습니다. 다시 시도해주세요.");
  }
};

const closeModal = () => {
  setModalOpen(false);
};

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
      const state = store.getState(); // store에서 상태를 가져옵니다.
      const { refreshToken, accessToken } = state.token;

      // 토큰 재발급 수행
      if (status === 401) {
        // redux에서 값 가져오기

        try {
          const { data } = await axios({
            method: "patch",
            url: `https://pitter-patter.picel.net/api/user/reissue`,
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          if (data.exception !== undefined) {
            throw new Error("토큰 검증 실패");
          }

          // console.log(data);
          store.dispatch(setToken(data.data)); // 새로운 토큰을 store에 저장
          const newAccessToken = data.data.accessToken;

          originalRequest.headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          };

          return await axios(originalRequest);
        } catch (error) {
          // 로그아웃 시키기
          dispatch(clearToken());
          // 모달
          window.location.href = "/login";
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
    console.error("Error Response Status:", error.response.status);
    console.error("Error Response Data:", error.response.data);
    console.error("Error Response Headers:", error.response.headers);
  } else if (error.request) {
    // 요청은 성공적으로 전송되었지만 응답을 받지 못함
    console.error("Error Request:", error.request);
  } else {
    // 요청 설정에서 발생한 오류
    console.error("Error Message:", error.message);
  }
};

// 각 Axios 인스턴스에 인터셉터 적용
setupInterceptors(hostApi);
setupInterceptors(userApi);
setupInterceptors(childApi);
setupInterceptors(assetsApi);

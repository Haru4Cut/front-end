import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "", // 기본 URL
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true, // 이 설정을 추가하여 CORS 관련 문제를 해결할 수 있음
});

// request 인터셉터를 설정하여 요청을 보내기 전에 토큰을 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken을 가져옴
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더에 토큰을 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

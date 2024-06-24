import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store";

const Redirection = () => {
  console.log("hi");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasFetchedData = useRef(false);

  const fetchData = async () => {
    try {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log("code", code);
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      };
      const response = await axiosInstance.post(
        `http://52.79.154.88:8080/users/login/${code}`,
        {},
        {
          headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("로그인 성공", response.data);
      navigate("/main");
      dispatch(setUserId(response.data.userId)); // userId를 Redux로 저장

      // 로컬스토리지에 token, userId 저장
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);

      // 캐릭터 생성 여부를 판단하는 부분
      try {
        const characterResponse = await axiosInstance.get(
          `/character/${response.data.userId}`
        );
        console.log("캐릭터 정보", characterResponse.data);
        navigate("/main");
      } catch (characterError) {
        console.error("캐릭터 정보 조회 오류", characterError);
        navigate("/character");
      }
    } catch (error) {
      console.error("로그인 오류 발생", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return <div>Redirecting...</div>;
};

export default Redirection;

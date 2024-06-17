import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store";
import axiosInstance from "../../api/axiosInstance";
const Redirection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasFetchedData = useRef(false); // 추가된 부분

  const code = new URL(window.location.href).searchParams.get("code");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `/users/login/${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("로그인 성공", response.data);
      dispatch(setUserId(response.data.userId)); // userId를 Redux로 저장

      // 로컬스토리지에 token, userId 저장
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);

      // 캐릭터 생성 여부를 판단하는 부분
      try {
        const characterResponse = await axiosInstance.get(
          `/character/${localStorage.getItem("userId")}`
        );
        console.log(characterResponse);
        navigate("/main");
      } catch (characterError) {
        navigate("/character");
      }
    } catch (error) {
      console.error("로그인 오류 발생", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      // 추가된 부분
      fetchData();
      hasFetchedData.current = true; // 추가된 부분
    }
  }, []);

  return null;
};

export default Redirection;

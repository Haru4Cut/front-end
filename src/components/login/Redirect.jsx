// Redirection.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../store";
import axios from "axios";

const Redirection = () => {
  console.log("test");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log("code", code);

      if (code) {
        try {
          const response = await axios.post(
            `https://haru4cut.site/users/login/${code}`,
            {},
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 로컬 스토리지에서 토큰을 가져와서 Authorization 헤더에 추가
              },
            }
          );
          console.log("로그인 성공", response.data);

          // userId를 Redux로 저장
          dispatch(setUserId(response.data.userId));
          console.log("response.data.userId", response.data.userId);

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
      }
    };

    fetchData();
  }, []);
  const userId = useSelector((state) => state.user.userId);
  console.log("userIdddd:", userId);

  return <div>Redirecting...</div>;
};

export default Redirection;

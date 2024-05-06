import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `/users/login/${code}`,
        {},
        {
          withCredentials: false, // 쿠키 전송 안 함
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { userId, accessToken } = response.data;
      console.log("로그인 성공", response.data);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);

      // 새로 로그인한 경우 캐릭터 설정 페이지로 이동
      navigate("/main");
    } catch (error) {
      console.error("로그인 오류 발생", error);
      // 오류 페이지나 로그인 페이지로 리디렉션 할 수 있습니다.
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [code]); // useEffect가 code에만 의존하도록 변경

  // UI를 렌더링할 필요가 없는 경우가 많으므로 null을 반환
  return null;
};

export default Redirection;

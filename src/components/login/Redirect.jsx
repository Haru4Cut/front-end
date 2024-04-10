import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Redirection = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
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

      const { userId, accessToken } = response.data;
      console.log(response.data);
      console.log("로그인 성공");
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);

      // userId가 이미 저장되어 있는지 여부 확인
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        // 이미 저장된 userId가 있으면 메인 페이지로 이동
        navigate("/main");
      } else {
        // 저장된 userId가 없으면 현재 userId를 저장하고 캐릭터 설정 페이지로 이동
        localStorage.setItem("userId", userId);
        setUserId(userId);
        navigate(`/character/${userId}`);
      }
    } catch (error) {
      console.log("로그인 오류 발생", error);
    }
  };

  useEffect(() => {
    if (code) {
      fetchData();
    } else {
      const storedToken = localStorage.getItem("accessToken");
      const storedUserId = localStorage.getItem("userId");
      if (storedToken && storedUserId) {
        setAccessToken(storedToken);
        setUserId(storedUserId);
      }
    }
  }, [code]);

  // 로딩 메시지 표시
  if (!accessToken || !userId) {
    return <div>로그인 중입니다...</div>;
  }

  // 리디렉션 후에는 아무것도 표시하지 않음
  return null;
};

export default Redirection;

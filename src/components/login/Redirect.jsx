import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Redirection = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const isCharacterCreated = useSelector((state) => state.isCharacterCreated);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `/users/login/${code}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("로그인 성공", response.data);

      // 캐릭터 생성 여부가 true이면 main으로, false이면 character로 이동
      if (isCharacterCreated) {
        navigate("/main");
      } else {
        navigate("/character");
      }
    } catch (error) {
      console.error("로그인 오류 발생", error);
      // 오류 페이지나 로그인 페이지로 리디렉션 할 수 있습니다.
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [code, isCharacterCreated]); // useEffect가 code에만 의존하도록 변경

  // UI를 렌더링할 필요가 없는 경우가 많으므로 null을 반환
  return null;
};

export default Redirection;

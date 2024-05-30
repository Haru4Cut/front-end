import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store";

const Redirection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");

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
      dispatch(setUserId(response.data.userId)); // userId를 Redux로 저장
      localStorage.setItem("userId", response.data.userId);
      // 캐릭터 아이디가 있으면 메인으로, 없으면 캐릭터 페이지로 이동
      const characterId = localStorage.getItem("characterId");
      if (characterId) {
        navigate("/main");
      } else {
        navigate("/character");
      }
    } catch (error) {
      console.error("로그인 오류 발생", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return null;
};

export default Redirection;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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

      // 새로 로그인한 경우 캐릭터 설정 페이지로 이동
      navigate("/main");
    } catch (error) {
      console.error("로그인 오류 발생", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [code]); // useEffect가 code에만 의존하도록 변경

  return null;
};

export default Redirection;

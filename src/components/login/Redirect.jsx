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
      // 응답에서 userId 추출
      const userId = response.data.userId;
      // 리덕스 스토어에 userId 업데이트
      dispatch(setUserId(userId));

      navigate("/main");
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

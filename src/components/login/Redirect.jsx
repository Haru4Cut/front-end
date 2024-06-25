import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store";

const Redirection = () => {
  console.log("hi");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasFetchedData.current) {
          const code = new URL(window.location.href).searchParams.get("code");
          console.log("code", code);

          const response = await axiosInstance.post(`/users/login/${code}`);
          console.log("로그인 성공", response.data);

          // userId를 Redux로 저장
          dispatch(setUserId(response.data.userId));

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

          hasFetchedData.current = true;
        }
      } catch (error) {
        console.error("로그인 오류 발생", error);
        navigate("/login");
      }
    };

    fetchData();
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  return <div>Redirecting...</div>;
};

export default Redirection;

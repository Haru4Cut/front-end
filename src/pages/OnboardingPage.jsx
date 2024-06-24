import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setUserId } from "../store";
//import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
const OnboardingPage = () => {
  const dispatch = useDispatch();
  const [fade, setFade] = useState("start");
  const [buttonFade, setButtonFade] = useState("");
  dispatch(setUserId(34)); // userId를 Redux로 저장
  const userId = useSelector((state) => state.userId);
  console.log("userId", userId);
  useEffect(() => {
    setFade("end"); // 이미지의 fade 상태를 "end"로 변경하여 transition 시작
    const timeout = setTimeout(() => {
      setButtonFade("fade-in"); // 이미지의 transition이 끝난 후 버튼의 클래스 변경하여 transition 시작
    }, 2500); // 이미지의 transition 시간과 동일한 시간으로 설정

    return () => clearTimeout(timeout); // timeout 클리어
  }, []);

  return (
    <div className="wrap">
      <OnboardingWrap>
        <StyledImg
          className={fade}
          src={"/images/koreanlogo.png"}
          alt="Korean Logo"
        />

        <OnboardingMsg>내 하루를 네컷으로 기록하세요</OnboardingMsg>
        <StartButton className={buttonFade} to="/login">
          시작하기
        </StartButton>
      </OnboardingWrap>
    </div>
  );
};

export default OnboardingPage;

const OnboardingWrap = styled.div`
  display: flex;
  background-color: #f3f5f6;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 500px;
  // margin: 20px 0; /* 여기에 마진을 추가 */margin: 20px 0; /* 여기에 마진을 추가 */
`;

const OnboardingMsg = styled.div`
  font-family: "KotraHope";
  color: #a8c9e7;
  font-size: 1rem;
  letter-spacing: 0.1em;
  margin-bottom: 20vh;
`;
const StyledImg = styled.img`
  width: 70%;
  height: 25%;
  opacity: 0; /* 초기에는 투명하게 설정 */
  transition: opacity 2s; /* transition 효과 설정 */

  &.end {
    opacity: 1; /* transition으로 인해 서서히 나타나도록 설정 */
  }
`;

const StartButton = styled(Link)`
  font-size: 14px;
  background-color: #5370d4;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  padding: 12px 80px;
  text-align: center;
  width: 30%;

  cursor: pointer;
  font-family: Pretendard;
  opacity: 0; /* 초기에는 투명하게 설정 */
  transition: opacity 2s; /* transition 효과 설정 */

  &.fade-in {
    opacity: 1; /* transition으로 인해 서서히 나타나도록 설정 */
  }
`;

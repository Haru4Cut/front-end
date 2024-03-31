import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const OnboardingPage = () => {
  const [fade, setFade] = useState("start");
  const [buttonFade, setButtonFade] = useState("");

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
        {/* <OnboardingLogo>Haru4Cut</OnboardingLogo> */}
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
  border-radius: 30px;
  background-color: #f3f5f6;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 85%;
`;
const OnboardingLogo = styled.div`
  font-family: "OleoScriptSwashCapsBold";
  color: #a8c9e7;
  font-size: 3rem;
  letter-spacing: 0.1em;
`;
const OnboardingMsg = styled.div`
  font-family: "KotraHope";
  color: #a8c9e7;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
`;
const StyledImg = styled.img`
  width: 20%;
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
  width: 4vw;
  border-radius: 20px;
  padding: 12px 80px;
  text-align: center;

  cursor: pointer;
  font-family: Pretendard;
  opacity: 0; /* 초기에는 투명하게 설정 */
  transition: opacity 2s; /* transition 효과 설정 */

  &.fade-in {
    opacity: 1; /* transition으로 인해 서서히 나타나도록 설정 */
  }
`;

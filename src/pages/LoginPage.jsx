import styled from "styled-components";
import KakaoLogin from "../components/login/SocialKakao";
import { ReactComponent as PhotoLogo } from "../../src/assets/images/photo.svg";
const LoginPage = () => {
  return (
    <div>
      <LoginWrap>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <PhotoLogo />
          <LoginLogo>Haru4Cut</LoginLogo>
          <OnboardingMsg>내 하루를 네컷으로 기록하세요</OnboardingMsg>
        </div>
        <KakaoLogin />
      </LoginWrap>
    </div>
  );
};

export default LoginPage;

const LoginWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const LoginLogo = styled.div`
  font-family: "OleoScriptSwashCapsBold";
  color: #a8c9e7;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  margin-bottom: 30px;
`;
const OnboardingMsg = styled.div`
  font-family: "KotraHope";
  color: #a8c9e7;
  font-size: 1rem;
  letter-spacing: 0.1em;
  margin-bottom: 20vh;
`;

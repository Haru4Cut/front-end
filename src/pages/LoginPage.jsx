import styled from "styled-components";
import KakaoLogin from "../components/login/SocialKakao";

const LoginPage = () => {
  return (
    <div>
      <LoginWrap>
        <LoginLogo>Haru4Cut</LoginLogo>
        <KakaoLogin />
      </LoginWrap>
    </div>
  );
};

export default LoginPage;

const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const LoginLogo = styled.div`
  font-family: "OleoScriptSwashCapsBold";
  color: #a8c9e7;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
`;

const MiddleText = styled.div`
  font-family: "PoetsenOne";
  font-size: 1rem;
`;

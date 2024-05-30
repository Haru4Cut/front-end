import styled from "styled-components";
import KakaoLogin from "../components/login/SocialKakao";

const LoginPage = () => {
  return (
    <div className="wrap">
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
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 85%;
`;
const LoginLogo = styled.div`
  font-family: "OleoScriptSwashCapsBold";
  color: #a8c9e7;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
`;

import styled from "styled-components";
import KakaoLogin from "../components/login/SocialKakao";

const LoginPage = () => {
  return (
    <div className="wrap">
      <LoginWrap>
        <img
          src={"/images/Haru4Cut.png"}
          style={{ width: "30%", height: "15%" }}
        />
        <img
          src={"/images/logincontainer.png"}
          style={{ width: "25%", height: "50%", marginTop: "3%" }}
        />
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

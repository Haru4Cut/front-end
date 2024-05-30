import React from "react";
import { styled } from "styled-components";

const KakaoLogin = () => {
  const REST_API_KEY = "ff5cfd59376e7e4e903dd4b45e1f7a50";
  const Redirect_URI = "http://localhost:3000/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}&response_type=code`;

  return (
    <>
      <div className="wrap">
        <LoginWrap>
          <LoginLogo>Haru4Cut</LoginLogo>
          <img
            src={"/images/kakao.png"}
            alt="카카오로그인"
            onClick={() => (window.location.href = kakaoURL)}
            style={{
              cursor: "pointer",
              height: "5vh",
              width: "60vw",
              marginTop: "10vh",
            }} // Show cursor as pointer on hover
          />
        </LoginWrap>
      </div>
    </>
  );
};

export default KakaoLogin;

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

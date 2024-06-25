// SocialKakao.jsx
import React from "react";
import styled from "styled-components";
import { ReactComponent as LoginButton } from "../../assets/images/kakaologin.svg";

const KakaoLogin = () => {
  const REST_API_KEY = "ff5cfd59376e7e4e903dd4b45e1f7a50";
  const Redirect_URI =
    "https://haru4cut.github.io/front-end/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}&response_type=code`;

  return (
    <>
      <div>
        <LoginWrap>
          <LoginButton
            alt="카카오로그인"
            onClick={() => (window.location.href = kakaoURL)}
            style={{
              cursor: "pointer",
            }}
          />
        </LoginWrap>
      </div>
    </>
  );
};

export default KakaoLogin;

const LoginWrap = styled.div``;

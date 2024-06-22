import React from "react";
import { styled } from "styled-components";

const KakaoLogin = () => {
  const REST_API_KEY = "ff5cfd59376e7e4e903dd4b45e1f7a50";
  const Redirect_URI = "https://haru4cut.site/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}&response_type=code`;
  //const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}&response_type=code`;

  return (
    <>
      <div>
        <LoginWrap>
          <img
            src={"/images/kakao.png"}
            alt="카카오로그인"
            onClick={() => (window.location.href = kakaoURL)} //클릭할 때 kakaoURL에 저장된 URL로 브라우저를 이동시키는 것을 의미
            style={{
              cursor: "pointer",
              height: "30px",
              width: "150px",
              marginTop: "100px",
              marginBottom: "80px",
            }}
          />
        </LoginWrap>
      </div>
    </>
  );
};

export default KakaoLogin;

const LoginWrap = styled.div``;

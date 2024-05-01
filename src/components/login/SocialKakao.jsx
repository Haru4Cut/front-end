import React from "react";
import getJWTToken from "./GetToKen";

const KakaoLogin = () => {
  const REST_API_KEY = "ff5cfd59376e7e4e903dd4b45e1f7a50";
  const Redirect_URI = "http://localhost:3000/login/oauth2/code/kakao";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}&response_type=code&prompt=login`;

  return (
    <>
      <img
        src={"/images/kakao.png"}
        alt="카카오로그인"
        onClick={() => (window.location.href = kakaoURL)}
        style={{
          cursor: "pointer",
          height: "5%",
          marginTop: "20vh",
        }} // Show cursor as pointer on hover
      />
    </>
  );
};

export default KakaoLogin;

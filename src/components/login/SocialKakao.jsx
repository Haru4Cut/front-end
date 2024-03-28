import React from "react";
import getJWTToken from "./GetToKen";

const KakaoLogin = () => {
  const REST_API_KEY = "632de4023b13afb3a27a1fd172f6334a";
  const Redirect_URI = "http://localhost:3000/oauth/kakaologin";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}`;

  const handleLogin = async () => {
    // Request Kakao authorization code
    window.location.href = kakaoURL; // Redirect the user to Kakao login page

    // The following code will be executed after the user completes Kakao authorization.
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      // Request JWT token using the authorization code
      await getJWTToken(authorizationCode);
    }
  };

  return (
    <>
      <img
        src={"/images/kakao.png"}
        alt="카카오로그인"
        onClick={handleLogin}
        style={{
          cursor: "pointer",
          width: "25%",
          height: "5%",
          marginTop: "10%",
        }} // Show cursor as pointer on hover
      />
    </>
  );
};

export default KakaoLogin;

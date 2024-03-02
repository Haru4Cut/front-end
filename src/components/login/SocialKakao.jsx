import getJWTToken from "./GeoToKen";

const KakaoLogin = () => {
  const REST_API_KEY = "632de4023b13afb3a27a1fd172f6334a";
  const Redirect_URI = "http://localhost:3000/oauth/kakaologin";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${Redirect_URI}`;
  const handleLogin = async () => {
    // 카카오 인가 코드 요청
    window.location.href = kakaoURL; // 사용자를 카카오 로그인 페이지로 리디렉션

    // 이하 코드는 사용자가 카카오 인가 후에 실행될 코드입니다.
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      // 인가 코드가 존재할 경우, 해당 코드를 사용하여 JWT 토큰 요청
      await getJWTToken(authorizationCode);
    }
  };

  return (
    <>
      <button onClick={handleLogin}>카카오로그인</button>
    </>
  );
};

export default KakaoLogin;

/*window.location.href는 현재 창의 URL을 변경하는 JavaScript의 기능*/
/*사용자를 kakaoURL로 리다이렉트하여 카카오 인증 서버에서 권한 부여 코드를 요청하게 됩니다*/

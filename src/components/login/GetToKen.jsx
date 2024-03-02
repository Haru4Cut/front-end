const getJWTToken = async (authorizationCode) => {
  try {
    const response = await fetch("/oauth/kakaologin", {
      method: "POST", //fetch() 함수를 사용하여 백엔드 서버의 /oauth/kakaologin 엔드포인트로 POST 요청
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: authorizationCode }),
    }); //요청 본문에는 JSON 형식으로 { code: authorizationCode } 객체가 포함

    if (!response.ok) {
      throw new Error("Failed to fetch JWT token from backend.");
    }

    const data = await response.json();
    const jwtToken = data.token; // 서버에서 전달한 토큰 필드에 따라 수정 필요

    document.cookie = `jwtToken=${jwtToken}; path=/;`;

    console.log("JWT token received and stored successfully.");
    // 원하는 작업 수행
  } catch (error) {
    console.error("Error sending authorization code to backend:", error);
  }
};

export default getJWTToken;

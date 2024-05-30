import axios from "axios";

const getJWTToken = async (authorizationCode) => {
  try {
    const response = await axios.post(
      "/oauth/kakaologin",
      { code: authorizationCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error("백엔드에서 jwt토큰 받아오기 실패");
    }

    const jwtToken = response.data.access_token;

    // 원하는 작업 수행
  } catch (error) {
    console.error("백엔드로 인가코드 보내기 실패", error);
  }
};

export default getJWTToken;

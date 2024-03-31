import Button from "../common/Button";
import axios from "axios";
export default function SubmitButton({
  nickName,
  selectedGender,
  selectedAge,
  selectedHairStyle,
  selectedHairColor,
  selectedSkin,
  etcText,
}) {
  const userId = 1;
  const characterImage = "testurl";
  const onSubmit = () => {
    let characterData = {
      sex: selectedGender, // 성별
      age: selectedAge, // 나이
      hairColor: selectedHairColor, // 머리 색
      hairLength: selectedHairStyle, // 머리 스타일
      skinColor: selectedSkin, // 피부 색
      nickName: nickName, // 닉네임
      characterImage: characterImage, // 받아온 캐릭터 이미지
      etc: etcText, // 기타 정보
    };
    // request body 콘솔 출력
    console.log(JSON.stringify(characterData));

    // 연동 코드
    axios
      .post(`/character/${userId}`, characterData, {
        headers: {
          //"Content-Type": "application/json",
          Accept: "*/*",
          "Content-Type": `application/json`,
          "Access-Control-Allow-Origin": "*",
          //"Access-Control-Allow-Credentials": "true",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button backgroundColor="#8068B2" onClick={onSubmit}>
      캐릭터 완성!
    </Button>
  );
}

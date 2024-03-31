import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { setCharacterData } from "../../store";
export default function SubmitButton({
  selectedGender,
  selectedAge,
  selectedHairStyle,
  selectedHairColor,
  selectedSkin,
  etcText,
}) {
  const dispatch = useDispatch();
  const onSubmit = () => {
    let characterData = {
      sex: selectedGender, // 성별
      age: selectedAge, // 나이
      hairColor: selectedHairColor, // 머리 색
      hairLength: selectedHairStyle, // 머리 스타일
      skinColor: selectedSkin, // 피부 색
      etc: etcText, // 기타 정보
    };
    // request body 콘솔 출력
    console.log(JSON.stringify(characterData));
    dispatch(setCharacterData(characterData));

  };

  return (
    <Button
      backgroundColor="#8068B2"
      onClick={onSubmit}
      to="/character/profile"
    >
      프로필 사진 만들기!
    </Button>
  );
}

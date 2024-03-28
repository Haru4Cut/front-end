import Button from "../common/Button";
import axios from "axios";
export default function SubmitButton({
  selectedGender,
  selectedAge,
  selectedHairStyle,
  selectedHairColor,
  selectedSkin,
  etcText,
}) {
  const userId = 1;
  const onSubmit = () => {
    const characterData = {
      sex: selectedGender,
      age: selectedAge,
      hairColor: selectedHairColor,
      hairLength: selectedHairStyle,
      skinColor: selectedSkin,
      etc: etcText,
    };

    console.log(JSON.stringify(characterData));

    const serverURL = `http://52.79.154.88:8080/character/${userId}`;

    axios
      .post(serverURL, characterData, {
        withCredentials: true,
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

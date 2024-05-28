import React, { useState, useEffect } from "react";
import styled from "styled-components";
import editIcon from "../assets/images/editIcon.svg";
import checkIcon from "../assets/images/checkIcon.svg";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import LoadingImage from "../assets/images/LoadingSpinner.gif";
import axios from "axios";
export default function MyPage() {
  const [isNickNameEditing, setIsNickNameEditing] = useState(false); // 닉네임 수정중임을 나타내는 상태
  const [editedNickname, setEditedNickname] = useState(""); // 수정된 닉네임을 저장하는 상태

  // 닉네임 수정
  const onEditNickName = () => {
    setIsNickNameEditing(true);
  };

  // 닉네임 저장
  const onNickNameSave = async () => {
    setIsNickNameEditing(false);
    try {
      await axios.post(
        `/character/${userId}/name`,
        { nickName: editedNickname },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": `application/json`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
      alert("닉네임이 변경되었습니다.");
      console.log(editedNickname);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };
  const userId = localStorage.getItem("userId");
  // test userId
  //const userId = 1;

  const [character, setCharacter] = useState();

  useEffect(() => {
    const fetchDiaaryDate = async () => {
      try {
        const response = await axios.get(`/character/${userId}`);
        console.log(response.data);
        setCharacter(response.data);
        setEditedNickname(response.data.nickName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaaryDate();
  }, []);

  return (
    <MyPageWrap>
      <Header>
        <BackButton />
        <MyPageText>마이페이지</MyPageText>
      </Header>
      {/*프로필 이미지*/}
      <ProfileImgWrap>
        {character ? (
          <>
            <NickNameWrap>
              {isNickNameEditing ? (
                <>
                  <NickNameInput
                    value={editedNickname}
                    onChange={(e) => setEditedNickname(e.target.value)}
                    maxLength={5}
                  />
                  <Icon src={checkIcon} onClick={onNickNameSave} />
                </>
              ) : (
                <>
                  <NickNameText>{editedNickname}</NickNameText>
                  <Text>님</Text>
                  <Icon src={editIcon} onClick={onEditNickName} />
                </>
              )}
            </NickNameWrap>
            <ProfileImg src={character.characterImage} />
          </>
        ) : (
          <LoadingSpinner src={LoadingImage} alt="로딩중" />
        )}
      </ProfileImgWrap>
      {/*내 캐릭터 정보*/}
      <CharacterInfoWrap>
        <Box>
          <CharacterInfoText>내 캐릭터 정보</CharacterInfoText>
        </Box>
        {character ? (
          <>
            <InfoTextWrap>
              <InfoBoldText>성별</InfoBoldText>
              <InfoText>{character.sex === 1 ? "여자" : "남자"}</InfoText>
            </InfoTextWrap>
            <InfoTextWrap>
              <InfoBoldText>나이</InfoBoldText>
              <InfoText>
                {character.age === 1
                  ? "10대"
                  : character.age === 2
                  ? "20-30대"
                  : character.age === 3
                  ? "40-50대"
                  : "60대 이상"}
              </InfoText>
            </InfoTextWrap>
            <InfoTextWrap>
              <InfoBoldText>머리스타일</InfoBoldText>
              <InfoText>
                {character.hairLength === 1
                  ? "숏컷"
                  : character.hairLength === 2
                  ? "단발"
                  : "장발"}
                <HairColorCircle
                  backgroundColor={
                    character.hairColor === 1
                      ? "black"
                      : character.hairColor === 2
                      ? "#745629"
                      : character.hairColor === 3
                      ? "#B40000"
                      : "#F0C734"
                  }
                  marginLeft="12px"
                />
              </InfoText>
            </InfoTextWrap>
            <InfoTextWrap>
              <InfoBoldText>피부색</InfoBoldText>
              <HairColorCircle
                backgroundColor={
                  character.skinColor === 1
                    ? "#FAF4EC"
                    : character.skinColor === 2
                    ? "#F3DB9E"
                    : "#3E2809"
                }
              />
            </InfoTextWrap>
            <InfoTextWrap>
              <InfoBoldText whiteSpace="pre-line">
                기타 정보
                <InfoText marginTop="7px">{character.etc}</InfoText>
              </InfoBoldText>
            </InfoTextWrap>
            <Box marginTop="40px">
              <Button width="240px" to="/character">
                캐릭터 변경하기
              </Button>
            </Box>
          </>
        ) : (
          <LoadingSpinnerCharacter src={LoadingImage} alt="로딩중" />
        )}
      </CharacterInfoWrap>
    </MyPageWrap>
  );
}

const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f3f5f6;
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10px;
  position: relative;
  font-family: "KotraHope";
  font-size: 24px;
  text-align: center;
`;

const MyPageText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const NickNameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const NickNameText = styled.div`
  font-family: "KotraHope";
  font-size: 26px;
  color: #3a3a3a;
  text-align: center;
`;

const NickNameInput = styled.input`
  margin-right: 10px;
  font-family: "KotraHope";
  width: 100px;
  font-size: 21px;
  color: #3a3a3a;
  text-align: center;
  border: none;
  padding-bottom: 5px;
  border-bottom: 2px solid #a5a5a5;
  outline: none;
`;

const Text = styled.div`
  font-size: 17px;
  color: #858585;
  text-align: center;
  margin: 2px 15px 0px 8px;
`;
const Icon = styled.img`
  cursor: pointer;
`;

const ProfileImgWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 30%;
`;

const ProfileImg = styled.img`
  width: 145px;
`;

const CharacterInfoWrap = styled.div`
  display: flex;
  background-color: white;
  border-radius: 30px;
  justify-content: center;
  flex-direction: column;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 55%;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.marginTop || "0px"};
`;

const CharacterInfoText = styled.div`
  color: #3a3a3a;
  font-size: 19px;
  font-weight: 600;
  margin: 0px 0px 40px 0px;
  padding: 0px 7px 5px 7px;
  border-bottom: 1px solid #5f5f5f;
`;

const InfoTextWrap = styled.div`
  color: #3a3a3a;
  font-size: 16px;
  display: flex;
  margin: 10px 0px;
`;

const InfoBoldText = styled.div`
  margin-left: 20%;
  font-weight: 900;
  margin-right: 25px;
  white-space: ${(props) => props.whiteSpace || "nowrap"};
`;
const InfoText = styled.div`
  font-weight: 500;
  width: 230px;
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.marginTop || "0px"};
  line-height: 1.3;
`;

const HairColorCircle = styled.div`
  background-color: ${(props) => props.backgroundColor};
  width: 18px;
  height: 18px;
  border-radius: 50px;
  margin-left: ${(props) => props.marginLeft || "0px"};
  z-index: 2;
`;

const LoadingSpinnerCharacter = styled.img`
  width: 40px;
  position: relative;
  left: 46%;
  margin-top: 80px;
  margin-bottom: 150px;
`;

const LoadingSpinner = styled.img`
  width: 40px;
`;

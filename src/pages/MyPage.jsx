import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import editIcon from "../assets/images/editIcon.svg";
import checkIcon from "../assets/images/checkIcon.svg";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import LoadingImage from "../assets/images/LoadingSpinner.gif";
import pencilImg from "../assets/images/EDIT.svg";
import questionIcon from "../assets/images/Question_fill.svg";
import PencilInfo from "../components/common/PencilInfo";
import axiosInstance from "../api/axiosInstance";
import { v4 as uuidv4 } from "uuid";
import Payment from "../components/common/Payment";

export default function MyPage() {
  const [isNickNameEditing, setIsNickNameEditing] = useState(false); // 닉네임 수정중임을 나타내는 상태
  const [editedNickname, setEditedNickname] = useState(""); // 수정된 닉네임을 저장하는 상태
  const [isHovered, setIsHovered] = useState(false);
  const questionIconRef = useRef(null);

  // 모달창 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 닉네임 수정
  const onEditNickName = () => {
    setIsNickNameEditing(true);
  };

  // 닉네임 저장
  const onNickNameSave = async () => {
    try {
      await axiosInstance.patch(`/character/${userId}/nickName`, {
        nickName: editedNickname,
      });
      alert("닉네임이 변경되었습니다.");
      setIsNickNameEditing(false);
      console.log(editedNickname);
    } catch (error) {
      console.error(error);
    }
  };

  const userId = localStorage.getItem("userId");

  const [character, setCharacter] = useState();

  // 캐릭터 정보 받아오기
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axiosInstance.get(`/character/${userId}`);
        console.log(response.data);
        setCharacter(response.data);
        setEditedNickname(response.data.nickName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacter();
  }, [userId]);

  // 툴팁 위치
  const getPosition = () => {
    if (questionIconRef.current) {
      const rect = questionIconRef.current.getBoundingClientRect();
      return {
        top: rect.top - 80,
        left: rect.left - 70,
      };
    }
    return { top: 0, left: 0 };
  };
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
            <ProfileImg src={`${character.characterImage}?${uuidv4()}`} />
          </>
        ) : (
          <LoadingSpinner src={LoadingImage} alt="로딩중" />
        )}
      </ProfileImgWrap>
      {/*내 캐릭터 정보*/}
      <CharacterInfoWrap>
        <PencilInfoBox>
          <Box>
            <CharacterInfoText>보유 연필</CharacterInfoText>
          </Box>
          <PencilWrap>
            <PencilImage src={pencilImg} alt="연필" />
            <PencilText>{character?.pencils}</PencilText>
            <PencilInfo
              isHovered={isHovered}
              position={getPosition()}
              title=""
              text="<div>하루네컷에서 사용되는 포인트로,</div> 하나의 사진을 만드는데 1연필이 쓰여요 :)"
            />
            <AlertIcon
              src={questionIcon}
              alt="물음표 아이콘"
              ref={questionIconRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </PencilWrap>
          <Box marginTop="10px">
            <PencilButton
              width="230px"
              height="38px"
              marginBottom="35px"
              backgroundColor="#6b6b6b"
              onClick={openModal}
            >
              연필 충전하기
            </PencilButton>
          </Box>
        </PencilInfoBox>
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
            <Box marginTop="20px">
              <Button
                width="230px"
                to="/character/selection?mode=update"
                height="38px"
              >
                캐릭터 변경하기
              </Button>
            </Box>
          </>
        ) : (
          <LoadingSpinnerCharacter src={LoadingImage} alt="로딩중" />
        )}
      </CharacterInfoWrap>
      <Payment
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </MyPageWrap>
  );
}

const MyPageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f5f6;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px 0px;
  margin-top: 10px;
  position: relative;
  font-family: "KotraHope";
  font-size: 24px;
  text-align: center;
`;

const MyPageText = styled.div`
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const NickNameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NickNameText = styled.div`
  font-family: "KotraHope";
  font-size: 24px;
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
  font-size: 15px;
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
  height: 25%;
  padding: 10px 0px;
`;

const ProfileImg = styled.img`
  width: 115px;
  margin-top: 10px;
`;

const CharacterInfoWrap = styled.div`
  display: flex;
  background-color: white;
  border-radius: 30px;
  justify-content: center;
  flex-direction: column;
  filter: drop-shadow(0px 1px 2px rgba(27, 29, 31, 0.1));
  width: 85%;
  height: 80%;
  margin-top: 12px;
  margin-bottom: 20px;
  padding: 20px 0px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.marginTop || "0px"};
`;

const PencilInfoBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CharacterInfoText = styled.div`
  color: #3a3a3a;
  font-size: 16px;
  font-weight: 600;
  margin: 0px 0px 10px 0px;
  padding: 0px 7px 5px 7px;
  border-bottom: 1px solid #5f5f5f;
`;

const PencilWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PencilImage = styled.img`
  width: 50px;
`;
const PencilText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #585858;
`;
const AlertIcon = styled.img`
  width: 24px;
  margin-left: 15px;
  cursor: pointer;
`;
const InfoTextWrap = styled.div`
  color: #3a3a3a;
  font-size: 15px;
  display: flex;
  margin: 8px 0px;
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

const PencilButton = styled.div`
  width: ${(props) => props.width || "290px"};
  height: ${(props) => props.height || "45px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-top: ${(props) => props.marginTop || "0px"};
  background-color: ${(props) => props.backgroundColor || "#5370d4"};
  color: ${(props) => props.textColor || "white"};
  padding: ${(props) => props.padding};
  font-size: 15px;
  font-weight: 500;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  position: relative;
`;

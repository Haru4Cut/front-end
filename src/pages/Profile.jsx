import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingProfile from "../components/character/LoadingProfile";
import Button from "../components/common/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import CompleteProfile from "../components/character/CompleteProfile";
export default function Profile() {
  //test userId
  const userId = 1;
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [imageUrl, setImageUrl] = useState(""); // 프로필 이미지 url 저장 상태
  const [refreshCounter, setRefreshCounter] = useState(0); // 새로고침 counter
  const characterData = useSelector((state) => state.characterData);
  const nickName = useSelector((state) => state.nickName);

  console.log("characterData", characterData);

  // 연동
  useEffect(() => {
    axios
      .post(`/image/${userId}`, characterData, {
        headers: {
          Accept: "*/*",
          "Content-Type": `application/json`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((response) => {
        console.log(response.data);
        setImageUrl(response.data); // 이미지 URL 저장
        setLoading(false); // 로딩 상태 변경
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [characterData, refreshCounter]);

  // 새로고침 버튼 클릭 시
  const handleRefresh = () => {
    setLoading(true);
    setRefreshCounter((prevCounter) => prevCounter + 1); // 새로고침 카운터 증가
  };

  // 캐릭터 완성 버튼 클릭 시
  const handleComplete = () => {
    // characterData에 nickName, imageUrl 추가
    const characterCompleteData = {
      ...characterData,
      nickName: nickName,
      characterImage: imageUrl,
    };
    console.log("characterCompleteData", characterCompleteData);
    // characterData 업데이트 및 새로고침
    axios
      .post(`/character/${userId}`, characterCompleteData, {
        headers: {
          Accept: "*/*",
          "Content-Type": `application/json`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRefreshCounter((prevCounter) => prevCounter + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <CharacterWrap>
      {loading ? (
        <LoadingProfile /> // 로딩 중
      ) : (
        <CompleteProfile
          imageUrl={imageUrl}
          onRefresh={handleRefresh}
          onComplete={handleComplete}
        /> // 프로필 완성 시
      )}
    </CharacterWrap>
  );
}
const CharacterWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #f3f5f6;
  height: 100vh;
`;

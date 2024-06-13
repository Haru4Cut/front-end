import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingProfile from "../components/character/LoadingProfile";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompleteProfile from "../components/character/CompleteProfile";
import axiosInstance from "../api/axiosInstance";

export default function Profile() {
  //const userId = localStorage.getItem("userId");
  const userId = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [imageUrl, setImageUrl] = useState(""); // 프로필 이미지 url 저장 상태
  const [refreshCounter, setRefreshCounter] = useState(0); // 새로고침 counter
  const characterData = useSelector((state) => state.characterData);
  const nickName = useSelector((state) => state.nickName);
  const navigate = useNavigate();
  console.log("characterData", characterData);

  const dispatch = useDispatch();

  // 연동
  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axiosInstance.post(
          `/image/${userId}`,
          characterData
        );
        console.log(response.data);
        setImageUrl(response.data); // 이미지 URL 저장
        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchImageData();
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
    axiosInstance
      .post(`/character/${userId}`, characterCompleteData)
      .then((response) => {
        console.log(response.data);
        setRefreshCounter((prevCounter) => prevCounter + 1);
        localStorage.setItem("characterId", response.data.characterId);
        navigate("/main");
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

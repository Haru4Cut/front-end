import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemoryDiaryImg from "../../assets/images/MemoryDiaryImg.png";
import axios from "axios";
export default function MemoryDiary() {
  const memoryDate = "23.10.12";
  const [nickName, setNickName] = useState();
  const [memoryDiary, setMemoryDiary] = useState();
  // const userId = 1;
  const userId = localStorage.getItem("userId");
  // 닉네임
  useEffect(() => {
    const fetchNickName = async () => {
      try {
        const response = await axios.get(`/character/${userId}`, {});
        setNickName(response.data.nickname);
        console.log(response.data.nickname);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNickName();
  }, []);
  // 추억일기 (좋아요 누른 일기 전체 조회 API)
  useEffect(() => {
    const fetchMemoryDiaries = async () => {
      try {
        const response = await axios.get(`/likes/${userId}`, {});
        setMemoryDiary(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemoryDiaries();
  }, []);

  return (
    <>
      <MemoryDiaryText>
        <NickNameText>{nickName}</NickNameText>님의 추억일기
      </MemoryDiaryText>
      <ContentText>
        그동안의 네컷일기 속에 담긴 {"\n"}
        추억을 감상하세요
      </ContentText>
      <ImgDateWrap>
        <MemoryImg src={MemoryDiaryImg} />
        <Date>{memoryDate}</Date>
      </ImgDateWrap>
    </>
  );
}

const MemoryDiaryText = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: #3a3a3a;
  font-size: 24px;
  margin-top: 10px;
  display: flex;
`;
const ContentText = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  white-space: pre-wrap;
  margin: 5px 0px 14px 0px;
`;
const NickNameText = styled.div`
  font-size: 26px;
  color: #5370d4;
  margin-right: 3px;
`;
const MemoryImg = styled.img`
  width: 165px;
`;
const Date = styled.div`
  align-items: flex-end;
  text-align: right;
  color: #5b8fbe;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
`;

const ImgDateWrap = styled.div``;

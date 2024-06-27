import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import Button from "../components/common/Button";
import HomeIcon from "../assets/images/HomeIcon.svg";
import DownloadIcon from "../assets/images/DownloadIcon.svg";
import CommmentIcon from "../assets/images/commentIcon.svg";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Comment from "../components/common/Comment";
import { v4 as uuidv4 } from "uuid";

export const share = (dataurl, imgName) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], imgName, { type: mime });

  if (navigator.share) {
    navigator.share({
      title: "제목",
      text: "공유 내용",
      files: [file],
    });
  } else {
    alert("공유하기가 지원되지 않는 환경 입니다.");
  }
};

export default function Share() {
  // 모달창 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const { diaryid } = useParams();
  const [diaries, setDiaries] = useState(null); // 일기 데이터 초기 상태를 null로 설정
  const captureRef = useRef(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axiosInstance.get(`/diaries/${diaryid}`);
        console.log(`/diaries/${diaryid}`, response);
        setDiaries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiaries();
  }, [diaryid]);

  const onClickDownloadButton = async () => {
    const target = captureRef.current;
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }
    const canvas = await html2canvas(target, {
      allowTaint: true,
      useCORS: true,
    });
    canvas.toBlob((blob) => {
      if (blob !== null) {
        saveAs(blob, "haru4cut.png");
      }
    });
  };

  if (!diaries) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <MainWrap>
      <DownWrap id="download" ref={captureRef}>
        <LogoWrap>
          <Logo>Haru4cut</Logo>
          <LogoUnderLine />
          <div>내 하루를 네컷으로 기록하세요</div>
        </LogoWrap>
        <TodaysDiaryWrap>
          <Date>{moment(diaries.date).format("YY.MM.DD")}</Date>
          <Todays4CutDiary>오늘의 네컷일기</Todays4CutDiary>
          <ImgWrap>
            {diaries.imgLinks && diaries.imgLinks.length === 1 && (
              <>
                <DiaryImage1
                  src={`${diaries.imgLinks[0]}?timestamp=${uuidv4()}`}
                  alt="하루네컷 이미지"
                  crossOrigin="anonymous"
                />
              </>
            )}
            {diaries.imgLinks && diaries.imgLinks.length === 2 && (
              <>
                {diaries.imgLinks.map((imgUrl, index) => (
                  <React.Fragment key={index}>
                    <DiaryImage2
                      src={`${imgUrl}?timestamp=${uuidv4()}`}
                      alt="하루네컷 이미지"
                      crossOrigin="anonymous"
                    />
                  </React.Fragment>
                ))}
              </>
            )}
            {diaries.imgLinks && diaries.imgLinks.length === 4 && (
              <>
                {diaries.imgLinks.map((imgUrl, index) => (
                  <React.Fragment key={index}>
                    <DiaryImage
                      src={`${imgUrl}?timestamp=${uuidv4()}`}
                      alt="하루네컷 이미지"
                      crossOrigin="anonymous"
                    />
                  </React.Fragment>
                ))}
              </>
            )}
          </ImgWrap>
          <TextWrap>{diaries.text}</TextWrap>
        </TodaysDiaryWrap>
      </DownWrap>
      <div>오늘의 하루네컷을 완성했어요!</div>
      <DownloadButtonWrap>
        <Button width="150px" onClick={openModal}>
          <Icon src={CommmentIcon} alt="코멘트" />
          AI 코멘트
        </Button>
        <Button width="138px" onClick={onClickDownloadButton}>
          <Icon src={DownloadIcon} />
          앨범에 저장
        </Button>
      </DownloadButtonWrap>
      <Button
        backgroundColor="#9D9D9D"
        marginBottom="20px"
        to="/main"
        height="38px"
        padding="5px 0px"
      >
        <Icon src={HomeIcon} marginBottom="3px" />
        홈으로 돌아가기
      </Button>
      <Comment
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        diaryid={diaryid}
      />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  color: #8c8c8c;
  font-size: 14px;
  padding-bottom: 10px;
`;
const DownWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #9cbedd;
  font-size: 20px;
  font-family: "KotraHope";
  margin-bottom: 20px;
`;
const Logo = styled.div`
  font-family: "PoetsenOne";
  color: #9cbedd;
  font-size: 42px;
  z-index: 10;
  position: relative;
  top: 12px;
`;

const LogoUnderLine = styled.div`
  width: 200px;
  height: 10px;
  border-radius: 30px;
  background-color: #daebfa;
  z-index: -1;
  margin-bottom: 7px;
`;
const TodaysDiaryWrap = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 30px;
  width: 85%;
  height: 80%;
  margin-bottom: 20px;
  background-color: #a8c9e7;
`;
const Date = styled.div`
  font-size: 17px;
  color: #e5f0fa;
  font-weight: 600;
`;
const Todays4CutDiary = styled.div`
  align-items: center;
  text-align: center;
  font-family: "KotraHope";
  color: white;
  font-size: 29px;
  margin: 7px 0px 15px 0px;
`;

const ImgWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 280px;
  background-color: #f3f8fc;
  border-radius: 10px;
  padding: 10px 0px;
`;
const TextWrap = styled.div`
  font-family: "KotraHope";
  color: white;
  font-size: 18px;
  width: 250px;
  margin-top: 25px;
  text-decoration: underline;
  text-underline-offset: 6px;
  line-height: 175%;
`;
const DownloadButtonWrap = styled.div`
  display: flex;
  width: 290px;
  justify-content: space-between;
  margin: 16px 0px 6px 0px;
`;
const Icon = styled.img`
  margin-right: 4px;
  margin-bottom: ${(props) => props.marginBottom || "0px"};
`;

// 4컷일 때 다이어리 이미지
const DiaryImage = styled.img`
  width: 120px;
  margin: 12px 0px;
`;
// 1컷일 때 다이어리 이미지
const DiaryImage1 = styled.img`
  width: 200px;
`;
// 2컷일 때 다이어리 이미지
const DiaryImage2 = styled.img`
  width: 250px;
  margin: 5px 0px;
`;

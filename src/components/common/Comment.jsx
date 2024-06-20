import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import CloseIcon from "../../assets/images/closeIcon.svg";
import CommentIcon from "../../assets/images/commentIcon.svg";

const Comment = ({ modalIsOpen, openModal, closeModal }) => {
  // 모달 스타일
  const customModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "70%",
      height: "70%",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "25px",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <CloseButton src={CloseIcon} alt="닫기" onClick={closeModal} />
        <AIcommentWrap>
          <AnimatedIcon src={CommentIcon} alt="AI 코멘트" />
          <AnimatedAICommentText>
            AI 친구의 일기 코멘트가 {"\n"}도착했습니다!
          </AnimatedAICommentText>
        </AIcommentWrap>
      </Modal>
    </div>
  );
};

export default Comment;

const CloseButton = styled.img`
  cursor: pointer;
  width: 27px;
  position: absolute;
  right: 22px;
`;

const growShrink = keyframes`
  0% {
    transform: scale(1.6);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// 애니메이션 적용
const AnimatedIcon = styled.img`
  margin-top: 20px;
  animation: ${growShrink} 2s ease-in-out;
`;

const AIcommentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AnimatedAICommentText = styled.div`
  color: #626793;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  white-space: pre-wrap;
  line-height: 150%;
  margin-top: 10px;
  opacity: 0;
  animation: ${fadeIn} 2s 2s forwards;
`;

const CommentBox = styled.div`
  position: relative;
  width: 435px;
  height: 200px;
  padding: 0px;
  background: #ffffff;
  border-radius: 10px;

  &:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    bottom: -15px;
    left: 77px;
  }
`;

import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import CloseIcon from "../../assets/images/closeIcon.svg";

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

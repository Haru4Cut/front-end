import React, { useState } from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBox } from "../../store";
import CloseIcon from "../../assets/images/closeIcon.svg";
import QuestionIcon from "../../assets/images/QuestionIcon.svg";
import Button from "./Button";

const Payment = ({ modalIsOpen, openModal, closeModal }) => {
  // 선택된 결제 Box
  //const [selectedBox, setSelectedBox] = useState(null);
  const dispatch = useDispatch();
  const selectedBox = useSelector((state) => state.selectedBox);
  // Box 클릭 시
  const handleBoxClick = (boxIndex) => {
    dispatch(setSelectedBox(boxIndex));
  };
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
        <PaymentBox>
          <Text color="#6C6C6C">
            <Text fontWeight="600" fontSize="15px">
              일기를 더 생성하려면 {"\n"}
              <HighlightedText>연필을 구매</HighlightedText>해서 사용해보세요!
            </Text>
          </Text>
          <PencilBox
            isSelected={selectedBox === 1}
            onClick={() => handleBoxClick(1)}
            marginTop="30px"
          >
            30<PencilText>연필</PencilText>
            <CostText>3000원</CostText>
          </PencilBox>
          <PencilBox
            isSelected={selectedBox === 2}
            onClick={() => handleBoxClick(2)}
          >
            50<PencilText>연필</PencilText>
            <CostText>5000원</CostText>
          </PencilBox>
          <PencilBox
            isSelected={selectedBox === 3}
            onClick={() => handleBoxClick(3)}
          >
            100<PencilText>연필</PencilText>
            <CostText>10000원</CostText>
          </PencilBox>
          <IntroductionBox>
            <PencilWrap>
              <StyledQuestionIcon src={QuestionIcon} alt="물음표 아이콘" />
              연필이란?
            </PencilWrap>
            <SubText>
              하루네컷 서비스에서는 1연필 당 한 장의 사진을 만들 수 있어요!
              {"\n"}
              4컷 일기에는 4연필, 2컷 일기에는 2연필이 소모됩니다 :)
            </SubText>
          </IntroductionBox>

          <Button marginTop="30px" width="260px" to="/payment">
            결제하기
          </Button>
        </PaymentBox>
      </Modal>
    </div>
  );
};

export default Payment;

const PaymentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const Text = styled.div`
  color: ${(props) => props.color || "#252525"};
  font-weight: ${(props) => props.fontWeight || "500"};
  font-size: ${(props) => props.fontSize || "14px"};
  text-align: center;
  white-space: pre-wrap;
`;

const HighlightedText = styled.span`
  color: #5370d4;
`;

const CloseButton = styled.img`
  cursor: pointer;
  width: 27px;
  position: absolute;
  right: 22px;
`;

const PencilBox = styled.div`
  width: 70%;
  height: 70px;
  border-radius: 10px;
  border: 1px solid #5370d4;
  border: ${(props) =>
    props.isSelected ? "3px solid #5370d4" : "1px solid #5370d4"};
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  margin-top: ${(props) => props.marginTop || "0px"};
  cursor: pointer;
  &:hover {
    border: 3px solid #5370d4;
  }
`;
const PencilText = styled.div`
  color: #656565;
  font-size: 12px;
  font-weight: 500;
  margin-left: 2px;
`;
const CostText = styled.div`
  color: #5f5f5f;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: auto;
`;

const StyledQuestionIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 2px;
`;
const PencilWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
`;
const IntroductionBox = styled.div`
  margin-top: 10px;
  color: #6c6c6c;
  font-size: 11px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SubText = styled.div`
  white-space: pre-wrap;
  color: #939393;
  font-size: 10px;
  font-weight: 500;
`;

import React from "react";
import styled from "styled-components";
import QuestionIcon from "../../assets/images/Question_fill.svg";

const PencilInfo = ({ isHovered, top, title, text }) => {
  return (
    <StyledAlertBox isHovered={isHovered} top={top}>
      <div dangerouslySetInnerHTML={{ __html: title }} />
      <QuestionBox>
        <Icon src={QuestionIcon} alt="물음표 아이콘" />
        <b>연필이란?</b>
      </QuestionBox>
      <QuestionText dangerouslySetInnerHTML={{ __html: text }} />
    </StyledAlertBox>
  );
};

const StyledAlertBox = styled.div`
  position: absolute;
  top: ${(props) => props.top || "550px"};
  right: 10px;
  z-index: 998;
  border-radius: 5px;
  border: 2px solid #b4b4b4;
  background: #fff;
  color: #000;
  font-size: 14px;
  padding: 9px 16px;
  display: ${(props) => (props.isHovered ? "block" : "none")};
`;

const QuestionBox = styled.div`
  display: flex;
  margin-top: 5px;
  color: #7d7d7d;
  align-items: center;
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const QuestionText = styled.div`
  color: #acacac;
  margin-top: 5px;
`;

export default PencilInfo;

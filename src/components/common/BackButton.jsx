import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import leftIcon from "../../assets/images/leftIcon.svg";

export default function BackButton() {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return <LeftIcon src={leftIcon} onClick={onClickBtn} />;
}

const LeftIcon = styled.img`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

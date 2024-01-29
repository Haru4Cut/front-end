import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OnboardingLogo from "../assets/images/OnboardingLogo.png";

export default function Onboading() {
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);

      // 1초 후에 다른 경로로 이동
      setTimeout(() => {
        navigate("/character");
      }, 500);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <OnboardingWrap showLogo={showLogo}>
      <img src={OnboardingLogo} alt="Onboarding Logo" />
    </OnboardingWrap>
  );
}

const OnboardingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: ${({ showLogo }) => (showLogo ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as KakaoPay } from "../assets/images/kakaopay/03_SVG/combination.svg";
const PaymentPage = () => {
  const selectedPencil = useSelector((state) => state.selectedBox);
  const navigate = useNavigate();
  // Accessing userId from Redux store
  const userId = useSelector((state) => state.userId);
  // 고유한 merchant_uid를 생성하는 함수
  console.log("userid", userId);
  const generateMerchantUid = () => {
    return "HARU4CUT-" + Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    // I'mport 스크립트를 동적으로 로드
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (window.IMP) {
        // I'mport 초기화
        window.IMP.init("imp11122174");
      }
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 결제 버튼 클릭 시 호출되는 함수
  const onclickPay = async (pgValue, payMethod) => {
    const merchantUid = generateMerchantUid(); // 고유한 merchant_uid 생성

    let data;
    // 선택된 연필 수에 따라 결제 데이터 설정
    if (selectedPencil === 1) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: merchantUid,
        name: "30연필(HARU4CUT)",
        amount: 3000,
        m_redirect_url: "/s",
      };
    } else if (selectedPencil === 2) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: merchantUid,
        name: "50연필(HARU4CUT)",
        amount: 4500,
        m_redirect_url: "/s",
      };
    } else if (selectedPencil === 3) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: merchantUid,
        name: "100연필(HARU4CUT)",
        amount: 8500,
        m_redirect_url: "/s",
      };
    }

    try {
      // 결제 요청 함수 호출
      const rsp = await requestPayment(data);

      if (rsp.success) {
        console.log("결제 요청 성공");
        // 결제 성공 시 검증 함수 호출
        console.log("rsp", rsp);
        const success_msg = await verifyPayment(selectedPencil, rsp.imp_uid);
        console.log("rsp.imp_uid", rsp.imp_uid);
        if (success_msg) {
          alert(success_msg);
          console.log("결제 성공");
          //경로이동
          navigate(`/main`);
        } else {
          console.log("결제 검증 실패");
          alert("결제 검증에 실패했습니다. 다시 시도해주세요.");
          return;
        }
      } else {
        console.log("결제 요청 실패");
      }
    } catch (error) {
      console.error("결제 요청 에러:", error);
      // 에러 처리 필요
    }
  };

  // 결제 요청을 보내는 함수
  const requestPayment = async (data) => {
    try {
      const rsp = await new Promise((resolve, reject) => {
        window.IMP.request_pay(data, (rsp) => {
          resolve(rsp);
        });
      });
      return rsp;
    } catch (error) {
      console.error("결제 요청 에러:", error);
      throw error;
    }
  };

  // 결제 검증을 수행하는 함수
  const verifyPayment = async (selectedPencil, impUid) => {
    try {
      const response = await axiosInstance.post(
        `/verify/${selectedPencil}/${userId}/${impUid}`
      );
      console.log("결제 검증 성공");
      console.log("response.data", response.data);
      return response.data.message;
    } catch (error) {
      console.error("결제 검증 요청 에러:", error);
      return false;
    }
  };

  return (
    <>
      <MainWrap>
        {/* 카카오페이 버튼을 클릭하면 onclickPay 함수 호출 */}
        <KakaoPayWrap>
          <KakaoPay style={{ width: "130px" }} />
          <PayButton
            onClick={() => onclickPay("kakaopay.TC0ONETIME", "kakaopay")}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                paddingRight: "3px",
              }}
            >
              카카오페이{" "}
            </span>
            에서 간편하고 안전하게 결제!
          </PayButton>
        </KakaoPayWrap>
      </MainWrap>
    </>
  );
};

export default PaymentPage;
const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const PayButton = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
  width: 200px;
  height: 40px;
  font-family: Pretendard;
  background-color: #ffeb00;
  border-radius: 50px;
  font-size: 10px;
  margin-top: 90px;
  cursor: pointer;
`;
const KakaoPayWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 500px;
  margin-bottom: 100px;
`;
// const Footer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: grey;
//   width: 100vw;
//   height: 10vh;
//   position: fixed;
//   bottom: 0;
//   background-color: #e8e8e8;
// `;

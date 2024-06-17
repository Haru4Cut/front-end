import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";

const PaymentPage = () => {
  const selectedPencil = useSelector((state) => state.selectedBox);
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
      {/* 카카오페이 버튼을 클릭하면 onclickPay 함수 호출 */}
      <button onClick={() => onclickPay("kakaopay.TC0ONETIME", "kakaopay")}>
        카카오페이
      </button>
    </>
  );
};

export default PaymentPage;

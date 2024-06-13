import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PaymentPage = () => {
  const userId = useSelector((state) => state.userId);
  const selectedPencil = useSelector((state) => state.selectedBox);

  const generateMerchantUid = () => {
    return "HARU4CUT-" + Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    // 포트원 라이브러리 추가
    let script = document.querySelector(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      // 스크립트 요소가 존재하는지 확인 후 제거
      if (script && script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const onclickPay = (pgValue, payMethod) => {
    window.IMP.init("imp11122174");
    const impUid = "imp11122174";

    let data;
    if (selectedPencil === 1) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: generateMerchantUid(),
        name: "20연필(HARU4CUT)",
        amount: 3000,
        m_redirect_url: "",
      };
    } else if (selectedPencil === 2) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: generateMerchantUid(),
        name: "50연필(HARU4CUT)",
        amount: 5000,
        m_redirect_url: "",
      };
    } else if (selectedPencil === 3) {
      data = {
        pg: pgValue,
        pay_method: payMethod,
        merchant_uid: generateMerchantUid(),
        name: "100연필(HARU4CUT)",
        amount: 10000,
        m_redirect_url: "",
      };
    }

    console.log("data:", data);

    window.IMP.request_pay(data, async (rsp) => {
      if (rsp.success) {
        const success = await verifyPayment(data.merchant_uid, impUid);
        if (success) {
          console.log("결제 성공");
        } else {
          console.log("결제 검증 실패");
        }
      } else {
        console.log("결제 실패");
      }
    });
  };

  const verifyPayment = async (merchantUid, impUid) => {
    try {
      const response = await axios.post(
        `/verify/${merchantUid}/${userId}/${impUid}`
      );
      return response.data.success;
    } catch (error) {
      console.error("결제 검증 요청 에러:", error);
      return false;
    }
  };

  return (
    <>
      <button onClick={() => onclickPay("kakaopay.TC0ONETIME", "kakaopay")}>
        카카오페이
      </button>
    </>
  );
};

export default PaymentPage;

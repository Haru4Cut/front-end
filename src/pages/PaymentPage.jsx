import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PaymentPage = () => {
  const userId = useSelector((state) => state.userId);
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
    const productId = 1;

    const data = {
      pg: pgValue, //"PG사구분코드.{사이트코드}"
      pay_method: payMethod, // card
      merchant_uid: "HARU4CUT-123456",
      name: "하루네컷-연필 30개",
      amount: 3000,
      m_redirect_url: "",
    };
    window.IMP.request_pay(data, async (rsp) => {
      // callback
      if (rsp) {
        // 결제 성공 시에는 결제 데이터를 백엔드로 전송하여 검증을 요청
        console.log("d", data);

        const success = await verifyPayment(productId, impUid); // 비동기 함수 호출
        if (success) {
          console.log("결제 성공 했다");
          // 추가적인 프론트엔드 처리
        } else {
          console.log("결제 검증 실패");
          // 추가적인 프론트엔드 처리
        }
      } else {
        console.log("결제 실패 했다");
      }
    });
  };
  const verifyPayment = async (merchantUid, impUid) => {
    try {
      const response = await axios.post(
        `/verify/${merchantUid}/${userId}/${impUid}`
      );
      return response.data.success; // 성공 여부를 반환
    } catch (error) {
      console.error("결제 검증 요청 에러:", error);
      return false; // 실패 시 false 반환
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

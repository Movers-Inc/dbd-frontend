"use client";

import { ApplyContent } from "@/components/molecules";
import React, { useEffect, useState } from "react";

interface ApplyPageProps {
  // 추후 필요한 props 추가 가능
}

const ApplyPage: React.FC<ApplyPageProps> = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [showApplyContent, setShowApplyContent] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 텍스트 애니메이션 시작
    const textTimer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);

    // 텍스트 애니메이션 완료 후 로고/텍스트 이동 애니메이션 시작
    const transitionTimer = setTimeout(() => {
      setStartTransition(true);
      // 로고 이동과 동시에 ApplyContent 표시 시작
      setShowApplyContent(true);
    }, 3000); // 텍스트 애니메이션 시간 + 잠시 대기

    // 로고 애니메이션 완료 후 상태 변경
    const logoCompleteTimer = setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 3700); // 이동 애니메이션 완료 시점

    return () => {
      clearTimeout(textTimer);
      clearTimeout(transitionTimer);
      clearTimeout(logoCompleteTimer);
    };
  }, []);

  const createTextSpan = (text: string, startDelay: number = 0) => {
    return (
      <span
        className={`letter ${showAnimation ? "" : "opacity-0"}`}
        style={{
          animationDelay: `${startDelay}s`
        }}
      >
        {text}
      </span>
    );
  };
  return (
    <>
      <div className="h-screen w-full bg-white flex flex-col relative overflow-hidden">
        {/* 애니메이션 중인 로고 */}
        {!logoAnimationComplete && (
          <div
            className="absolute transition-all duration-700 ease-in-out"
            style={{
              zIndex: 50,
              top: startTransition ? "16px" : "20%",
              left: "50%",
              transform: startTransition
                ? "translateX(calc(50vw - 170px))"
                : "translateX(-50%)",
              width: startTransition ? "170px" : "500px",
              height: "auto"
            }}
          >
            <img
              src="/logo.svg"
              alt="logo"
              className="w-full h-auto transition-all duration-700 ease-in-out"
              style={{
                opacity: startTransition ? 0.3 : 1
              }}
            />
          </div>
        )}

        {/* 메인 텍스트 영역 */}
        <div
          className={`absolute bottom-[20%] left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out ${
            startTransition ? "opacity-0 translate-y-4" : "opacity-100"
          }`}
          style={{
            zIndex: 60,
            pointerEvents: "none"
          }}
        >
          <div className="text-center content">
            <p
              className="text-[24px] text-black whitespace-nowrap overflow-hidden"
              style={{ fontFamily: "S-CoreDream-5Medium" }}
            >
              {createTextSpan("다이어트 기록이 힘들 땐?")}
            </p>

            <p
              className="text-[24px] text-black mt-2 whitespace-nowrap overflow-hidden"
              style={{ fontFamily: "S-CoreDream-5Medium", marginLeft: "80px" }}
            >
              {createTextSpan("데이바이데이 코치와 함께!")}
            </p>
          </div>
        </div>

        {/* ApplyContent */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            showApplyContent
              ? "opacity-100 scale-y-100 scale-x-100"
              : "opacity-0 scale-y-50 scale-x-100"
          }`}
          style={{
            zIndex: 50,
            transformOrigin: "center center"
          }}
        >
          {showApplyContent && (
            <ApplyContent logoAnimationComplete={logoAnimationComplete} />
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyPage;

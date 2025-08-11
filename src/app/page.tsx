"use client";

import React, { useState } from "react";
import { NextPage } from "next";

// Components
import { IntroPage, ApplyPage } from "@/components/organisms";

const HomePage: NextPage = () => {
  const [isCovering, setIsCovering] = useState(false); // 덮는 애니메이션
  const [isUncovering, setIsUncovering] = useState(false); // 사라지는 애니메이션
  const [showApply, setShowApply] = useState(false);
  // 12312
  const handleIntroComplete = () => {
    // 1단계: 파란색 배경이 오른쪽에서 화면을 덮음
    setIsCovering(true);

    setTimeout(() => {
      // 2단계: 화면이 완전히 덮인 후 페이지 전환
      setShowApply(true);
      // 덮는 애니메이션을 멈추지 않고 바로 사라지는 애니메이션으로 연결
      setIsCovering(false);
      setIsUncovering(true);
    }, 800); // 원래 속도로 복원, 중간 멈춤만 제거
  };

  return (
    <div className="relative">
      {/* 페이지 전환 애니메이션 */}
      <div
        className="fixed inset-0 bg-[#1976D2] z-50 transition-transform duration-800 ease-in-out"
        style={{
          transform: isCovering
            ? "translateX(0%)" // 덮는 중: 오른쪽에서 중앙으로
            : isUncovering
            ? "translateX(-100%)" // 사라지는 중: 중앙에서 왼쪽으로
            : "translateX(100%)" // 기본: 오른쪽 화면 밖
        }}
      />

      {/* 인트로 페이지 */}
      {!showApply && <IntroPage onComplete={handleIntroComplete} />}

      {/* Apply 페이지 */}
      {showApply && <ApplyPage />}
    </div>
  );
};

export default HomePage;

import React, { FC } from "react";
import Lottie from "lottie-react";

// Lottie JSON 파일들 import
import CryAnimation from "./Cry.json";
import ExclamationAnimation from "./Exclamation.json";
import SmileAnimation from "./smile.json";

// 애니메이션 타입 정의
export type LottieAnimationType = "cry" | "exclamation" | "smile";

// Props 인터페이스
interface LottieAnimationProps {
  type: LottieAnimationType;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

// 애니메이션 매핑 객체
const animationMap = {
  cry: CryAnimation,
  exclamation: ExclamationAnimation,
  smile: SmileAnimation
};

const LottieAnimation: FC<LottieAnimationProps> = ({
  type,
  width = 100,
  height = 100,
  loop = true,
  autoplay = true,
  className = ""
}) => {
  const animationData = animationMap[type];

  if (!animationData) {
    console.warn(`Lottie animation type "${type}" not found`);
    return null;
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieAnimation;

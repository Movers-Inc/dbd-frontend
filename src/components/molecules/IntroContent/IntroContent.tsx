import React, { FC, useState, useEffect } from "react";
import Image from "next/image";

interface IntroContentProps {
  page: number;
  isActive?: boolean;
}

const IntroContent: FC<IntroContentProps> = ({ page, isActive = false }) => {
  const [count1, setCount1] = useState("0.0");
  const [count2, setCount2] = useState("0.0");

  useEffect(() => {
    if (isActive && page === 3) {
      // 부드러운 곡선 이징 함수 (처음 빠르게, 점점 느려지게)
      const customEasing = (t: number) => {
        // cubic-bezier 느낌의 부드러운 곡선
        return 1 - Math.pow(1 - t, 2.5);
      };

      const duration = 2000; // 2초 (CSS와 동일)
      const target1 = 1.1;
      const target2 = 4.5;
      const startTime = Date.now();

      let lastUpdate1 = -1;
      let lastUpdate2 = -1;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = customEasing(progress);

        const current1 = target1 * easedProgress;
        const current2 = target2 * easedProgress;

        // 0.1 단위로만 업데이트 (더 부드럽게)
        const display1 = Math.floor(current1 * 10) / 10;
        const display2 = Math.floor(current2 * 10) / 10;

        // 값이 실제로 바뀔 때만 업데이트 (소수점 한 자리 표시)
        if (display1 !== lastUpdate1) {
          setCount1(display1.toFixed(1));
          lastUpdate1 = display1;
        }

        if (display2 !== lastUpdate2) {
          setCount2(display2.toFixed(1));
          lastUpdate2 = display2;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      // 비활성화되면 숫자 리셋
      setCount1("0.0");
      setCount2("0.0");
    }
  }, [isActive, page]);

  const renderContent = () => {
    switch (page) {
      case 1:
        return (
          <div className="mt-4 flex flex-col items-start justify-start px-5">
            <video
              src="/intro/1/page1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
              style={{
                backgroundColor: "transparent",
                height: "400px",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
          </div>
        );

      case 2:
        return (
          <div className="mt-4 flex flex-col items-center justify-start px-5">
            <video
              src="/intro/2/page2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
              style={{
                backgroundColor: "transparent",
                height: "285px",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
            <img src="/intro/2/content.svg" alt="page2-1" />
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col items-center w-full mt-[56px]">
            <p className="text-[24px] text-black font-freesentation font-medium mb-4">
              [1개월 감량 체중 비교]
            </p>
            <div className="h-[300px] w-full border-b border-black mb-6 flex items-end justify-center gap-[22.5px]">
              <div className="flex flex-col items-center relative">
                <div
                  className={`bg-gray-300 flex justify-center text-white font-bold pt-3 ${
                    isActive ? "animate-grow-up" : ""
                  }`}
                  style={
                    {
                      width: "136px",
                      fontSize: "32.5px",
                      "--target-height": `${(1.1 / 4.5) * 300}px`,
                      height: isActive
                        ? "var(--target-height)"
                        : `${(1.1 / 4.5) * 300}px`
                    } as React.CSSProperties
                  }
                >
                  {count1}kg
                </div>
                <div
                  className={`absolute top-0 right-[60px] translate-x-full rotate-6 ${
                    isActive ? "animate-scale-up" : ""
                  }`}
                  style={{
                    transform: "translateY(calc(-100% + 20px)) rotate(0deg)",
                    width: isActive ? "140px" : "0px",
                    height: isActive ? "140px" : "0px"
                  }}
                >
                  <Image
                    src="/intro/3/arrow.svg"
                    alt="arrow"
                    width={140}
                    height={140}
                    className="w-full h-full"
                  />
                  <span
                    className={`absolute text-black font-bold text-lg ${
                      isActive ? "animate-text-scale" : ""
                    }`}
                    style={{
                      bottom: "-24px",
                      left: "59%",
                      transform: "translate(-50%, 0%) rotate(-50deg)",
                      fontSize: isActive ? "18px" : "0px"
                    }}
                  >
                    400%
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`bg-[#1976D2] flex justify-center text-white font-bold pt-3 ${
                    isActive ? "animate-grow-up" : ""
                  }`}
                  style={
                    {
                      width: "136px",
                      fontSize: "32.5px",
                      "--target-height": "300px",
                      height: isActive ? "var(--target-height)" : "300px"
                    } as React.CSSProperties
                  }
                >
                  {count2}kg
                </div>
              </div>
            </div>
            <p className="text-[12px] text-black font-freesentation font-light mb-4">
              출처 : Hollis et al., AJPM(2008)
            </p>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col items-start justify-start pt-16 overflow-hidden relative">
            <video
              src="/intro/4/page4.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
              style={{
                backgroundColor: "transparent",
                height: "415px",
                objectFit: "cover",
                objectPosition: "center",
                marginLeft: "13%"
              }}
            />
            <div className="absolute top-1/2 left-1/4 bg-white rounded-lg p-3 shadow-lg border-2 border-gray-200">
              <div className="text-sm font-medium text-black">
                식단을 기록하세요!
              </div>
              <div className="absolute bottom-[-8px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              하지만 현실은 쉽지 않습니다.
            </p>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-red-600">93%</span>
                <span className="text-red-800">가 한 달 내 포기</span>
              </div>
            </div>
            <p className="text-gray-600">
              의지만으로는 지속하기 어려운 것이 현실입니다.
            </p>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              그래서 AI 코치가 필요합니다.
            </p>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">📞 기록 리마인더 전화</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">💪 동기부여 메시지</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800">📊 진행상황 피드백</p>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              AI는 절대 포기하지 않습니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">24시간 언제든 지원</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">개인 맞춤 코칭</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                <span className="text-gray-700">감정적 판단 없음</span>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">
              끈질기게, 꾸준히, 성공할 때까지
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">
                "매일 귀찮게 해드리는 것이 저희의 임무입니다"
              </p>
              <p className="text-blue-600 text-sm mt-2">- AI 다이어트 코치</p>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg text-gray-600 mb-4">지금 바로 시작하세요!</p>
            <div className="bg-blue-600 text-white p-4 rounded-lg w-full text-center">
              <p className="text-xl font-semibold mb-2">360명과 함께</p>
              <p className="text-blue-100">검증된 다이어트 여정을 시작하세요</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-start justify-start">
            <p className="text-gray-500">콘텐츠를 불러올 수 없습니다.</p>
          </div>
        );
    }
  };

  return <div className="w-full">{renderContent()}</div>;
};

export default IntroContent;

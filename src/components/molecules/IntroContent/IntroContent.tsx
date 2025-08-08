import React, { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LottieAnimation } from "@/components/atoms";

interface IntroContentProps {
  page: number;
  isActive?: boolean;
}

const IntroContent: FC<IntroContentProps> = ({ page, isActive = false }) => {
  const [count1, setCount1] = useState("0.0");
  const [count2, setCount2] = useState("0.0");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let startX = 0;
    let startY = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      isScrolling = false;

      // 터치 시작시 무조건 상위 이벤트 차단
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      // 가로 이동이 세로 이동보다 크면 가로 스크롤로 판단
      if (deltaX > deltaY && deltaX > 10) {
        isScrolling = true;
      }

      // 가로 스크롤 중이거나 스크롤 가능한 영역이면 상위 이벤트 완전 차단
      const element = e.currentTarget as HTMLElement;
      if (isScrolling || element.scrollWidth > element.clientWidth) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // 터치 종료시도 상위 이벤트 차단
      e.stopImmediatePropagation();
      e.stopPropagation();
      isScrolling = false;
    };

    // capture: true로 설정해서 더 일찍 이벤트를 잡음
    scrollElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: true
    });
    scrollElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true
    });
    scrollElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
      capture: true
    });

    // 마우스 이벤트도 추가로 차단
    const handleMouseDown = (e: MouseEvent) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    };

    scrollElement.addEventListener("mousedown", handleMouseDown, {
      capture: true
    });

    return () => {
      scrollElement.removeEventListener("touchstart", handleTouchStart, true);
      scrollElement.removeEventListener("touchmove", handleTouchMove, true);
      scrollElement.removeEventListener("touchend", handleTouchEnd, true);
      scrollElement.removeEventListener("mousedown", handleMouseDown, true);
    };
  }, []);

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
                height: "300px",
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
            {isActive && (
              <>
                <div className="absolute top-2/20 left-1/10 bg-[#EBEBEB] rounded-lg px-3 py-2 speech-bubble-1">
                  <div className="text-[20px] font-freesentation-semibold font-medium text-[#444444]">
                    맞다, <br /> 기록해야 하는데...
                  </div>
                  <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#EBEBEB]"></div>
                </div>

                <div className="absolute top-6/20 left-2/10 bg-[#EBEBEB] rounded-lg px-3 py-2 speech-bubble-2">
                  <div className="text-[20px] font-freesentation-semibold font-medium text-[#444444]">
                    먹고 싶은 게, <br /> 정말 맞을까?
                  </div>
                  <div className="absolute bottom-[-8px] right-9 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#EBEBEB]"></div>
                </div>

                <div className="absolute top-10/20 left-1/10 bg-[#EBEBEB] rounded-lg px-3 py-2 speech-bubble-3">
                  <div className="text-[20px] font-freesentation-semibold font-medium text-[#444444]">
                    조금만 참아보자...
                  </div>
                  <div className="absolute bottom-[-8px] right-8 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#EBEBEB]"></div>
                </div>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col items-start justify-start px-5">
            <div className="grid grid-cols-5 gap-4 w-full mt-[88px] relative">
              {/* 첫 번째 행: Crying 5개 */}
              <LottieAnimation type="cry" width={70} height={70} />
              <div className="relative">
                <LottieAnimation type="cry" width={70} height={70} />
                {/* 기록 실패! 말풍선 */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#EBEBEB] px-3 py-2 rounded-lg text-[#444444] font-freesentation-semibold font-medium text-[16px] whitespace-nowrap animate-floating">
                  기록 실패!
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#EBEBEB]"></div>
                </div>
              </div>
              <LottieAnimation type="cry" width={70} height={70} />
              <LottieAnimation type="cry" width={70} height={70} />
              <LottieAnimation type="cry" width={70} height={70} />

              {/* 두 번째 행: Crying 4개, Smile 1개 */}
              <LottieAnimation type="cry" width={70} height={70} />
              <LottieAnimation type="cry" width={70} height={70} />
              <LottieAnimation type="cry" width={70} height={70} />
              <LottieAnimation type="cry" width={70} height={70} />
              <div className="relative">
                <LottieAnimation type="smile" width={70} height={70} />
                {/* 기록 성공! 말풍선 */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#FFF4D4] px-3 py-2 rounded-lg text-[#444444] font-freesentation-semibold font-medium text-[16px] whitespace-nowrap animate-floating-delayed">
                  기록 성공!
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#FFF4D4]"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col items-start justify-start mt-10 relative">
            <img src="/intro/6/page6.png" alt="content" className="w-full" />
            <div className="absolute bottom-4 left-1/2 transform translate-x-[10px] rotate-[40deg]">
              <LottieAnimation type="exclamation" width={80} height={80} />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="flex flex-col items-center justify-start mt-9">
            <img src="/intro/7/page7.png" alt="content" className="w-[60%]" />
          </div>
        );

      case 8:
        return (
          <div className="flex flex-col items-center justify-start mt-9">
            <video
              src="/intro/8/page8.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
              style={{
                backgroundColor: "transparent",
                height: "330px",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
          </div>
        );

      case 9:
        return (
          <div
            className="flex items-center justify-start gap-2 mt-5 flex-col"
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
            style={{
              touchAction: "none"
            }}
          >
            <div className="flex items-center justify-start px-5 gap-2 mb-3 w-full">
              <img src="/intro/9/left.svg" alt="content" className="flex-1" />
              <img src="/intro/9/right.svg" alt="content" className="flex-1" />
            </div>
            <div
              ref={scrollRef}
              className="flex items-start justify-start gap-4 w-full overflow-x-scroll overflow-y-hidden"
              style={{
                touchAction: "pan-x",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                pointerEvents: "auto",
                isolation: "isolate"
              }}
              onTouchStart={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
                // 터치 시작 좌표 저장
                const touch = e.touches[0];
                (e.currentTarget as any).startX = touch.clientX;
                (e.currentTarget as any).startY = touch.clientY;
                // 부모의 터치 이벤트 완전히 차단
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.style.touchAction = "none";
                }
              }}
              onTouchMove={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
                // 수평 스크롤만 허용, 수직 스크롤 차단
                const touch = e.touches[0];
                const deltaX = Math.abs(
                  touch.clientX - (e.currentTarget as any).startX || 0
                );
                const deltaY = Math.abs(
                  touch.clientY - (e.currentTarget as any).startY || 0
                );

                if (deltaX > deltaY) {
                  // 수평 드래그가 더 크면 스와이퍼 이벤트 차단
                  e.preventDefault();
                }
              }}
              onTouchEnd={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
                // 부모의 터치 액션 복원
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.style.touchAction = "auto";
                }
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                // 마우스 드래그도 부모로 전파되지 않도록
                e.preventDefault();
              }}
              onWheel={(e) => {
                // 휠 이벤트도 차단하여 스와이퍼로 전파되지 않도록
                e.stopPropagation();
              }}
            >
              <div className="flex flex-col items-center justify-start flex-shrink-0 ml-5">
                <img
                  src="/intro/9/slide1.png"
                  alt="slide1"
                  className="h-[140px] w-auto mb-2"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
                <span className="text-[14px] font-freesentation-regular text-center text-[#444444] whitespace-nowrap">
                  # 82일 연속 기록 # 13kg 감량
                </span>
              </div>
              <div className="flex flex-col items-center justify-start flex-shrink-0">
                <img
                  src="/intro/9/slide2.png"
                  alt="slide2"
                  className="h-[140px] w-auto mb-2"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
                <span className="text-[14px] font-freesentation-regular text-center text-[#444444] whitespace-nowrap">
                  # 122일 연속 기록 # 15kg 감량
                </span>
              </div>
              <div className="flex flex-col items-center justify-start flex-shrink-0">
                <img
                  src="/intro/9/slide3.png"
                  alt="slide3"
                  className="h-[140px] w-auto mb-2"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
                <span className="text-[14px] font-freesentation-regular text-center text-[#444444] whitespace-nowrap">
                  # 95일 연속 기록 # 11kg 감량
                </span>
              </div>
              <div className="flex flex-col items-center justify-start flex-shrink-0">
                <img
                  src="/intro/9/slide4.png"
                  alt="slide4"
                  className="h-[140px] w-auto mb-2"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
                <span className="text-[14px] font-freesentation-regular text-center text-[#444444] whitespace-nowrap">
                  # 55일 연속 기록 # 7kg 감량
                </span>
              </div>
              <div className="flex flex-col items-center justify-start flex-shrink-0 mr-5">
                <img
                  src="/intro/9/slide5.png"
                  alt="slide5"
                  className="h-[140px] w-auto mb-2"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                />
                <span className="text-[14px] font-freesentation-regular text-center text-[#444444] whitespace-nowrap">
                  # 158일 연속 기록 # 16kg 감량
                </span>
              </div>
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

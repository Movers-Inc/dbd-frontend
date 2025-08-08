"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import classNames from "classnames";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Data
import introTitles from "@/data/introTitles.json";

// Components
import { IntroContent } from "@/components/molecules";

// Types
interface TitleSegment {
  text: string;
  color: string;
  lineBreak?: boolean;
  space?: boolean;
}

interface IntroTitle {
  id: number;
  title: TitleSegment[];
}

interface IntroPageProps {
  onComplete?: () => void; // apply 완료 콜백
}

const IntroPage: React.FC<IntroPageProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 9;
  const swiperRef = useRef<SwiperType | null>(null);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      swiperRef.current?.slideNext();
    } else {
      // 마지막 페이지에서는 onComplete 콜백 실행
      onComplete?.();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      swiperRef.current?.slidePrev();
    }
  };

  const goToPage = (pageIndex: number) => {
    swiperRef.current?.slideTo(pageIndex);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentPage(swiper.activeIndex);
  };

  const renderContent = (pageNumber: number) => {
    const titleData = introTitles.find(
      (item) => item.id === pageNumber
    ) as IntroTitle;

    if (!titleData) {
      return <div>인트로 페이지 {pageNumber}</div>;
    }

    const isCurrentPage = pageNumber === currentPage + 1;

    return (
      <div className="flex flex-col items-start justify-start text-left w-full">
        <h1
          className={`text-[28px] font-freesentation-semibold font-semibold mb-4 leading-tight rounded px-5 ${
            isCurrentPage ? "animate-fade-in-up" : ""
          }`}
          style={{
            animation: isCurrentPage
              ? "fadeInUp 0.5s ease-out forwards"
              : "none"
          }}
        >
          {titleData.title.map((segment, index) => (
            <React.Fragment key={index}>
              <span style={{ color: segment.color }}>{segment.text}</span>
              {segment.lineBreak ? <br /> : segment.space ? " " : ""}
            </React.Fragment>
          ))}
        </h1>

        <IntroContent page={pageNumber} isActive={isCurrentPage} />
      </div>
    );
  };

  return (
    <div className="pt-[8vh] text-black h-screen flex flex-col">
      {/* Swiper 콘텐츠 영역 */}
      <div className="flex-1 overflow-hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="h-full w-full"
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <SwiperSlide key={index} className="flex items-start justify-start">
              <div className="w-full h-full flex items-start justify-start overflow-y-hidden">
                {renderContent(index + 1)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 페이지 인디케이터 */}
      <div className="flex justify-center space-x-2 mb-[4vh] px-5">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={classNames(
              "h-2 transition-all duration-300",
              currentPage === index
                ? "w-3 bg-[#1976D2] rounded-[4px]"
                : "w-2 bg-[#EBEBEB] rounded-full"
            )}
          />
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex gap-4 mb-[5vh] px-5">
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <button
            onClick={prevPage}
            className="px-4 py-[18px] rounded-[12px] text-[20px] font-freesentation-medium bg-[#F5F5F5] text-[#666666] flex-1"
          >
            이전
          </button>
        )}
        <button
          onClick={nextPage}
          className={classNames(
            "px-4 py-[18px] rounded-[12px] text-[20px] font-freesentation-medium bg-[#1976D2] text-white",
            currentPage === 0 || currentPage === totalPages - 1
              ? "w-full"
              : "flex-1"
          )}
        >
          {currentPage === totalPages - 1 ? "AI 코치 무료 체험하기" : "다음"}
        </button>
      </div>
    </div>
  );
};

export default IntroPage;

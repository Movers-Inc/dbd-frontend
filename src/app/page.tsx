"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { NextPage } from "next";
import classNames from "classnames";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HomePage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 9;
  const swiperRef = useRef<SwiperType | null>(null);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      swiperRef.current?.slideNext();
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

  const renderPageContent = (pageNumber: number) => {
    return <div>인트로 페이지 {pageNumber}</div>;
  };

  return (
    <div className="pt-[88px] text-black h-screen flex flex-col">
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
            <SwiperSlide
              key={index}
              className="flex items-center justify-center px-5"
            >
              <div className="w-full h-full border border-gray-300 rounded-lg flex items-center justify-center">
                {renderPageContent(index + 1)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 페이지 인디케이터 */}
      <div className="flex justify-center space-x-2 mb-20 px-5">
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
      <div className="flex gap-4 mb-10 px-5">
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <button
            onClick={prevPage}
            className="flex-1 px-4 py-[18px] rounded-[12px] bg-[#EBEBEB] text-gray-700 text-[20px] font-medium font-freesentation"
          >
            이전
          </button>
        )}

        <button
          onClick={nextPage}
          className={classNames(
            "px-4 py-[18px] rounded-[12px] text-[20px] font-medium font-freesentation bg-[#1976D2] text-white",
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

export default HomePage;

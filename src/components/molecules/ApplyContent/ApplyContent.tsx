import React, { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { BankCard, PhoneNumberPopup, AlertPopup } from "../../atoms";
import {
  submitToGoogleSheets,
  FormSubmissionData
} from "../../../utils/googleSheets";

interface FormData {
  plan: "1개월" | "3개월" | "12개월";
  bankName: string;
  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  cardNumber4: string;
  cvc: string;
  expiryDate: string;
  cardPassword: string;
  phone: string;
}

interface ApplyContentProps {
  logoAnimationComplete?: boolean;
}

const ApplyContent: FC<ApplyContentProps> = ({ logoAnimationComplete }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      plan: "12개월",
      bankName: "",
      cardNumber1: "",
      cardNumber2: "",
      cardNumber3: "",
      cardNumber4: "",
      cvc: "",
      expiryDate: "",
      cardPassword: "",
      phone: ""
    }
  });

  const watchedPlan = watch("plan");
  const watchedBankName = watch("bankName");
  const watchedCardNumber1 = watch("cardNumber1");
  const watchedCardNumber2 = watch("cardNumber2");
  const watchedCardNumber3 = watch("cardNumber3");
  const watchedCardNumber4 = watch("cardNumber4");
  const watchedCvc = watch("cvc");
  const watchedExpiryDate = watch("expiryDate");
  const watchedCardPassword = watch("cardPassword");

  // 팝업 상태 관리
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    confirmText: "확인",
    showCancel: false
  });

  const onSubmit = (data: FormData) => {
    // 하단 버튼 클릭 시 바로 휴대폰 번호 입력 팝업 표시
    setShowPhonePopup(true);
  };

  const handlePhoneConfirm = async (phoneNumber: string) => {
    // 휴대폰 번호를 form에 저장
    setValue("phone", phoneNumber);

    // PhoneNumberPopup 먼저 닫기
    setShowPhonePopup(false);

    // AlertPopup 설정 및 표시
    setAlertConfig({
      title: "알림 신청이 완료됐어요",
      message: "AI 코칭이 가능해질 때 입력하신 번호로 바로 연락드릴게요.",
      confirmText: "확인",
      showCancel: false
    });
    setShowAlertPopup(true);
    // 팝업이 닫힌 후 데이터 제출 및 AlertPopup 표시
    setTimeout(async () => {
      await submitDataToSheets(phoneNumber);
    }, 300); // 팝업 애니메이션 시간 고려
  };

  const handlePhoneClose = async () => {
    // PhoneNumberPopup 먼저 닫기
    setShowPhonePopup(false);

    // 팝업이 닫힌 후 데이터 제출
    setTimeout(async () => {
      await submitDataToSheets(); // 휴대폰 번호 없이 제출
    }, 300); // 팝업 애니메이션 시간 고려
  };

  const submitDataToSheets = async (phone?: string) => {
    const formData = watch();

    const submissionData: FormSubmissionData = {
      plan: formData.plan,
      bankName: formData.bankName,
      cardNumber1: formData.cardNumber1,
      phone: phone
    };

    try {
      await submitToGoogleSheets(submissionData);
    } catch (error) {
      // 에러 발생 시 조용히 처리
    }
  };

  const handlePlanSelect = (plan: "1개월" | "3개월" | "12개월") => {
    setValue("plan", plan);
  };

  const handleBankSelect = (bankName: string) => {
    setValue("bankName", bankName);
  };

  const getButtonText = () => {
    switch (watchedPlan) {
      case "1개월":
        return "3일 무료체험 후 월 17,900원 결제하기";
      case "3개월":
        return "3일 무료체험 후 3개월 29,700원 결제하기";
      case "12개월":
        return "3일 무료체험 후 연 94,800원 결제하기";
      default:
        return "3일 무료체험 후 연 94,800원 결제하기";
    }
  };

  const isFormValid = () => {
    return (
      watchedBankName !== "" &&
      watchedCardNumber1 &&
      watchedCardNumber1.length === 4 &&
      watchedCardNumber2 &&
      watchedCardNumber2.length === 4 &&
      watchedCardNumber3 &&
      watchedCardNumber3.length === 4 &&
      watchedCardNumber4 &&
      watchedCardNumber4.length === 4 &&
      watchedCvc &&
      watchedCvc.length === 3 &&
      watchedExpiryDate &&
      watchedExpiryDate.length === 4 &&
      watchedCardPassword &&
      watchedCardPassword.length === 2
    );
  };
  return (
    <div className="h-screen w-full relative overflow-y-scroll pb-[180px]">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 pt-[88px]">
        <form id="apply-form" onSubmit={handleSubmit(onSubmit)}>
          {/* 헤더 영역 */}
          <div className="w-full relative">
            <div className="inline-block relative">
              <h1
                className="text-[24px] text-black px-5"
                style={{
                  fontFamily: "S-CoreDream-5Medium",
                  letterSpacing: "-2.5%"
                }}
              >
                데이바이데이
                <br /> 3일 무료체험 신청하기
              </h1>

              {/* 텍스트 너비보다 조금 더 긴 border */}
              <div className="w-[100%] h-[1px] bg-black mt-5"></div>
            </div>
            {/* 로고 - 애니메이션 완료 후 표시 */}
            {logoAnimationComplete && (
              <div className="absolute right-0 bottom-10 w-[170px] h-auto">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="w-[170px] h-auto"
                  style={{
                    opacity: 0.3
                  }}
                />
              </div>
            )}
          </div>

          {/* 플랜 영역 */}
          <div className="px-5 mt-12">
            {/* 플랜 선택 텍스트 */}
            <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
              플랜 선택
            </p>

            {/* 플랜 카드들 */}
            <div className="flex flex-col gap-2">
              {/* 1개월 플랜 */}
              <div
                onClick={() => handlePlanSelect("1개월")}
                className={`w-full rounded-xl p-4 cursor-pointer border-2 ${
                  watchedPlan === "1개월"
                    ? "border-[#1976D2]"
                    : "bg-[#F6F6F6] border-transparent"
                }`}
                style={
                  watchedPlan === "1개월"
                    ? { backgroundColor: "rgba(25, 118, 210, 0.1)" }
                    : {}
                }
              >
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[14px] font-freesentation text-black">
                    1개월
                  </span>
                  <div className="flex flex-col items-end gap-[2px]">
                    <span className="text-[14px] font-freesentation text-black leading-none">
                      <span className="text-[18px]" style={{ fontWeight: 900 }}>
                        17,900
                      </span>
                      원/월
                    </span>
                    <span className="text-[14px] font-freesentation text-[#777777] leading-none">
                      214,800원/연
                    </span>
                  </div>
                </div>
              </div>

              {/* 3개월 플랜 */}
              <div
                onClick={() => handlePlanSelect("3개월")}
                className={`w-full rounded-xl p-4 cursor-pointer border-2 ${
                  watchedPlan === "3개월"
                    ? "border-[#1976D2]"
                    : "bg-[#F6F6F6] border-transparent"
                }`}
                style={
                  watchedPlan === "3개월"
                    ? { backgroundColor: "rgba(25, 118, 210, 0.1)" }
                    : {}
                }
              >
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[14px] font-freesentation text-black">
                    3개월
                  </span>
                  <div className="flex flex-col items-end gap-[2px]">
                    <span className="text-[14px] font-freesentation text-black leading-none">
                      <span className="text-[18px]" style={{ fontWeight: 900 }}>
                        9,900
                      </span>
                      원/월
                    </span>
                    <span className="text-[14px] font-freesentation text-[#777777] leading-none">
                      29,700원/3개월
                    </span>
                  </div>
                </div>
              </div>

              {/* 12개월 플랜 */}
              <div
                onClick={() => handlePlanSelect("12개월")}
                className={`w-full rounded-xl p-4 cursor-pointer border-2 ${
                  watchedPlan === "12개월"
                    ? "border-[#1976D2]"
                    : "bg-[#F6F6F6] border-transparent"
                }`}
                style={
                  watchedPlan === "12개월"
                    ? { backgroundColor: "rgba(25, 118, 210, 0.1)" }
                    : {}
                }
              >
                <div className="flex flex-row justify-between items-center">
                  <span className="text-[14px] font-freesentation text-black">
                    12개월
                  </span>
                  <div className="flex flex-col items-end gap-[2px]">
                    <span className="text-[14px] font-freesentation text-black leading-none">
                      <span className="text-[18px]" style={{ fontWeight: 900 }}>
                        7,900
                      </span>
                      원/월
                    </span>
                    <span className="text-[14px] font-freesentation text-[#777777] leading-none">
                      94,800원/연
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드사 선택 영역 */}
            <div className="mt-9">
              {/* 카드사 선택 텍스트 */}
              <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
                카드사 선택
              </p>

              {/* 카드사 그리드 */}
              <div className="grid grid-cols-3 gap-2">
                <BankCard
                  iconSrc="/bank nodes/KB국민카드.svg"
                  bankName="KB국민카드"
                  selected={watchedBankName === "KB국민카드"}
                  onClick={() => handleBankSelect("KB국민카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/신한카드.svg"
                  bankName="신한카드"
                  selected={watchedBankName === "신한카드"}
                  onClick={() => handleBankSelect("신한카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/NH농협카드.svg"
                  bankName="NH농협카드"
                  selected={watchedBankName === "NH농협카드"}
                  onClick={() => handleBankSelect("NH농협카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/현대카드.svg"
                  bankName="현대카드"
                  selected={watchedBankName === "현대카드"}
                  onClick={() => handleBankSelect("현대카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/카카오뱅크카드.svg"
                  bankName="카카오뱅크카드"
                  selected={watchedBankName === "카카오뱅크카드"}
                  onClick={() => handleBankSelect("카카오뱅크카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/삼성카드.svg"
                  bankName="삼성카드"
                  selected={watchedBankName === "삼성카드"}
                  onClick={() => handleBankSelect("삼성카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/하나카드.svg"
                  bankName="하나카드"
                  selected={watchedBankName === "하나카드"}
                  onClick={() => handleBankSelect("하나카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/우리카드.svg"
                  bankName="우리카드"
                  selected={watchedBankName === "우리카드"}
                  onClick={() => handleBankSelect("우리카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/롯데카드.svg"
                  bankName="롯데카드"
                  selected={watchedBankName === "롯데카드"}
                  onClick={() => handleBankSelect("롯데카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/IBK기업은행카드.svg"
                  bankName="IBK기업은행카드"
                  selected={watchedBankName === "IBK기업은행카드"}
                  onClick={() => handleBankSelect("IBK기업은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/새마을금고카드.svg"
                  bankName="새마을금고카드"
                  selected={watchedBankName === "새마을금고카드"}
                  onClick={() => handleBankSelect("새마을금고카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/케이뱅크카드.svg"
                  bankName="케이뱅크카드"
                  selected={watchedBankName === "케이뱅크카드"}
                  onClick={() => handleBankSelect("케이뱅크카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/BC카드.svg"
                  bankName="BC카드"
                  selected={watchedBankName === "BC카드"}
                  onClick={() => handleBankSelect("BC카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/우체국카드.svg"
                  bankName="우체국카드"
                  selected={watchedBankName === "우체국카드"}
                  onClick={() => handleBankSelect("우체국카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/iM뱅크카드.svg"
                  bankName="iM뱅크카드"
                  selected={watchedBankName === "iM뱅크카드"}
                  onClick={() => handleBankSelect("iM뱅크카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/BNK부산은행카드.svg"
                  bankName="BNK부산은행카드"
                  selected={watchedBankName === "BNK부산은행카드"}
                  onClick={() => handleBankSelect("BNK부산은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/씨티카드.svg"
                  bankName="씨티카드"
                  selected={watchedBankName === "씨티카드"}
                  onClick={() => handleBankSelect("씨티카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/토스뱅크카드.svg"
                  bankName="토스뱅크카드"
                  selected={watchedBankName === "토스뱅크카드"}
                  onClick={() => handleBankSelect("토스뱅크카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/BNK경남은행카드.svg"
                  bankName="BNK경남은행카드"
                  selected={watchedBankName === "BNK경남은행카드"}
                  onClick={() => handleBankSelect("BNK경남은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/광주은행카드.svg"
                  bankName="광주은행카드"
                  selected={watchedBankName === "광주은행카드"}
                  onClick={() => handleBankSelect("광주은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/SC제일은행카드.svg"
                  bankName="SC제일은행카드"
                  selected={watchedBankName === "SC제일은행카드"}
                  onClick={() => handleBankSelect("SC제일은행카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/수협은행카드.svg"
                  bankName="수협은행카드"
                  selected={watchedBankName === "수협은행카드"}
                  onClick={() => handleBankSelect("수협은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/신협카드.svg"
                  bankName="신협카드"
                  selected={watchedBankName === "신협카드"}
                  onClick={() => handleBankSelect("신협카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/한국산업은행카드.svg"
                  bankName="한국산업은행카드"
                  selected={watchedBankName === "한국산업은행카드"}
                  onClick={() => handleBankSelect("한국산업은행카드")}
                />

                <BankCard
                  iconSrc="/bank nodes/전북은행카드.svg"
                  bankName="전북은행카드"
                  selected={watchedBankName === "전북은행카드"}
                  onClick={() => handleBankSelect("전북은행카드")}
                />
                <BankCard
                  iconSrc="/bank nodes/제주은행카드.svg"
                  bankName="제주은행카드"
                  selected={watchedBankName === "제주은행카드"}
                  onClick={() => handleBankSelect("제주은행카드")}
                />
              </div>
            </div>

            {/* 카드번호 입력 영역 */}
            <div className="mt-9">
              {/* 카드번호 입력 텍스트 */}
              <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
                카드번호
              </p>

              {/* 카드번호 입력 박스들 */}
              <div className="flex flex-row gap-2">
                <input
                  {...register("cardNumber1", { required: true })}
                  type="text"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-center focus:outline-none focus:border-[#1976D2]"
                />
                <input
                  {...register("cardNumber2", { required: true })}
                  type="password"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-center focus:outline-none focus:border-[#1976D2]"
                />
                <input
                  {...register("cardNumber3", { required: true })}
                  type="password"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-center focus:outline-none focus:border-[#1976D2]"
                />
                <input
                  {...register("cardNumber4", { required: true })}
                  type="text"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-center focus:outline-none focus:border-[#1976D2]"
                />
              </div>
            </div>

            {/* CVC/CVV와 유효기간 영역 */}
            <div className="mt-5 flex flex-row gap-4">
              {/* CVC/CVV 섹션 */}
              <div className="w-full">
                <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
                  CVC/CVV
                </p>
                <input
                  {...register("cvc", { required: true })}
                  type="password"
                  maxLength={3}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-left focus:outline-none focus:border-[#1976D2]"
                />
              </div>

              {/* 유효기간 섹션 */}
              <div className="w-full">
                <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
                  유효기간(MMYY)
                </p>
                <input
                  {...register("expiryDate", { required: true })}
                  type="text"
                  maxLength={4}
                  placeholder="MMYY"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                  className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-left focus:outline-none focus:border-[#1976D2]"
                />
              </div>
            </div>

            {/* 카드 비밀번호 영역 */}
            <div className="mt-5">
              <div className="w-full flex flex-col gap-1">
                <p className="text-[16px] font-freesentation-regular text-[#777777] mb-3">
                  카드 비밀번호 앞2자리
                </p>

                <div className="w-full flex flex-row gap-6">
                  <input
                    {...register("cardPassword", { required: true })}
                    type="password"
                    maxLength={2}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
                    className="w-full px-2 py-3 rounded-[8px] border border-[#CECECE] text-[14px] text-left focus:outline-none focus:border-[#1976D2]"
                  />
                  <div className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="bg-white px-5 pb-10 relative">
          {/* 그라데이션 오버레이 - 버튼 위 20px만 */}
          <div className="absolute top-[-20px] left-0 right-0 h-[20px]  bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          <button
            type="button"
            onClick={() => {
              if (isFormValid()) {
                setShowPhonePopup(true);
              }
            }}
            className={`w-full px-4 py-[18px] rounded-[12px] text-[18px] font-medium font-freesentation bg-[#1976D2] text-white whitespace-nowrap transition-opacity ${
              isFormValid() ? "opacity-100" : "opacity-20"
            }`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      {/* 팝업들 */}
      <PhoneNumberPopup
        isOpen={showPhonePopup}
        onClose={handlePhoneClose}
        onConfirm={handlePhoneConfirm}
      />

      <AlertPopup
        isOpen={showAlertPopup}
        onClose={() => setShowAlertPopup(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        showCancel={alertConfig.showCancel}
      />
    </div>
  );
};

export default ApplyContent;

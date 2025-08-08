import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneNumberPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phoneNumber: string) => void;
}

const PhoneNumberPopup: FC<PhoneNumberPopupProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");

    // 11자리 초과하면 자르기
    if (numbers.length > 11) {
      return phoneNumber;
    }

    // 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleConfirm = () => {
    if (phoneNumber.trim() && isValidPhoneNumber(phoneNumber)) {
      const currentPhoneNumber = phoneNumber; // 현재 번호 저장
      onConfirm(currentPhoneNumber);
      setPhoneNumber(""); // 초기화는 전달 후에
    }
  };

  const isValidPhoneNumber = (phone: string) => {
    // 숫자만 추출해서 11자리인지 확인
    const numbers = phone.replace(/[^\d]/g, "");
    return numbers.length === 11;
  };

  const handleClose = () => {
    setPhoneNumber("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 백드롭 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={handleClose}
          />

          {/* 팝업 컨테이너 */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-md mx-4">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <video
                  src="/popup.mp4"
                  autoPlay
                  muted
                  loop
                  className="h-auto object-cover rounded-xl"
                  style={{ width: 600 }}
                />
                <h2
                  className="text-[24px] font-freesentation text-center text-black mb-2"
                  style={{ fontWeight: 600 }}
                >
                  AI 코칭 가능 인원이 가득 찼어요
                </h2>
                <p
                  className="text-[14px] font-freesentation text-center mb-3"
                  style={{ color: "#121212", lineHeight: "150%" }}
                >
                  휴대폰번호를 남겨주시면 <br /> 이용 가능할 때 다시
                  연락드릴게요.
                </p>

                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 rounded-[12px] border border-[#E0E0E0] text-[16px] focus:outline-none focus:border-[#1976D2] mb-4"
                  autoFocus
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 rounded-[12px] bg-[#F5F5F7] text-[16px] font-medium text-[#787878] hover:bg-gray-50 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={
                      !phoneNumber.trim() || !isValidPhoneNumber(phoneNumber)
                    }
                    className={`flex-1 py-3 px-4 rounded-[12px] text-[16px] font-medium transition-colors ${
                      phoneNumber.trim() && isValidPhoneNumber(phoneNumber)
                        ? "bg-[#1976D2] text-white hover:bg-[#1565C0]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    알림 신청하기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PhoneNumberPopup;

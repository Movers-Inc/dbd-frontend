import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  showCancel?: boolean;
  onConfirm?: () => void;
}

const AlertPopup: FC<AlertPopupProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "확인",
  showCancel = false,
  onConfirm
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
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
            onClick={onClose}
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
              <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col">
                <img
                  src="/alert.svg"
                  alt="alert"
                  className="w-13 h-13 mb-3 self-center"
                />
                <h2 className="text-[24px] font-freesentation-semibold text-center text-black mb-2">
                  {title}
                </h2>
                <p
                  className="text-[14px] font-freesentation-regular text-center mb-6"
                  style={{ color: "#121212", lineHeight: "150%" }}
                >
                  {message}
                </p>

                <div className="flex flex-col gap-3">
                  {showCancel && (
                    <button
                      onClick={onClose}
                      className="w-full py-3 px-4 rounded-[12px] border border-[#E0E0E0] text-[16px] font-freesentation-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 px-4 rounded-[12px] bg-[#F5F5F7] text-[16px] font-freesentation-medium text-[#787878] hover:bg-gray-50 transition-colors"
                  >
                    {confirmText}
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

export default AlertPopup;

import { motion } from "framer-motion";
import { IsClose } from "../../types/common";
import { useState } from "react";

export default function BarcodeModal({ onClose }: IsClose) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <motion.div
      className="fixed inset-0  z-50"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <dialog open className="modal">
        <div className="flex justify-center absolute top-[15%]">
          <button
            onClick={onClose}
            className="btn btn-md btn-circle bg-opacity-40 border-0 bg-gray-300 shadow-none"
          >
            <img
              src="src/assets/icon/icon_close.png"
              alt="X아이콘"
              className="w-7"
              style={{
                filter: "invert(1)",
              }}
            />
          </button>
        </div>
        <div className="relative modal-box h-[55%] w-[80%]">
          <img
            src="src/assets/logo/mammoth_text.png"
            alt="매머드글씨"
            className="mt-3"
            style={{
              filter: "invert(1)", // 색 반전
            }}
          />
          <p className="text-xs mt-3 text-gray-600">멤버십 바코드</p>
          <div className="py-4 ">
            <img
              src="src/assets/barcode.png"
              alt="바코드이미지"
              className="w-[85%] h-12"
            />
            <p className="mt-1 ">3740 0013 8783 7470</p>
          </div>
          <div className="flex items-center justify-center w-9 h-5 mt-6 pr-1 pl-1 bg-red-100 text-red-600 font-bold text-sm rounded-xl">
            TIP
          </div>
          <p className="text-xs mt-3 text-gray-600">
            바코드를 이용한 오프라인 멤버십 적립은 매머드커피만 가능합니다.
            매머드익스프레스는 모바일 오더로 결제 시에만 적립이 가능합니다.
          </p>
          <div className="absolute bottom-12 left-0 w-full  mt-6 border-t-2 border-gray-200"></div>
          <div className="flex justify-between mt-9">
            <p className="text-xs text-gray-600">흔들기 설정</p>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="toggle toggle-sm border-none text-gray-200 bg-gray-400  checked:bg-red-400 checked:text-red-700"
            />
          </div>
        </div>
      </dialog>
    </motion.div>
  );
}

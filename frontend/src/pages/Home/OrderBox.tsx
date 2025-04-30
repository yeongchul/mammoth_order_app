import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Choosecafe from "../../components/Drawer/chooseCafe";

export default function OrderBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <p className="font-bold text-md">정채빈 님</p>
      <p className="font-bold text-md">환영합니다.</p>
      <div className="flex flex-wrap mt-6 w-full h-60">
        <div className="flex relative bg-[#403535] h-40 w-full rounded-xl justify-between">
          <div>
            <p className="text-white pt-4 pl-4 font-semibold">
              내 포인트 2,625점
            </p>
            <div className="flex flex-row text-white pt-1 pl-4 text-xs">
              <img
                src="src/assets/icon/icon_pin.png"
                alt="핀 아이콘"
                className="w-3 h-3 pt-0.5 mr-0.5"
                style={{
                  filter: "invert(1)",
                }}
              />
              <p>중림한국경제점</p>
            </div>
          </div>
          <button className="flex m-4 h-12 w-20 bg-[#554A4A] justify-center items-center flex-col rounded-xl">
            <img
              src="src/assets/logo/mammoth_logo_notext.png"
              alt="메머드커피 로고"
              className="w-6 h-4"
              style={{
                filter: "brightness(0) invert(1)",
              }}
            />
            <p className="text-white text-[8px] mt-1">메머드커피 GO</p>
          </button>
        </div>
        <div className="relative bg-base-100 h-38 bottom-20 w-[100%] rounded-xl shadow-md p-4">
          <p className="font-semibold text-md">모아보기</p>
          <div className="flex justify-between">
            <div className="flex flex-col items-center justify-center w-14">
              <button
                className="flex bg-[#403535] rounded-2xl w-full h-14 mt-3 justify-center items-center"
                onClick={() => setIsOpen(true)}
              >
                <img
                  src="src/assets/icon/icon_order.png"
                  alt="커피주문아이콘"
                  className="p-2.5 h-full"
                  style={{
                    filter: "invert(1)",
                  }}
                />
              </button>
              <p className="text-[10px] mt-1">주문</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14">
              <button className="flex justify-center items-center border-2 border-gray-100 rounded-2xl w-full h-14 mt-3">
                <img
                  src="src/assets/icon/icon_card.png"
                  alt="카드아이콘"
                  className="p-2.5 w-full"
                />
              </button>
              <p className="text-[10px] mt-1">선불카드</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14">
              <button className="flex justify-center items-center border-2 border-gray-100 rounded-2xl w-full h-14 mt-3">
                <img
                  src="src/assets/icon/icon_award.png"
                  alt="어워드아이콘"
                  className="p-2.5 h-full"
                />
              </button>
              <p className="text-[10px] mt-1">월말대상</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14">
              <button className="flex justify-center items-center border-2 border-gray-100 rounded-2xl w-full h-14 mt-3">
                <img
                  src="src/assets/icon/icon_stamp.png"
                  alt="스탬프아이콘"
                  className="p-2.5 h-full"
                />
              </button>
              <p className="text-[10px] mt-1">적립</p>
            </div>
            <div className="flex flex-col items-center justify-center w-14">
              <button className="flex justify-center items-center border-2 border-gray-100 rounded-2xl w-full h-14 mt-3">
                <img
                  src="src/assets/icon/icon_cupon.png"
                  alt="쿠폰아이콘"
                  className="p-3 w-full"
                />
              </button>
              <p className="text-[10px] mt-1">쿠폰</p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && <Choosecafe onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

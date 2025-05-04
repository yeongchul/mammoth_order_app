//이달의 추천 메뉴 박스
import { AnimatePresence } from "framer-motion";
import Choosecafe from "../../components/Drawer/Choosecafe";
import { useEffect, useState } from "react";
import { fetchBeverages } from "../../services/beverageApi";
import { BeverageItem } from "../../types/common";

export default function RecommendBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [newBeverage, setNewBeverage] = useState<BeverageItem[]>([]);

  useEffect(() => {
    const loadNewBeverage = async () => {
      try {
        const data = await fetchBeverages();
        console.log("Fetched beverage data:", data);
        setNewBeverage(data.filter((item) => item.isNewMenu === true));
        console.log("new beverage:", data);
      } catch (error) {
        console.error("새 음료 정보를 불러오는데 실패했습니다:", error);
      }
    };

    loadNewBeverage();
  }, []);

  return (
    <div className="pl-4 pt-1 pr-4 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-md">이달의 추천 메뉴</p>
        <p
          role="button"
          className="font-semibold text-xs text-gray-500"
          onClick={() => setIsOpen(true)}
        >
          더보기
        </p>
      </div>
      <div className="carousel overflow-x-auto mt-4 pt-4 pb-4 bg-white w-full h-60 shadow-sm rounded-md">
        {newBeverage.map((items, index) => (
          <div
            key={index}
            className="carousel-item flex flex-col pl-2 pr-2 items-center"
          >
            <img src={items.image} alt={items.name} className="w-28 h-28" />
            <p className="mt-3 text-xs">{items.name}</p>
            <div className="flex flex-row mt-3 ">
              <p className="text-md font-semibold">
                {new Intl.NumberFormat("ko-KR").format(items.price)}
              </p>
              <p className="text-[10px] mt-2">원</p>
            </div>
            <div className="mt-2.5 border-2 pr-1 pl-1 border-red-600 text-red-600 font-bold text-[10px] rounded-md">
              NEW
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isOpen && <Choosecafe onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

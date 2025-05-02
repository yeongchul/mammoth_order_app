import { BeveragelistProps, BeverageItem } from "../../types/common";
import { useState, useEffect } from "react";
import { fetchBeverage } from "../../services/beverageApi";

interface BeveragepageProps extends BeveragelistProps {
  onOpenDetail: (id: number) => void;
}

export default function Beveragepage({
  type,
  onOpenDetail,
}: BeveragepageProps) {
  const [beverages, setBeverages] = useState<BeverageItem[]>([]);

  useEffect(() => {
    const loadBeverage = async () => {
      try {
        const data = await fetchBeverage();
        setBeverages(data);
        console.log("new beverage:", data);
      } catch (error) {
        console.error("새 음료 정보를 불러오는데 실패했습니다:", error);
      }
    };

    loadBeverage();
  }, []);
  const filteredBeverage =
    type === "new"
      ? beverages.filter((item) => item.isNewMenu)
      : beverages.filter((item) => item.menuType === type);

  // new인 제품을 우선 정렬
  filteredBeverage.sort((a, b) => Number(b.isNewMenu) - Number(a.isNewMenu));
  return (
    <>
      <div className="flex overflow-y-auto bg-white flex-wrap pl-3 pr-3">
        {filteredBeverage.map((cafe, index) => (
          <div
            key={index}
            role="button"
            className="flex flex-col w-1/3 items-center p-2 mb-10"
            onClick={() => onOpenDetail(cafe.id)}
          >
            <img
              src={cafe.image}
              alt="${cafe.name}이미지"
              className="w-full h-auto"
            />
            <p className="mt-2">{cafe.name}</p>
            <p className="text-md font-semibold mt-1">
              {new Intl.NumberFormat("ko-KR").format(cafe.price)}원
            </p>
            {cafe.isNewMenu && (
              <div className="mt-2.5 border-2 pr-1 pl-1 border-red-600 text-red-600 font-bold text-[10px] rounded-md">
                NEW
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

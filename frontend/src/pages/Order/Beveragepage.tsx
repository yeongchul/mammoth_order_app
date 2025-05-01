import { BeveragelistProps, BeverageItem } from "../../types/common";
import { Beverage } from "../../contexts/BeverageContext";

interface BeveragepageProps extends BeveragelistProps {
  onOpenDetail: (id: number) => void;
}

export default function Beveragepage({
  type,
  onOpenDetail,
}: BeveragepageProps) {
  const filteredBeverage =
    type === "new"
      ? Beverage.filter((item) => item.new)
      : Beverage.filter((item) => item.type === type);

  // new인 제품을 우선 정렬
  filteredBeverage.sort((a, b) => Number(b.new) - Number(a.new));
  return (
    <>
      <div className="flex overflow-y-auto bg-white flex-wrap pl-3 pr-3">
        {filteredBeverage.map((cafe, index) => (
          <div
            key={index}
            role="button"
            className="flex flex-col w-1/3 items-center p-2 mb-10"
            onClick={() => onOpenDetail(cafe.Id)}
          >
            <img
              src={cafe.imgSrc}
              alt="${cafe.name}이미지"
              className="w-full h-auto"
            />
            <p className="mt-2">{cafe.name}</p>
            <p className="text-md font-semibold mt-1">
              {new Intl.NumberFormat("ko-KR").format(cafe.price)}원
            </p>
            {cafe.new && (
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

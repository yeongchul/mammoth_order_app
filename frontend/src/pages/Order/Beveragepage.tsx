import { BeveragelistProps, BeverageItem } from "../../types/common";

export default function Beveragepage({
  type,
}: {
  type: BeveragelistProps["type"];
}) {
  const Beverage: BeverageItem[] = [
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png",
      name: "아메리카노",
      price: 1600,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/c3be7a55436a285a2a49b774788b4ce3.png",
      name: "디카페인 크림 브륄레 라뗴",
      price: 4500,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png",
      name: "아메리카노",
      price: 1600,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png",
      name: "아메리카노",
      price: 1600,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f99fa209b8c8034cb7d31b1dc5694f2d.png",
      name: "콜드브루",
      price: 2300,
      type: "coldbrew",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png",
      name: "아메리카노",
      price: 1600,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/c3be7a55436a285a2a49b774788b4ce3.png",
      name: "디카페인 크림 브륄레 라뗴",
      price: 4500,
      type: "coffee",
    },
    {
      imgSrc:
        "https://mmthcoffee.com/files/menu/f32901974928a36d3e5785397f94577e.png",
      name: "아메리카노",
      price: 1600,
      type: "coffee",
    },
  ];
  const filteredBeverage = Beverage.filter((item) => item.type === type);
  return (
    <>
      <div className="flex overflow-y-auto bg-white flex-wrap pl-3 pr-3">
        {filteredBeverage.map((cafe, index) => (
          <div
            key={index}
            className="flex flex-col w-1/3 items-center p-2 mb-10"
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
          </div>
        ))}
      </div>
    </>
  );
}

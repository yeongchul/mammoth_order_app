import { BeveragelistProps, BeverageItem } from "../../types/common";

export default function Beveragepage(type: {
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
  ];
  const filteredBeverage = Beverage.filter(
    (item) => item.type === beveragetype
  );
  return (
    <>
      <div className="flex h-screen bg-white flex-wrap">
        <ul>
          {Beverage.map((cafe, index) => (
            <li key={index} className="p-2 border-b-2 border-gray-100"></li>
          ))}
        </ul>
      </div>
    </>
  );
}

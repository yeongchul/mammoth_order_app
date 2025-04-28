//이달의 추천 메뉴 박스
import { MenuItem } from "../../types/common";

export default function RecommendBox() {
  const menuItems: MenuItem[] = [
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
      name: "커피 1",
      price: 2000,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
      name: "커피 2",
      price: 5500,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
      name: "버거 3",
      price: 4500,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
      name: "커피 4",
      price: 1500,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
      name: "커피 5",
      price: 3700,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
      name: "커피 6",
      price: 3800,
    },
    {
      imgSrc:
        "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
      name: "커피 7",
      price: 4500,
    },
  ];
  return (
    <div className="pl-4 pt-1 pr-4 pb-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-md">이달의 추천 메뉴</p>
        <p className="font-semibold text-xs text-gray-500">더보기</p>
      </div>
      <div className="mt-4 pt-4 pb-4 bg-white w-full h-60 shadow-sm rounded-md carousel">
        {menuItems.map((items, index) => (
          <div
            key={index}
            className="flex flex-col carousel-item pl-2 pr-2 items-center"
          >
            <img src={items.imgSrc} alt={items.name} className="w-28 h-28" />
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
    </div>
  );
}

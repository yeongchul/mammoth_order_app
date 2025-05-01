import { useState } from "react";

export default function Beverageoption({
  setExtraPrice,
}: {
  setExtraPrice: (price: number) => void;
}) {
  const [selectedCup, setSelectedCup] = useState("일회용컵 사용");
  const [selectTemp, setSelectTemp] = useState("ICE");
  const [selectedSize, setSelectedSize] = useState("M");
  // const [sizePrice, setSizePrice] = useState(0);

  const sizeOptions = [
    { label: "S", price: -400 },
    { label: "M", price: 0 },
    { label: "L", price: 1400 },
  ];

  return (
    <div className="p-5 w-full">
      <div>
        <p className="font-bold text-sm">컵 선택</p>
        <div className="flex flex-row text-gray-400">
          {["일회용컵 사용", "개인컵 사용", "매장컵(먹고 갈게요)"].map(
            (cup) => (
              <div
                key={cup}
                role="button"
                onClick={() => setSelectedCup(cup)}
                className={`flex items-center justify-center border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
                  ${
                    selectedCup === cup
                      ? "text-white border-[#403535] bg-[#403535]"
                      : "border-gray-200"
                  }`}
              >
                {cup}
              </div>
            )
          )}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">ICE&HOT</p>
        <div className="flex flex-row text-gray-400">
          <div
            role="button"
            className={`flex items-center justify-center w-[45px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg
              ${
                selectTemp === "ICE"
                  ? "bg-blue-300 border-blue-300 text-white"
                  : "border-gray-200"
              }`}
            onClick={() => setSelectTemp("ICE")}
          >
            ICE
          </div>
          <div
            role="button"
            className={`flex items-center justify-center w-[45px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg
              ${
                selectTemp === "HOT"
                  ? "bg-red-400 border-red-400 text-white"
                  : "border-gray-200"
              }`}
            onClick={() => setSelectTemp("HOT")}
          >
            HOT
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">SIZE</p>
        <div className="flex flex-row text-gray-400">
          {sizeOptions.map(({ label, price }) => (
            <div
              key={label}
              role="button"
              className={`flex flex-col items-center relative justify-center w-[80px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
              ${
                selectedSize === label
                  ? "text-white border-[#403535] bg-[#403535]"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setSelectedSize(label);
                setExtraPrice(price);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="42px"
                viewBox="0 -960 960 960"
                width="42px"
                fill={selectedSize === label ? "#FFFFFF" : "#9ca3af"}
                className=""
              >
                <path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z" />
              </svg>
              <p
                className={`absolute top-[20px] mr-1 ${
                  selectedSize === label ? "text-[#FFFFFF]" : ""
                }`}
              >
                {label}
              </p>
              <p className="mt-1">
                ({price < 0 ? "" : "+"}
                {new Intl.NumberFormat("ko-KR").format(price)})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

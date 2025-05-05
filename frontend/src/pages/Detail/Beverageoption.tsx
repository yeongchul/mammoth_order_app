import { useEffect, useState } from "react";
import { CoffeeoptionProps } from "../../types/common";

type CupTypeKeys = "일회용컵 사용" | "개인컵 사용" | "매장컵(먹고 갈게요)";
type CupTypeValues = "disposableCup" | "personalCup" | "storeCup";
type CupTypeMapping = {
  [key in CupTypeKeys]: CupTypeValues;
};

export default function Beverageoption({
  setCupType, setAddCart, setSize, setIsIce, setExtraPrice
}:
  CoffeeoptionProps
) {
  const cupTypeMapping: CupTypeMapping = {
    "일회용컵 사용": "disposableCup",
    "개인컵 사용": "personalCup",
    "매장컵(먹고 갈게요)": "storeCup",
  };

  const [selectedCup, setSelectedCup] = useState<CupTypeKeys>("일회용컵 사용");
  const [selectedTemp, setSelectedTemp] = useState<"HOT" | "ICE">("ICE");
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">("M");

  const sizePrice: { [key: string]: number } = {
    S: -400,
    M: 0,
    L: 1400,
  };
  const handleCupTypeChange = (cup: CupTypeKeys) => {
    setSelectedCup(cup);
    setCupType(cupTypeMapping[cup]);
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            cupType: cupTypeMapping[cup],
          }
        : prev
    );
  };

  const handleTempChange = (temp: "HOT" | "ICE") => {
    setSelectedTemp(temp);
    setIsIce(temp === "ICE");
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            isIce : temp === "ICE",
          }
        : prev
    );
  };

  const handleSizeChange = (size: "S" | "M" | "L") => {
    setSelectedSize(size);
    setSize(size.toLowerCase() as "s" | "m" | "l");
    setExtraPrice(sizePrice[size]);
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            size: (size.toLowerCase() as "s" | "m" | "l"),
          }
        : prev
    );
  };

  useEffect(()=>{
    setCupType("disposableCup");
    setIsIce(true);
    setSize("s");    
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            cupType: "disposableCup",
        isIce: true, 
        size: "m"
          }
        : prev
    );
  },[])

  return (
    <div className="p-5 w-full">
      <div>
        <p className="font-bold text-sm">컵 선택</p>
        <div className="flex flex-row text-gray-400">
        {(Object.keys(cupTypeMapping) as CupTypeKeys[]).map((cup, index) => (
            <div
              key={index}
              role="button"
              onClick={() => handleCupTypeChange(cup)}
              className={`flex items-center justify-center border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
                    ${
                      selectedCup === cup
                        ? "text-white border-[#403535] bg-[#403535]"
                        : "border-gray-200"
                    }`}
            >
              {cup}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">ICE&HOT</p>
        <div className="flex flex-row text-gray-400">
          <div
            role="button"
            onClick={() => handleTempChange("ICE")}
            className={`flex items-center justify-center w-[45px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg
              ${
                selectedTemp === "ICE"
                  ? "bg-blue-300 border-blue-300 text-white"
                  : "border-gray-200"
              }`}
          >
            ICE
          </div>
          <div
            role="button"
            className={`flex items-center justify-center w-[45px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg
              ${
                selectedTemp === "HOT"
                  ? "bg-red-400 border-red-400 text-white"
                  : "border-gray-200"
              }`}
              onClick={() => handleTempChange("HOT")}
          >
            HOT
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">SIZE</p>
        <div className="flex flex-row text-gray-400">
        {["S", "M", "L"].map((size) => (
            <div
              key={size}
              role="button"
              className={`flex flex-col items-center relative justify-center w-[80px] border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
              ${
                selectedSize === size
                  ? "text-white border-[#403535] bg-[#403535]"
                  : "border-gray-200"
              }`}
              onClick={() => handleSizeChange(size as "S" | "M" | "L")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="42px"
                viewBox="0 -960 960 960"
                width="42px"
                fill={selectedSize === size ? "#FFFFFF" : "#9ca3af"}
                className=""
              >
                <path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z" />
              </svg>
              <p
                className={`absolute top-[20px] mr-1 ${
                  selectedSize === size ? "text-[#FFFFFF]" : ""
                }`}
              >
                {size}
              </p>
              <p className="mt-1">
                ({sizePrice[size] < 0 ? "" : "+"}
                {new Intl.NumberFormat("ko-KR").format(sizePrice[size])})
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

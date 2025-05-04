import { useState } from "react";
import { FrappeoptionProps } from "../../types/common";

type CupTypeKeys = "일회용컵 사용" | "개인컵 사용" | "매장컵(먹고 갈게요)";
type CupTypeValues = "disposableCup" | "personalCup" | "storeCup";
type CupTypeMapping = {
  [key in CupTypeKeys]: CupTypeValues;
};

export default function Frappeoption({ setCupType }: FrappeoptionProps) {
  const cupTypeMapping: CupTypeMapping = {
    "일회용컵 사용": "disposableCup",
    "개인컵 사용": "personalCup",
    "매장컵(먹고 갈게요)": "storeCup",
  };

  const [selectedCup, setSelectedCup] = useState<CupTypeKeys>("일회용컵 사용");

  const sizePrice: number = 0;
  return (
    <div className="p-5 w-full">
      <div>
        <p className="font-bold text-sm">컵 선택</p>
        <div className="flex flex-row text-gray-400">
          {(Object.keys(cupTypeMapping) as CupTypeKeys[]).map((cup, index) => (
            <div
              key={index}
              role="button"
              onClick={() => {
                setSelectedCup(cup);
                setCupType(cupTypeMapping[cup]);
              }}
              className={`flex items-center justify-center border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
                    ${
                      selectedCup === cup
                        ? "text-white border-[#403535] bg-[#403535]"
                        : "border-gray-200"
                    }`}
            >
              {index}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">ICE ONLY</p>
        <div
          role="button"
          className="flex items-center justify-center w-[80px] border-2 font-bold bg-blue-300 border-blue-300 text-white text-xs mt-3 mr-1 p-2.5 rounded-lg"
        >
          ICE ONLY
        </div>
      </div>
      <div className="mt-10">
        <p className="font-bold text-sm">SIZE</p>
        <div
          role="button"
          className="w-[80px] flex flex-col items-center relative text-white border-[#403535] bg-[#403535] justify-center border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="42px"
            viewBox="0 -960 960 960"
            width="42px"
            fill="#FFFFFF"
            className=""
          >
            <path d="M160-120v-80h640v80H160Zm160-160q-66 0-113-47t-47-113v-400h640q33 0 56.5 23.5T880-760v120q0 33-23.5 56.5T800-560h-80v120q0 66-47 113t-113 47H320Zm0-80h240q33 0 56.5-23.5T640-440v-320H240v320q0 33 23.5 56.5T320-360Zm400-280h80v-120h-80v120ZM320-360h-80 400-320Z" />
          </svg>
          <p className="absolute top-[20px] mr-1">M</p>
          <p className="mt-1">
            ({sizePrice < 0 ? "" : "+"}
            {sizePrice})
          </p>
        </div>
      </div>
    </div>
  );
}

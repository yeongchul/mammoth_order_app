import { useState } from "react";
import { MilkoptionProps } from "../../types/common";

type MilkTypes = "milk" | "lowFatMilk" | "soyMilk" | "almondBreeze" | "oatSide";
type MilkLabels = "우유" | "저지방 우유" | "두유" | "아몬드브리즈" | "오트사이드";
type MilkTypeMapping = {
  [key in MilkLabels]: MilkTypes;
};

export default function Milkoption({setMilkOption, setAddCart}: MilkoptionProps) {
  const milkTypeMapping: MilkTypeMapping = {
    "우유": "milk",
    "저지방 우유": "lowFatMilk",
    "두유": "soyMilk",
    "아몬드브리즈": "almondBreeze",
    "오트사이드": "oatSide",
  };
  const [selectedMilk, setSelectedMilk] = useState<MilkLabels>("우유");

  const handleMilkTypeChange = (milk: MilkLabels) => {
    setSelectedMilk(milk);
    const milkType = milkTypeMapping[milk];
    setMilkOption(milkType);
    
    if (setAddCart) {
      setAddCart((prev: any) => {
        if (!prev) return prev;
        return {
          ...prev,
          milkOption: milkType
        };
      });
    }
  };
  return (
    <div className="p-5 w-full">
      <div>
        <p className="font-bold text-sm">우유 선택</p>
        <div className="flex flex-wrap text-gray-400">
          {(Object.keys(milkTypeMapping) as MilkLabels[]).map((milk, index) => (
            <div
              key={index}
              role="button"
              onClick={() => handleMilkTypeChange(milk)}
              className={`flex items-center justify-center border-2 font-bold text-xs mt-3 mr-1 p-2.5 rounded-lg cursor-pointer
                    ${
                      selectedMilk === milk
                        ? "text-white border-[#403535] bg-[#403535]"
                        : "border-gray-200"
                    }`}
            >
              {milk}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

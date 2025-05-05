import DetailHeader from "../../components/Header/DetailHeader";
import { motion } from "framer-motion";
import { Cart, DetailProps } from "../../types/common";
import { fetchBeverage } from "../../services/beverageApi";
import Sizeexplain from "./Sizeexplain";
import Personaloption from "./Personaloption";
import Beverageoption from "./Beverageoption";
import Frappeoption from "./Frappeoption";
import Milkoption from "./Milkoption";
import { useState, useEffect } from "react";
import { BeverageItem } from "../../types/common";
import CartBtn from "../../components/Button/CartBtn";
import { HalfOrderBtn } from "../../components/Button/OrderBtn";

export default function Detailpage({
  onClose,
  beverageid,
  cafeid,
}: DetailProps) {
  const [number, setNumber] = useState(1);

  const [extraPrice, setExtraPrice] = useState(0);
  const [selectBeverage, setSelectBeverage] = useState<BeverageItem>();
  const [size, setSize] = useState<"s" | "m" | "l" >("m");
  const [cupType, setCupType] = useState<
    "disposableCup" | "personalCup" | "storeCup">("disposableCup");
  const [isIce, setIsIce] = useState<boolean >(true);
  const [milkoption, setMilkoption] = useState<
    "milk" | "lowFatMilk" | "soyMilk" | "almondBreeze" | "oatSide">("milk");

  const [addCart, setAddCart] = useState<Cart | undefined>({
    storeId: cafeid || 0,
    menuId: beverageid || 0,
    menuQuantity: 1,
    cupType: undefined,
    isIce: undefined,
    size: undefined,
    milkType: undefined,
  });

  useEffect(() => {
    if(!beverageid || !cafeid) {
      console.log("선택된 음료나 카페가 없습니다");
      return
    }
    const loadBeverage = async (beverageid: number | null) => {
      if (beverageid) {
        try {
          const data = await fetchBeverage(beverageid);
          setSelectBeverage(data);
          console.log("new beverage:", data);
        } catch (error) {
          console.error("새 음료 정보를 불러오는데 실패했습니다:", error);
        }
      }
    };
      
    loadBeverage(beverageid);
  }, [beverageid, cafeid]);

  useEffect(() => {
    if (!selectBeverage) return ;

    if (selectBeverage.menuType !== "food") {
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            menuQuantity: number,
            cupType: cupType,
            isIce: isIce,
            size: size,
            milkType: milkoption,
          }
        : prev // 또는 null 초기값이면 null 처리도 가능
    );
  }
  else{
    setAddCart(prev =>
      prev
        ? {
            ...prev,
            menuQuantity: number,
          }
        : prev // 또는 null 초기값이면 null 처리도 가능
    );
  }
  }, [number, cupType, isIce, size, milkoption]);

  return (
    <div className="h-screen">
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <DetailHeader onClose={onClose} />
        <div className="bg-[#ECECEC] h-[90%] overflow-y-auto">
          {selectBeverage != undefined && (
            <>
              <div className="flex flex-col items-center bg-white shadow-sm">
                <img
                  src={selectBeverage.image}
                  alt={selectBeverage.name}
                  className="w-[40%]"
                />
                <p
                  className={`font-bold ${
                    selectBeverage.menuType === "food" ? "mt-0" : "mt-5"
                  }`}
                >
                  {selectBeverage.name}
                </p>
                {["coffee", "coldBrew", "nonCoffee"].includes(
                  selectBeverage.menuType
                ) && <Beverageoption setCupType={setCupType} setAddCart = {setAddCart} setSize={setSize} setIsIce={setIsIce} setExtraPrice={setExtraPrice}  />}
                {["teaAde", "frappeBlended"].includes(
                  selectBeverage.menuType
                ) && <Frappeoption setCupType={setCupType} setAddCart = {setAddCart} />}
                <Sizeexplain />
                {selectBeverage.hasMilk && <Milkoption
                    setMilkOption={setMilkOption}
                    setAddCart={setAddCart}
                  />}
              </div>
              {selectBeverage.menuType != "food" && <Personaloption />}
              <div className="flex justify-between items-center bg-white p-5 mt-2 shadow-sm">
                <p className="font-bold text-sm">
                  {new Intl.NumberFormat("ko-KR").format(
                    (selectBeverage.price + extraPrice) * number
                  )}
                  원
                </p>
                <div className="flex justify-between items-center w-[40%]">
                  <div
                    role="button"
                    className="bg-black rounded-md w-6 h-6"
                    onClick={() => {
                      number >= 2 && setNumber(number - 1);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                  </div>
                  <p>{number}</p>
                  <div
                    role="button"
                    className="bg-black rounded-md w-6 h-6"
                    onClick={() => setNumber(number + 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-1 p-3 bg-white">
                <div className="flex flex-row pl-2 pr-2 mb-5 justify-between">
                  <p className="text-sm">주문금액</p>
                  <p className="font-bold text-sm text-red-700">
                    {new Intl.NumberFormat("ko-KR").format(
                      (selectBeverage.price + extraPrice) * number
                    )}
                    원
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center ">
                  {addCart && <CartBtn onClose={onClose} addCart={addCart} />}
                  <HalfOrderBtn />
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

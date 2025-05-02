import DetailHeader from "../../components/Header/DetailHeader";
import { motion } from "framer-motion";
import { DetailProps } from "../../types/common";
import { fetchBeverage } from "../../services/beverageApi";
import Sizeexplain from "./Sizeexplain";
import Personaloption from "./Personaloption";
import Beverageoption from "./Beverageoption";
import Frappeoption from "./Frappeoption";
import Milkoption from "./Milkoption";
import { useState, useEffect } from "react";
import { BeverageItem } from "../../types/common";
import CartBtn from "../../components/Button/CartBtn";
import OrderBtn from "../../components/Button/OrderBtn";

export default function Detailpage({ onClose, id }: DetailProps) {
  const [number, setNumber] = useState(1);
  const [extraPrice, setExtraPrice] = useState(0);
  const [selectBeverage, setSelectBeverage] = useState<BeverageItem[]>([]);

  useEffect(() => {
    const loadBeverage = async () => {
      try {
        const data = await fetchBeverage();
        setSelectBeverage(data.filter((item) => item.id === id));
        console.log("new beverage:", data);
      } catch (error) {
        console.error("새 음료 정보를 불러오는데 실패했습니다:", error);
      }
    };

    loadBeverage();
  }, []);

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
          {selectBeverage.map((item, index) => (
            <>
              <div
                key={index}
                className="flex flex-col items-center bg-white shadow-sm"
              >
                <img src={item.image} alt={item.name} className="w-[40%]" />
                <p
                  className={`font-bold ${
                    item.menuType === "food" ? "mt-0" : "mt-5"
                  }`}
                >
                  {item.name}
                </p>
                {["coffee", "coldbrew", "noncoffee"].includes(
                  item.menuType
                ) && <Beverageoption setExtraPrice={setExtraPrice} />}
                {["teaade", "frappe"].includes(item.menuType) && (
                  <Frappeoption />
                )}
                <Sizeexplain />
                {item.hasMilk && <Milkoption />}
              </div>
              {item.menuType != "food" && <Personaloption />}
              <div className="flex justify-between items-center bg-white p-5 mt-2 shadow-sm">
                <p className="font-bold text-sm">
                  {new Intl.NumberFormat("ko-KR").format(
                    (item.price + extraPrice) * number
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
                      (item.price + extraPrice) * number
                    )}
                    원
                  </p>
                </div>

                <div className="flex flex-row justify-between items-center ">
                  <CartBtn />
                  <OrderBtn />
                </div>
              </div>
            </>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

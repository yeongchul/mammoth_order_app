import { motion } from "framer-motion";
import CartHeader from "../../components/Header/CartHeader";
import { IsClose, Order, CartInfo } from "../../types/common";
import { fetchBuynow } from "../../services/orderApi";
import { useEffect,useState } from "react";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";

export default function Buynowpage({onClose}:IsClose) {
    const [buyNow, setBuyNow] = useState<CartInfo>();
    useEffect(()=>{
        async function fetchbuy() {
            try {
              const buyinfo = await fetchBuynow();
              setBuyNow(buyinfo);
            } catch (error) {
              console.error("바로구매 세션 가져오기 실패", error);
              alert("바로구매 정보를 가져오지 못했습니다. 다시 시도해주세요.");
            }
          }
          fetchbuy();
    },[])

    function cupTypeMapping(cupType:string){
        if(cupType == "personalCup"){
            return "개인컵 사용";
        }else if (cupType === "disposableCup") {
            return "일회용컵 사용";
          } else if (cupType === "storeCup") {
            return "매장컵(먹고 갈게요)";
          } else {
            return "알 수 없음";
          }
      }
      function milkTypeMapping(milkType:string){
        if(milkType == "milk"){
            return "우유";
        }else if (milkType === "lowFatMilk") {
            return "저지방 우유";
          } else if (milkType === "soyMilk") {
            return "두유";
          } else if (milkType === "almondBreeze") {
            return "아몬드 브리즈";
          }else if (milkType === "oatSide") {
            return "오트 사이드";
          }else {
            return "알 수 없음";
          }
      }

  return (
    <div className="h-screen">
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CartHeader onClose={onClose} />
        {buyNow && <div className="bg-[#ECECEC] h-[90%] overflow-y-auto">
      <div>
      <div className="bg-white">
        <div className="flex flex-row items-center p-2 font-bold">
            <div className="flex relative justify-center items-center bg-[#5D4037] w-5 h-5 rounded-md p-0.5 ml-2 mr-1">
                <img
                    src={mammothLogo}
                    alt="글자없는매머드로고"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                  </div>
                <p>{buyNow.storeName}</p>
            </div>
            <div className="mt-2 p-2 w-full border-t-2 border-gray-200"></div>
            <div className="flex flex-row w-full mt-3">
                <div className="flex items-center w-[35%]">
                    <img src={buyNow.menuImage} alt={buyNow.menuName}
                className="w-[95%] h-auto"/>
                </div>
                <div className="flex flex-row justify-between w-[65%]">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold">{buyNow.menuName}</p>
                        {buyNow.cupType &&
                        <div className="flex flex-col justify-center text-xs mt-2 mb-2 font-semibold text-gray-400">
                            <p>{cupTypeMapping(buyNow.cupType)}</p>
                            {buyNow.isIce ? <p>ICE</p> : <p>HOT</p>}
                            <p>{buyNow.size?.toUpperCase()}</p>
                            {buyNow.milkType && <p>{milkTypeMapping(buyNow.milkType)}</p>}
                        </div>
                        }
                        <div className="flex flex-row">
                        <p className="font-bold">{new Intl.NumberFormat("ko-KR").format(
            buyNow.menuPrice
          )}원</p>
          <p className="text-xs">(수량: {buyNow.menuQuantity}개)</p>
          </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </div>
      }
      </motion.div>
    </div>
  );
}
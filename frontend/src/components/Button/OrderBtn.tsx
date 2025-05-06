import { useNavigate } from "react-router-dom";
import { purchaseToCart } from "../../services/cartApi";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Buynowpage from "../../pages/Purchase/Buynowpage";
import Purchasepage from "../../pages/Purchase/Purchasepage";
import { Cart, Order } from "../../types/common";
import { addToBuynow, buyNow } from "../../services/orderApi";
import PurchaseModal from "../Modal/PurchaseModal";

interface PurchaseBtnProps {
  cartIds?: number[];
}

type HalfOrderBtnProps = {
  addCart: Cart;
};

export function HalfOrderBtn({addCart} : HalfOrderBtnProps ) {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  return (
    <>
    <div 
     onClick={async()=>{
      await addToBuynow(addCart);
      setIsPurchaseOpen(true)
     }}
    className="flex justify-center items-center w-[48%] p-2.5 border-2 border-[#403535] bg-[#403535] rounded-lg">
      <p className="font-semibold text-white">바로 주문</p>
    </div>
    <AnimatePresence>
        {isPurchaseOpen && <Buynowpage onClose={() => setIsPurchaseOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
export function OrderBtn() {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  return (
    <>
    <div role="button" 
    className="flex justify-center items-center w-[90%] p-2.5 border-2 border-red-600 bg-red-600 rounded-lg"
    onClick={()=>setIsPurchaseOpen(true)}
    >
      <p className="font-semibold text-white">주문하기</p>
    </div>
    <AnimatePresence>
        {isPurchaseOpen && <Purchasepage onClose={() => setIsPurchaseOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
export function PurchaseCartBtn({cartIds} : PurchaseBtnProps) {
const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [point, setPoint] = useState<number>(0);
const [isChecked, setIsChecked] = useState<boolean>(false);

async function handlePurchase(){
  if (!isChecked) return;
  if (!cartIds || cartIds.length === 0) {
    console.error("장바구니가 비어있습니다.");
    return;
  }
  const getpoint = await purchaseToCart(cartIds);
  setPoint(getpoint);
  setIsModalOpen(true);
  setTimeout(() => {
    navigate("/home");
  }, 1500);
}

  return (
    <div className="flex flex-col items-center">
       <div className="flex flex-row mt-3 text-sm items-center pr-5 pl-5 mb-3">
                <input type="checkbox"
                onChange={(e) => setIsChecked(e.target.checked)}
                className="checkbox border-gray-400 bg-white checked:border-red-600 checked:bg-red-600 checked:text-white checkbox-sm mr-1" />
                <p className="ml-1">주문상품정보 및 결제대행 서비스 이용약관에 모두 동의합니다.</p>
            </div>
      <div role="button" 
      className={`flex justify-center items-center w-[90%] p-2.5 border-2 rounded-lg ${
        isChecked ? "bg-red-600 border-red-600" : "bg-gray-300 border-gray-300 cursor-not-allowed"
      }`}
      onClick={()=>handlePurchase()}>
        <p className="font-semibold text-white">결제진행</p>
        {isModalOpen && <PurchaseModal point={point} /> }
      </div>
      </div>
  );
}

type buynowProps = {
  buyInfo?: Order;
};

export function PurchaseBtn({buyInfo} : buynowProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [point, setPoint] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  async function handlePurchase(){
    if (!isChecked) return;
    if (!buyInfo ) {
      console.error("장바구니가 비어있습니다.");
      return;
    }
    const getpoint = await buyNow(buyInfo);
    setPoint(getpoint);
    setIsModalOpen(true);
  setTimeout(() => {
    navigate("/home");
  }, 1500);
  }
  
    return (
      <div className="flex flex-col items-center">
       <div className="flex flex-row mt-3 text-sm items-center pr-5 pl-5 mb-3">
                <input type="checkbox"
                onChange={(e) => setIsChecked(e.target.checked)}
                className="checkbox border-gray-400 bg-white checked:border-red-600 checked:bg-red-600 checked:text-white checkbox-sm mr-1" />
                <p className="ml-1">주문상품정보 및 결제대행 서비스 이용약관에 모두 동의합니다.</p>
            </div>
      <div role="button" 
      className={`flex justify-center items-center w-[90%] p-2.5 border-2 rounded-lg ${
        isChecked ? "bg-red-600 border-red-600" : "bg-gray-300 border-gray-300 cursor-not-allowed"
      }`}
      onClick={()=>handlePurchase()}>
        <p className="font-semibold text-white">결제진행</p>
        {isModalOpen && <PurchaseModal point={point} /> }
      </div>
      </div>
    );
  }
import { useNavigate } from "react-router-dom";
import { purchaseToCart } from "../../services/cartApi";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Buynowpage from "../../pages/Purchase/Buynowpage";
import Purchasepage from "../../pages/Purchase/Purchasepage";
import { Cart } from "../../types/common";
import { addToBuynow } from "../../services/orderApi";

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
    className="flex justify-center items-center w-[90%] p-2.5 border-2 border-red-500 bg-red-500 rounded-lg"
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

async function handlePurchase(){
  if (!cartIds || cartIds.length === 0) {
    console.error("장바구니가 비어있습니다.");
    return;
  }
  const point = await purchaseToCart(cartIds);
  alert(`포인트 ${point}점이 적립되었습니다.`);
  navigate("/");
}

  return (
    <div role="button" 
    className="flex justify-center items-center w-[90%] p-2.5 border-2 border-red-500 bg-red-500 rounded-lg"
    onClick={()=>handlePurchase()}>
      <p className="font-semibold text-white">결제진행</p>
    </div>
  );
}

export function PurchaseBtn({cartIds} : PurchaseBtnProps) {
  const navigate = useNavigate();
  
  async function handlePurchase(){
    if (!cartIds || cartIds.length === 0) {
      console.error("장바구니가 비어있습니다.");
      return;
    }
    const point = await purchaseToCart(cartIds);
    alert(`포인트 ${point}점이 적립되었습니다.`);
    navigate("/");
  }
  
    return (
      <div role="button" 
      className="flex justify-center items-center w-[90%] p-2.5 border-2 border-red-500 bg-red-500 rounded-lg"
      onClick={()=>handlePurchase()}>
        <p className="font-semibold text-white">결제진행</p>
      </div>
    );
  }
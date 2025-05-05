import { motion } from "framer-motion";
import { OrderBtn } from "../../components/Button/OrderBtn";
import Cartlist from "./Cartlist";
import CartHeader from "../../components/Header/CartHeader";
import { IsClose } from "../../types/common";

export default function Cartpage({onClose}:IsClose) {
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
        <div className="bg-[#ECECEC] h-[90%] overflow-y-auto">
      <div>
        <Cartlist />
        <div className="w-full border-t-2 border-gray-200"></div>
        <div className="flex bg-white pt-5 pb-5 justify-center">
          <OrderBtn />
          </div>
        
      </div>
      </div>
      </motion.div>
    </div>
  );
}

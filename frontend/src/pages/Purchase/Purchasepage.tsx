import { motion } from "framer-motion";
import CartHeader from "../../components/Header/CartHeader";
import Purchaselist from "./Purchaselist";
import { IsClose } from "../../types/common";

export default function Purchasepage({onClose}:IsClose) {
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
        <Purchaselist />
      </div>
      </div>
      </motion.div>
    </div>
  );
}
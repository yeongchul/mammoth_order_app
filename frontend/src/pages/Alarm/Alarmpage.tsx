import CloseHeader from "../../components/Header/CloseHeader";
import { motion } from "framer-motion";
import { IsClose } from "../../types/common";
import Alarmlog from "./Alarmlog";

export default function Alarmpage({ onClose }: IsClose) {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50"
      initial={{ x: "+100%" }}
      animate={{ x: 0 }}
      exit={{ x: "+100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-screen p-3 overflow-auto">
        <CloseHeader onClose={onClose} />
        <div className="flex flex-row p-1">
          <p className="text-xl font-extrabold mr-3">알림</p>
          <div
            role="button"
            className="flex items-center justify-center pl-2 pr-2 border-2 border-gray-300 text-gray-600 font-bold text-sm rounded-2xl"
          >
            전체읽음
          </div>
        </div>
        <Alarmlog />
      </div>
    </motion.div>
  );
}

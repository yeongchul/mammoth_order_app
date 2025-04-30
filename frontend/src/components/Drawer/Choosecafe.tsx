import { motion } from "framer-motion";
import { IsClose } from "../../types/common";
import Cafelist from "./Cafelist";
import ChoosecafeHeader from "../Header/ChoosecafeHeader";
import { useState } from "react";

export default function Choosecafe({ onClose }: IsClose) {
  const [activeTab, setActiveTab] = useState<"nearby" | "my">("nearby");
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <motion.div
        className="fixed inset-0 bg-white rounded-t-2xl z-50"
        initial={{ y: "100%" }}
        animate={{ y: "5%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div>
          <ChoosecafeHeader onClose={onClose} />
          <div role="tablist" className="tabs tabs-border shadow-md pl-3">
            <a
              role="tab"
              className={`tab ${activeTab === "nearby" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("nearby")}
            >
              <p className="font-extrabold">주변매장</p>
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === "my" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("my")}
            >
              <p className="font-extrabold">MY매장</p>
            </a>
          </div>
          <div>
            {activeTab === "nearby" ? (
              <Cafelist type="nearby" onClose={onClose} />
            ) : (
              <Cafelist type="my" onClose={onClose} />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

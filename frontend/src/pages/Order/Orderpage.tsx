import OrderHeader from "../../components/Header/OrderHeader";
import Beveragepage from "./Beveragepage";
import ExplainBox from "./ExplainBox";
import Detailpage from "../Detail/Detailpage";
import Choosecafe from "../../components/Drawer/Choosecafe";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BeveragelistProps } from "../../types/common";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";

export default function Orderpage() {
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { cafename } = useParams<{ cafename: string }>();
  const [activeTab, setActiveTab] = useState<BeveragelistProps["type"]>("new");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [beverageId, setBeverageId] = useState<number | null>(null);

  const typeLabels: Record<BeveragelistProps["type"], string> = {
    new: "NEW",
    coffee: "커피",
    coldbrew: "콜드브루",
    noncoffee: "논 커피",
    teaade: "티/에이드",
    frappe: "프라페/블렌디드",
    food: "디저트",
  };

  const clickTab = (type: BeveragelistProps["type"], index: number) => {
    setActiveTab(type);

    const el = tabRefs.current[index];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleOpenDetail = (id: number) => {
    setBeverageId(id);
    setIsDetailOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-screen">
      <OrderHeader onClose={() => history.back()} />
      <div className="bg-[#ECECEC] h-[90%] overflow-y-auto">
        <div className="flex justify-between items-center bg-white p-2 mb-3">
          <div className="flex flex-row ml-2">
            <p className="font-extrabold">{cafename}</p>
            <p>의 메뉴입니다.</p>
          </div>
          <div
            role="button"
            className="flex items-center justify-center p-0.5 pl-3 pr-3 mr-2 border-2 border-gray-300 text-gray-400 font-bold text-sm rounded-lg"
            onClick={() => setIsOpen(true)}
          >
            변경
          </div>
        </div>
        <div className="flex overflow-x-scroll bg-white shadow-md mb-0.5 scrollbar-hide">
          <div
            role="tablist"
            className="flex tabs-border whitespace-nowrap min-w-full"
          >
            {Object.keys(typeLabels).map((type, index) => (
              <a
                key={type}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                className={`tab ${activeTab === type ? "tab-active" : ""}`}
                onClick={() =>
                  clickTab(type as BeveragelistProps["type"], index)
                }
              >
                <p className="font-extrabold">
                  {typeLabels[type as BeveragelistProps["type"]]}
                </p>
              </a>
            ))}
          </div>
        </div>
        <Beveragepage type={activeTab} onOpenDetail={handleOpenDetail} />
        <ExplainBox />
        <AnimatePresence>
          {isDetailOpen && (
            <Detailpage
              onClose={() => setIsDetailOpen(false)}
              id={beverageId}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && <Choosecafe onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

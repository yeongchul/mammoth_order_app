import OrderHeader from "../../components/Header/OrderHeader";
import Beveragepage from "./Beveragepage";
import ExplainBox from "./ExplainBox";
import Detailpage from "../Detail/Detailpage";
import Choosecafe from "../../components/Drawer/Choosecafe";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BeveragelistProps } from "../../types/common";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { fetchCafeName } from "../../services/storeApi";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";

export default function Orderpage() {
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { cafeid } = useParams<{
    cafeid: string;
  }>();
  const [cafeName, setCafeName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<BeveragelistProps["type"]>("new");
  const [cafeId, setCafeId] = useState<number>(0)
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [beverageId, setBeverageId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    async function getCafeName(cafeid: string | undefined) {
      if (cafeid !== undefined) {
        const cafename = await fetchCafeName(Number(cafeid));
        console.log("카페 이름:", cafename);
        setCafeName(cafename);
        setCafeId(Number(cafeid));
      }
    }
    getCafeName(cafeid);
  },[])

  const typeLabels: Record<BeveragelistProps["type"], string> = {
    new: "NEW",
    coffee: "커피",
    coldBrew: "콜드브루",
    nonCoffee: "논 커피",
    teaAde: "티/에이드",
    frappeBlended: "프라페/블렌디드",
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

  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <OrderHeader onClose={() => navigate("/home")} />
      <div className="bg-[#ECECEC] h-[90%] overflow-y-auto">
        <div className="flex justify-between items-center bg-white p-2 mb-3">
          <div className="flex flex-row ml-2">
          <div className="flex relative justify-center items-center bg-[#5D4037] w-5 h-5 rounded-md p-0.5 mr-1">
                <img
                    src={mammothLogo}
                    alt="글자없는매머드로고"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                  </div>
            <p className="font-bold">{cafeName}</p>
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
              beverageid={beverageId}
              cafeid={cafeId}
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

import BarcodeModal from "../Modal/BarcodeModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Menupage from "../../pages/Menu/Menupage";
import Alarmpage from "../../pages/Alarm/Alarmpage";

export default function HomeHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);

  // const closeMenu = () => {
  //   setIsMenuOpen(false);
  // };

  // const closeAlarm = () => {
  //   setIsAlarmOpen(false);
  // };

  return (
    <div className="navbar bg-base-100 p-0 pl-1 pr-1">
      <div className="navbar-start">
        <div role="button" className="p-2" onClick={() => setIsMenuOpen(true)}>
          <img
            src="src/assets/icon/icon_menu.png"
            alt="메뉴 아이콘"
            className="h-7 w-7"
          />
        </div>
      </div>
      <div className="navbar-center">
        <img
          src="src/assets/logo/mammoth_text.png"
          alt="매머드 로고"
          className="w-[100%]"
          style={{
            filter: "invert(1)", // 색 반전
          }}
        />
      </div>
      <div className="navbar-end">
        <button onClick={() => setIsModalOpen(true)} className="pt-2 pb-2 pr-1">
          <img
            src="src/assets/icon/icon_barcode.png"
            alt="바코드 아이콘"
            className="h-8 w-6 rounded-lg"
          />
        </button>
        <button className="p-2" onClick={() => setIsAlarmOpen(true)}>
          <img
            src="src/assets/icon/icon_notification.png"
            alt="알림 아이콘"
            className="h-6 w-6"
          />
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && <BarcodeModal onClose={() => setIsModalOpen(false)} />}
        {isMenuOpen && <Menupage onClose={() => setIsMenuOpen(false)} />}
        {isAlarmOpen && <Alarmpage onClose={() => setIsAlarmOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

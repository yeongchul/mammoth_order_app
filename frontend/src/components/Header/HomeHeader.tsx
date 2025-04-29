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
    <div className="navbar bg-base-100 p-0">
      <div className="navbar-start">
        <div role="button" className="p-2" onClick={() => setIsMenuOpen(true)}>
          <img
            src="src/assets/icon/icon_menu.png"
            alt="Menu Icon"
            className="h-6 w-6"
          />
        </div>
      </div>
      <div className="navbar-center">
        <img
          src="src/assets/logo/mammoth_text.png"
          alt="Mammoth Logo"
          className="w-[100%]"
          style={{
            filter: "invert(1)", // 색 반전
          }}
        />
      </div>
      <div className="navbar-end">
        <button onClick={() => setIsModalOpen(true)} className="p-2">
          <img
            src="src/assets/icon/icon_barcode.png"
            alt="Barcode Icon"
            className="h-7 w-6 rounded-lg"
          />
        </button>
        <button className="p-2" onClick={() => setIsAlarmOpen(true)}>
          <img
            src="src/assets/icon/icon_notification.png"
            alt="Menu Icon"
            className="h-5 w-5"
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

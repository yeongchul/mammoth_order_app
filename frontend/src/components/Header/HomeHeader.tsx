import BarcodeModal from "../Modal/BarcodeModal";
import { useState } from "react";

export default function HomeHeader() {
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 p-0">
      <div className="navbar-start">
        <div role="button" className="btn btn-ghost btn-disabled p-2">
          <img
            src="src/assets/icon_menu.png"
            alt="Menu Icon"
            className="h-6 w-6"
          />
        </div>
      </div>
      <div className="navbar-center">
        <img
          src="src/assets/mammoth_text.png"
          alt="Mammoth Logo"
          className="w-[100%]"
          style={{
            filter: "invert(1)", // 색 반전
          }}
        />
      </div>
      <div className="navbar-end">
        <button
          onClick={() => setisModalOpen(true)}
          className="btn btn-ghost btn-circle btn-disabled"
        >
          <img
            src="src/assets/icon_barcode.png"
            alt="Barcode Icon"
            className="h-7 w-6 rounded-lg"
          />
        </button>
        <button className="btn btn-ghost btn-circle btn-disabled">
          <img
            src="src/assets/icon_notification.png"
            alt="Menu Icon"
            className="h-5 w-5 mr-1"
          />
        </button>
      </div>
      <BarcodeModal isOpen={isModalOpen} setIsOpen={setisModalOpen} />
    </div>
  );
}

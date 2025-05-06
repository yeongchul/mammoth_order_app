import { IsClose } from "../../types/common";
export default function CartHeader({ onClose }: IsClose) {
  return (
    <div className="flex justify-between bg-white items-center p-2 pl-1 pr-1 h-12">
      <div className="navbar-start">
        <div role="button" className="p-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#000000"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </div>
      </div>
      <div className="navbar-center">
        <p className="font-extrabold">주문하기</p>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}

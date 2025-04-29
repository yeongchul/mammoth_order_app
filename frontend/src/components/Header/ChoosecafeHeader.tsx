import { IsClose } from "../../types/common";

export default function ChoosecafeHeader({ onClose }: IsClose) {
  return (
    <div className="flex justify-between p-1">
      <div role="button" onClick={onClose}>
        <img
          src="src/assets/icon/icon_close.png"
          alt="닫기아이콘"
          className="w-8"
        />
      </div>
      <p className="font-extrabold">주문 매장 선택</p>
      <img
        src="src/assets/icon/icon_search.png"
        alt="돋보기아이콘"
        className="w-8"
      />
    </div>
  );
}

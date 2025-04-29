import { IsClose } from "../../types/common";

export default function CloseHeader({ onClose }: IsClose) {
  return (
    <>
      <div role="button" className="flex justify-end" onClick={onClose}>
        <img
          src="src/assets/icon/icon_close.png"
          alt="닫기아이콘"
          className="w-8"
        />
      </div>
    </>
  );
}

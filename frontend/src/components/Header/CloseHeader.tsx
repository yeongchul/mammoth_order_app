import { IsClose } from "../../types/common";

export default function CloseHeader({ onClose }: IsClose) {
  return (
    <>
      <div role="button" className="flex justify-end" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="28px"
          viewBox="0 -960 960 960"
          width="28px"
          fill="#000000"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
    </>
  );
}

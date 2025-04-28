import { ModalProps } from "../../types/common";

export default function BarcodeModal({ isOpen, setIsOpen }: ModalProps) {
  return (
    isOpen && (
      <dialog open className="modal">
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    )
  );
}

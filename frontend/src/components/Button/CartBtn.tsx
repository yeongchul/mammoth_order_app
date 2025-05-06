import { IsClose } from "../../types/common";
import { Cart } from "../../types/common";
import { addToCart } from "../../services/cartApi";
import { useState } from "react";
import CartModal from "../Modal/CartModal";

type CartBtnProps = IsClose & {
  addCart: Cart;
  setAddCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

export default function CartBtn({ onClose, addCart, setAddCart }: CartBtnProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div
      role="button"
      className="flex justify-center items-center w-[48%] p-2.5 border-2 border-[#403535] bg-[#E7DFDB] rounded-lg"
      onClick={async () => {
        if (!addCart) {
          alert("장바구니 정보가 없습니다.");
          return;
        }

        try {
          await addToCart(addCart);
          setIsModalOpen(true);
          setAddCart((prev: any) =>
            prev
              ? {
                  ...prev,
                  cupType: undefined,
                  isIce: undefined,
                  size: undefined,
                  milkType: undefined,
                }
              : prev
          );
          setTimeout(() => {
            onClose();
          }, 1000);
        } catch (error) {
          alert("장바구니 담기에 실패했습니다.");
          console.error(error);
        }
      }}
    >
      <p className="font-semibold text-[#403535]">장바구니 담기</p>
      {isModalOpen && <CartModal />}
    </div>
  );
}

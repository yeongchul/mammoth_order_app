import { IsClose } from "../../types/common";
import { Cart } from "../../types/common";
import { addToCart } from "../../services/cartApi";

type CartBtnProps = IsClose & {
  addCart: Cart;
};

export default function CartBtn({ onClose, addCart }: CartBtnProps) {
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
          alert("장바구니에 담겼습니다.");
          onClose();
        } catch (error) {
          alert("장바구니 담기에 실패했습니다.");
          console.error(error);
        }
      }}
    >
      <p className="font-semibold text-[#403535]">장바구니 담기</p>
    </div>
  );
}

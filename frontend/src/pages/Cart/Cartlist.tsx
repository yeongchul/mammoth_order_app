import { useState, useEffect } from "react";
import { CartInfo } from "../../types/common";
import { fetchCart } from "../../services/cartApi";
import { deleteToCart } from "../../services/cartApi";

export default function Cartlist(){
    const [cart, setCart] = useState<CartInfo[]>([]);
    const totalprice : number = cart.reduce((sum, item) => sum + item.menuPrice, 0);
    const [storename, setStorename] = useState<string>("");

    const loadCart = async () => {
              try {
                const cartData = await fetchCart();
                setCart(cartData);
              } catch (error) {
                console.error("장바구니 정보를 불러오는데 실패했습니다:", error);
              }
            };
    
      useEffect(()=>{
            loadCart();
            if(cart){
                const storeName = cart[0].storeName;
                setStorename(storeName);
            }
      },[])

      const deletecart = async(cartId : number)=>{
        try {
              await deleteToCart(cartId);
              alert("MY 카트에서 삭제되었습니다.");
              loadCart();
            } catch (error) {
              alert("MY 매장 삭제 중 오류가 발생했습니다.");
            }
      }
      function cupTypeMapping(cupType:string){
        if(cupType == "personalCup"){
            return "개인컵 사용";
        }else if (cupType === "disposableCup") {
            return "일회용컵 사용";
          } else if (cupType === "storeCup") {
            return "매장컵(먹고 갈게요)";
          } else {
            return "알 수 없음";
          }
      }

      return(
        <>
        <div className="p-2 bg-white">
            <div className="flex items-center font-bold text-sm">
                <p>{storename}</p>
            </div>
        {cart.map((cart, index)=>(
            <div key={index}>
            {index!=0 && <div className="mt-2 w-full border-t-2 border-gray-200"></div>}
            <div className="flex flex-row w-full mt-3">
                <div className="flex items-center w-[35%]">
                    <img src={cart.menuImage} alt={cart.menuName}
                className="w-[95%] h-auto"/>
                </div>
                <div className="flex flex-row justify-between w-[65%]">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold">{cart.menuName}</p>
                        {cart.cupType &&
                        <div className="flex flex-col justify-center text-xs mt-2 mb-2 font-semibold text-gray-400">
                            <p>{cupTypeMapping(cart.cupType)}</p>
                            {cart.isIce ? <p>ICE</p> : <p>HOT</p>}
                            <p>{cart.size?.toUpperCase()}</p>
                            {cart.milkType && <p>{cart.milkType}</p>}
                        </div>
                        }
                        <p className="font-bold">{new Intl.NumberFormat("ko-KR").format(
            cart.menuPrice
          )}원</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <div role="button"
                        className="flex items-center justify-center p-0.5 pl-2 pr-2 border-2 border-gray-300 text-gray-400 font-bold text-xs rounded-lg"
                        onClick={()=>deletecart(cart.id)}
                        >
                        삭제
                        </div>
                        <p className="font-bold text-sm">{cart.menuQuantity}개</p>
                    </div>
                </div>
            </div>
            </div>
        ))}
        </div>
        <div className="flex flex-row p-3 mt-2 bg-white justify-between">
        <p className="font-bold text-sm">상품금액</p>
        <p className="font-bold text-sm ">
          {new Intl.NumberFormat("ko-KR").format(
            totalprice
          )}
          원
        </p>
      </div>
      </>
      )
}
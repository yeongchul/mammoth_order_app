import { useState, useEffect } from "react";
import { CartInfo } from "../../types/common";
import { fetchCart } from "../../services/cartApi";
import { deleteToCart } from "../../services/cartApi";
import mammothLogo from "../../assets/logo/mammoth_logo_notext.png";

export default function Cartlist(){
    const [cart, setCart] = useState<CartInfo[]>([]);
    const totalprice : number = cart.reduce((sum, item) => sum + item.menuPrice, 0);
    const [storename, setStorename] = useState<string>("");

    const loadCart = async () => {
              try {
                const cartData = await fetchCart();
                setCart(cartData);
                if (cartData.length > 0) {
                    setStorename(cartData[0].storeName);
                }
              } catch (error) {
                console.error("장바구니 정보를 불러오는데 실패했습니다:", error);
              }
            };
    
      useEffect(()=>{
            loadCart();
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
      function milkTypeMapping(milkType:string){
        if(milkType == "milk"){
            return "우유";
        }else if (milkType === "lowFatMilk") {
            return "저지방 우유";
          } else if (milkType === "soyMilk") {
            return "두유";
          } else if (milkType === "almondBreeze") {
            return "아몬드 브리즈";
          }else if (milkType === "oatSide") {
            return "오트 사이드";
          }else {
            return "알 수 없음";
          }
      }

      return(
        <>
        <div className="bg-white">
            <div className="flex flex-row items-center p-2 font-bold">
            <div className="flex relative justify-center items-center bg-[#5D4037] w-5 h-5 rounded-md p-0.5 ml-2 mr-1">
                <img
                    src={mammothLogo}
                    alt="글자없는매머드로고"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                  </div>
                <p>{storename}</p>
            </div>
            <div className="flex bg-[#ECECEC] p-3.5 items-center mt-0.5">
          <p className="text-sm text-gray-800">
           장바구니에 담으신 상품은 최대 30일간 보관됩니다.
          </p>
          </div>
        {cart.map((cart, index)=>(
            <div key={index} className="p-2">
            {index!=0 && <div className="mt-2 w-full border-t-2 border-gray-200"></div>}
            <div className="flex flex-row w-full mt-3">
                <div className="flex items-center w-[35%]">
                    <img src={cart.menuImage} alt={cart.menuName}
                className="w-[80%] h-auto"/>
                </div>
                <div className="flex flex-row justify-between w-[65%]">
                    <div className="flex flex-col justify-between">
                        <p className="font-bold">{cart.menuName}</p>
                        {cart.cupType &&
                        <div className="flex flex-col justify-center text-xs mt-2 mb-2 font-semibold text-gray-400">
                            <p>{cupTypeMapping(cart.cupType)}</p>
                            {cart.isIce ? <p>ICE</p> : <p>HOT</p>}
                            <p>{cart.size?.toUpperCase()}</p>
                            {cart.milkType && <p>{milkTypeMapping(cart.milkType)}</p>}
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
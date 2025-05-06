import { useState, useEffect } from "react";
import { User } from "../../types/common";
import { apiService } from "../../services/loginApi";

export default function SelectBuy(){
    const [user, setUser] = useState<User | null>(null);
    const [selectedMethod, setSelectedMethod] = useState('card');
    
        const paymentMethods = [
          { id: 'card', name: '카드결제' },
          { id: 'member', name: '매머드페이' },
          { id: 'gift', name: '선불카드' },
          { id: 'apple', name: 'Apple Pay' },
          { id: 'kakao', name: 'Kakao pay'},
          { id: 'kb', name: 'KB Pay' },
          { id: 'hana', name: '하나Pay'},
          { id: 'payco', name: 'PAYCO' },
          { id: 'woori', name: '우리페이' },
          { id: 'mobile', name: '휴대폰 결제' },
        ];

    useEffect(()=>{
        const loadUser = async () => {
                        try {
                          const data = await apiService.getCurrentUser();
                          setUser(data);
                          console.log("user state:", data);
                        } catch (error) {
                          console.error("사용자 정보를 불러오는데 실패했습니다:", error);
                        }
                      };
                  
                      loadUser();
    },[])
    return(
        <>
        <div className="flex flex-col bg-white p-5 mt-3 justify-center">
            <div className="flex flex-row">
                <p className="text-sm font-semibold">요청사항</p>
                <p className="text-xs font-semibold text-gray-400 mt-1 ml-1">(ex. 캐리어 준비해주세요)</p>
            </div>
            <input type="text" name="요청사항" value="" placeholder="요청사항이 있으면 적어주세요(20자 이내로 입력)"
            className="mt-3 border-2 rounded-lg p-2 text-xs" />
            <div className="flex flex-row mt-3 text-sm">
                <input type="checkbox" className="checkbox border-gray-400 bg-white checked:border-red-600 checked:bg-red-600 checked:text-white checkbox-sm mr-1" />
                <p>다음에도 사용</p>
            </div>
        </div>
        <div className="flex flex-col bg-white p-5 mt-3 justify-center">
            <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">포인트 적용</p>
                <div className="flex flex-row items-center text-red-600">
                    <p className="text-[10px]">잔여 포인트</p>
                    <p className="font-bold text-xs ml-0.5 mr-1">{user?.point}점</p>
                    <div role="button" className="text-[10px] border-[1px] pr-2 pl-2 pt-0.5 pb-0.5 border-red-600 rounded-xl">
                        전액 사용
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3 w-full">
                <div className="flex flex-row items-center">
                    <input type="text" name="요청사항" placeholder="포인트 입력"
                    className="flex flex-end border-2 rounded-lg p-2 text-xs" />
                    <p className="text-sm ml-2">원</p>
                </div>
                <div className="flex justify-center items-center w-24 h-8 bg-[#403535] rounded-md text-white">
                    적용
                </div>
            </div>
             <p className="text-[10px] text-gray-400 mt-1">100P 이상 보유시 1P 단위로 사용하실 수 있습니다.</p>
             <p className="text-[10px] text-gray-400 mt-0.5">포인트는 컵보증금을 제외한 금액까지 사용할 수 있습니다.</p>
        </div>
        <div className="flex flex-col bg-white p-5 mt-3 justify-center">
            <p className="text-sm font-semibold">결제수단</p>
            <div className="grid grid-cols-3 gap-3 mt-3">
            {paymentMethods.map((method) => (
          <button
            key={method.id}
            className={`py-2 px-4 rounded-full flex items-center justify-center transition-colors ${
              selectedMethod === method.id
                ? 'bg-[#403535] text-white'
                : 'bg-gray-100 text-gray-500'
            } ${method.id === "mobile" ? 'text-sm':''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            {method.name}
          </button>
        ))}
            </div>
        </div>
        </>
    );
}
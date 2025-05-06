import axios from "axios";
import { API_BASE_URL } from "../contexts/apiContext";
import { Cart, CartInfo, Order } from "../types/common";

const token = localStorage.getItem("token");

//세션 저장
export async function addToBuynow(addcart: Cart): Promise<string> {
    const res = await axios.post(`${API_BASE_URL}/order/buy-now/session`, addcart , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    
    return res.data;
  }
//바로구매 정보 
  export async function fetchBuynow(): Promise<CartInfo>{
    const res = await axios.get(`${API_BASE_URL}/order/buy-now/session`, {
        withCredentials: true,
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("바로구매 가져오기 응답:", res.data);
    return res.data;
  }

  //구매
export async function purchaseToCart(buyItems : Order): Promise<number> {
    const res = await axios.post(`${API_BASE_URL}/order/buy-now/checkout`, buyItems, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.earnedPoint;
  }
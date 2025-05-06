import axios from "axios";
import { API_BASE_URL } from "../contexts/apiContext";
import { Cart, CartInfo } from "../types/common";

const token = localStorage.getItem("token");

// 상품 장바구니에 추가
export async function addToCart(addcart: Cart): Promise<string> {
  const res = await axios.post(`${API_BASE_URL}/order/cart/items`, addcart , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

//장바구니 삭제
export async function deleteToCart(cartId: number): Promise<string> {
  const res = await axios.delete(`${API_BASE_URL}/order/cart/items/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// 장바구니 조회
export async function fetchCart(): Promise<CartInfo[]>{
  const res = await axios.get(`${API_BASE_URL}/order/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("카트 가져오기 응답:", res.data);
  return res.data;
}

//장바구니 구매
export async function purchaseToCart(cartIds : number[]): Promise<number> {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/order/cart/purchase`,
      cartIds,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("구매하기 응답:", res.data);
    return res.data.earnedPoint;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Purchase error details:", error.response.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}
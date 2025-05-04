import axios from "axios";
import { API_BASE_URL } from "../contexts/apiContext";
import { Cart } from "../types/common";

// const token = localStorage.getItem("token");

// 상품 장바구니에 추가
export async function addToCart(addcart: Cart) {
  const res = await axios.post(`${API_BASE_URL}/order/cart`, { addcart });
  console.log("카페 응답:", res.data);
  return res.data;
}

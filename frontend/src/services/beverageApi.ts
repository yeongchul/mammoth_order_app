import axios from "axios";
import { BeverageItem } from "../types/common";
import { API_BASE_URL } from "../contexts/apiContext";

// 메뉴 목록 불러오기
export async function fetchBeverage(): Promise<BeverageItem[]> {
  const res = await axios.get(`${API_BASE_URL}/order/menu`);
  console.log("응답 전체:", res.data);
  return res.data.menus;
}

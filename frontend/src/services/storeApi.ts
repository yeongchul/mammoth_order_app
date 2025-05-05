import axios from "axios";
import { API_BASE_URL } from "../contexts/apiContext";
import { CafeList, MyCafeList } from "../types/common";

const token = localStorage.getItem("token");

export async function fetchCafe(): Promise<CafeList[]> {
  const res = await axios.get(`${API_BASE_URL}/store`);
  console.log("카페 응답:", res.data);
  return res.data;
}

export async function fetchMyCafe(): Promise<MyCafeList[]> {
  const res = await axios.get(`${API_BASE_URL}/store/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("마이카페 응답:", res.data);
  return res.data;
}

export async function fetchCafeName(id: number): Promise<string> {
  console.log("전달되는 store id:", id);
  const res = await axios.get(`${API_BASE_URL}/store/${id}`);
  console.log("카페이름:", res.data);
  return res.data.name;
}

export async function addMyCafe(storeId: number): Promise<string> {
  const res = await axios.post(
    `${API_BASE_URL}/store/my`,
    { storeId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("마이카페 추가:", res.data);
  return res.data;
}

export async function deleteMyCafe(id: number): Promise<string> {
  const res = await axios.delete(`${API_BASE_URL}/store/my/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("마이카페 삭제:", res.data);
  return res.data;
}
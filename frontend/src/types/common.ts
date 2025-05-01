export interface BeverageItem {
  imgSrc: string;
  name: string;
  price: number;
  type?: string;
}

export interface OrderLog {
  beverage: string;
  price: number;
  point: number;
  orderdate: Date;
}

export interface CafeList {
  name: string;
  address: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface IsClose {
  onClose: () => void;
}

export type CafelistProps = {
  type: "nearby" | "my";
};

export type BeveragelistProps = {
  type:
    | "new"
    | "coffee"
    | "coldbrew"
    | "noncoffe"
    | "teaade"
    | "frappe"
    | "food";
};

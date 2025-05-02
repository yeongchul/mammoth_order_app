export interface BeverageItem {
  id: number;
  name: string;
  price: number;
  image: string;
  hasMilk: boolean;
  menuType: string;
  isNewMenu: boolean;
}

export interface Cart {
  BeverageId: number;
  Cup: string;
  ICE: boolean;
  Size: string;
  Milkoption?: string;
}

export interface OrderLog {
  beverage: string;
  price: number;
  point: number;
  orderdate: Date;
}

export interface CafeList {
  id: number;
  name: string;
  address: string;
}

export interface MyCafeList {
  id: number;
  userId: number;
  storeId: number;
  name: string;
  address: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  point: number;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface IsClose {
  onClose: () => void;
}

export interface Logout {
  logout: () => void;
}
export interface DetailProps extends IsClose {
  id: number | null;
}

export type BeveragelistProps = {
  type:
    | "new"
    | "coffee"
    | "coldBrew"
    | "nonCoffee"
    | "teaAde"
    | "frappeBlended"
    | "food";
};

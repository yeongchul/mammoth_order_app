export interface BeverageItem {
  imgSrc: string;
  name: string;
  price: number;
}

export interface OrderLog {
  beverage: string;
  price: number;
  point: number;
  orderdate: Date;
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

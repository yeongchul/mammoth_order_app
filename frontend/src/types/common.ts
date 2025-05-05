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
  storeId: number;
  menuId: number;
  menuQuantity: number;
  cupType?: "disposableCup" | "personalCup" | "storeCup";
  isIce?: boolean;
  size?: "s" | "m" | "l";
  milkType?: "milk" | "lowFatMilk" | "soyMilk" | "almondBreeze" | "oatSide";
}
export interface CartInfo extends Cart{
  id: number;
  userId: number;
  storeName: string;
  menuName: string;
  menuImage: string;
  menuPrice: number;
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
  beverageid: number | null;
  cafeid: number | undefined;
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

export type FrappeoptionProps = {
  setCupType: (cup: "disposableCup" | "personalCup" | "storeCup") => void;
  setAddCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

export type CoffeeoptionProps = FrappeoptionProps & {
  setSize: (size:  "s" | "m" | "l") => void;
  setIsIce: (isIce: boolean) => void;
  setExtraPrice: (price: number) => void;
};

export type MilkoptionProps = {
  setMilkOption: (milk: "milk" | "lowFatMilk" | "soyMilk" | "almondBreeze" | "oatSide") => void;
  setAddCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

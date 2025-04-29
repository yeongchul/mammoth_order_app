export interface MenuItem {
  imgSrc: string;
  name: string;
  price: number;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

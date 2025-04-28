export interface MenuItem {
  imgSrc: string;
  name: string;
  price: number;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

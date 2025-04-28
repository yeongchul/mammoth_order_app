export interface MenuItem {
  imgSrc: string;
  name: string;
  price: number;
}

export interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

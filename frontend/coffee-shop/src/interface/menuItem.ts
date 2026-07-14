export interface MenuItemProps {
  _id: string;
  name: string;
  price: number;
  totalQuantity: number;
  currency: string;
  selectedQuantity: number;
  cartQuantity: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onAddToCart: (
    id: string,
    name: string,
    price: number,
    quantity: number
  ) => void;
}

export interface MenuItemType {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

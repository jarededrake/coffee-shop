interface CurrentUser {
  sessionId: string;
  name: string;
  budget: number;
  currency: string;
}

export interface ShoppingViewProps {
  currentUser: CurrentUser | undefined;
  isFrontOfLine: boolean;
  onLeaveShop: () => void;
}

export interface MenuItemType {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

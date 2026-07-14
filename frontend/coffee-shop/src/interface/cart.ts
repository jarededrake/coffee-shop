export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface CartPanelProps {
    isPurchasing: boolean;
    cart: CartItem[];
    budget: number;
    currency: string;
    onRemoveFromCart: (id: string) => void;
    onPurchase: () => void;
    onLeave: () => void;
  }
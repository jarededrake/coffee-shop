import { useEffect, useState } from "react";
import "../styles/ShoppingView.css";
import MenuItem from "./MenuItems";
import CartPanel from "./CartPanel";
import ThankYouModal from "../modals/ThankYouModal";
// TODO: Import your types
// import type { MenuItem } from "../types/menu";
// import type { OrderedItems } from "../types/order";

// ✅ Should be separate props alongside currentUser
interface ShoppingViewProps {
  currentUser: {
    sessionId: string
    name: string
    budget: number
    currency: string
  } | undefined
  isFrontOfLine: boolean        // ← separate prop
  onLeaveShop: () => void       // ← callback to reset state in App.tsx
}

export default function ShoppingView({ currentUser, isFrontOfLine, onLeaveShop }: ShoppingViewProps) {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("http://0.0.0.0:5001/api/menu", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setMenuItems(result);
      console.log(result);
    };

    fetchMenuItems();
  }, []);

  function onRemoveFromCart(id: string): void {
    setCart(prev => prev.filter(item => item._id !== id))
}

  async function handlePurchase(): Promise<void> {
    try {
      const response = await fetch("http://localhost:5001/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });

      const data = await response.json();
      setShowThankYou(true)  // modal appears
      setCart([])  
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsPurchasing(false) 
    }
  }

  async function handleLeave(): Promise<void> {
    try {
      const response = await fetch("http://localhost:5001/api/dequeue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });

      const data = await response.json();
      setShowThankYou(true) 
      setCart([])  
      localStorage.removeItem('user')
      onLeaveShop()
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsPurchasing(false) 
      setShowThankYou(false)
    }  }

  function onAddToCart(
    id: string,
    name: string,
    price: number,
    quantity: number
  ) {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === id);

      if (existing) {
        return prev.map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { _id: id, name, price, quantity }];
    });
  }

  return (
    <div className="shopping-view">
      {showThankYou && <ThankYouModal onLeave={handleLeave}/>}
      {/* ── Menu Card ── */}
      <div className="card">
        <div className="card__header">
          <h2 className="card__title">☕ Menu</h2>
        </div>
        <div className="card__body">
          {menuItems.map((item) => (
            <MenuItem
              currency={currentUser?.currency ?? "USD"}
              key={item._id.toString()}
              _id={item._id.toString()}
              name={item.name}
              price={item.price}
              totalQuantity={item.quantity}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      {/* ── Cart Card ── */}
      <div className="card">
        <div className="card__header">
          <h2 className="card__title">🛒 Your Cart</h2>
        </div>
        <CartPanel
          isPurchasing={isPurchasing}
          cart={cart}
          budget={currentUser?.budget ?? 0}
          currency={currentUser?.currency ?? "USD"}
          onRemoveFromCart={onRemoveFromCart}
          onPurchase={handlePurchase}
          onLeave={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <div className="card__footer">
          {/* TODO: Add purchase button and total */}
        </div>
      </div>
    </div>
  );
}

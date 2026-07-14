import { useEffect, useState } from "react";
import type { CartItem } from "../interface/cart";
import type { MenuItemType } from "../interface/menuItem";
import type { CurrentUser } from "../interface/user";

export function useShoppingView(
  currentUser: CurrentUser | undefined,
  onLeaveShop: () => void
) {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("http://localhost:5001/api/menu", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setMenuItems(result);
    };
    fetchMenuItems();
  }, []);

  function handleIncrement(id: string) {
    const item = menuItems.find((m) => m._id === id);
    if (!item) return;

    const currentSelected = quantities[id] ?? 0;
    if (currentSelected >= item.quantity) return;

    setQuantities((prev) => ({
      ...prev,
      [id]: currentSelected + 1,
    }));
  }

  function handleDecrement(id: string) {
    const currentSelected = quantities[id] ?? 0;
    if (currentSelected <= 0) return;

    setQuantities((prev) => ({
      ...prev,
      [id]: currentSelected - 1,
    }));
  }

  function onAddToCart(
    id: string,
    name: string,
    price: number,
    quantity: number
  ) {
    if (quantity === 0) return;

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

    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }

  function onRemoveFromCart(id: string) {
    const cartItem = cart.find((item) => item._id === id);
    if (!cartItem) return;

    setCart((prev) => prev.filter((item) => item._id !== id));
    setQuantities((prev) => ({ ...prev, [id]: 0 }));
  }

  function getCartQuantity(id: string): number {
    return cart.find((item) => item._id === id)?.quantity ?? 0;
  }

  async function handlePurchase() {
    setIsPurchasing(true);
    try {
      const response = await fetch("http://localhost:5001/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });

      if (!response.ok) throw new Error("Purchase failed");

      setCart([]);
      setQuantities({});
      setShowThankYou(true);
    } catch (error) {
      console.error("Purchase error:", error);
    } finally {
      setIsPurchasing(false);
    }
  }

  async function handleLeave() {
    const sessionId = localStorage.getItem("user");

    try {
      await fetch("http://localhost:5001/api/dequeue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
    } catch (error) {
      console.error("Dequeue error:", error);
    }

    localStorage.removeItem("user");
    onLeaveShop();
  }

  return {
    menuItems,
    cart,
    quantities,
    isPurchasing,
    showThankYou,
    handleIncrement,
    handleDecrement,
    onAddToCart,
    onRemoveFromCart,
    handlePurchase,
    handleLeave,
    getCartQuantity,
  };
}
import { useState } from "react";
import "../styles/MenuItems.css";
import { formatBudget } from "../utils/convertCurrency";

interface MenuItemProps {
  _id: string;
  name: string;
  price: number;
  totalQuantity: number;
  currency: string;
  onAddToCart: (
    id: string,
    name: string,
    price: number,
    quantity: number
  ) => void;
}

export default function MenuItem({
  _id,
  name,
  price,
  totalQuantity,
  currency,
  onAddToCart,
}: MenuItemProps) {
  const isOutOfStock = totalQuantity === 0;
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const isDisabled = selectedQuantity === 0

  function handleAddToCart() {
    if (selectedQuantity === 0) return  
    
    onAddToCart(_id, name, price, selectedQuantity)
    
    setSelectedQuantity(0) 
}

  return (
    <div
      className={`menu-item ${isOutOfStock ? "menu-item--out-of-stock" : ""}`}
    >
      <div className="menu-item__info">
        <span className="menu-item__name">{name}</span>
        <span className="menu-item__price">{formatBudget(price, currency)}</span>
        </div>

      <span
        className={`menu-item__stock ${
          totalQuantity <= 5 ? "menu-item__stock--low" : ""
        }`}
      >
        {isOutOfStock ? "Out of stock" : `${totalQuantity} left`}
      </span>

      {!isOutOfStock && (
        <div className="menu-item__actions">
          <div className="quantity-selector">
            <button
              onClick={() => setSelectedQuantity((q: number) => Math.max(0, q - 1))}
              className="quantity-selector__btn"
            >
              −
            </button>
            <span className="quantity-selector__value">{selectedQuantity}</span>
            <button
              onClick={() =>
                setSelectedQuantity((q: number) => Math.min(totalQuantity, q + 1))
              }
              className="quantity-selector__btn"
            >
              +
            </button>
          </div>

          <button
            className="menu-item__add-btn"
            onClick={handleAddToCart}
            disabled={isDisabled}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

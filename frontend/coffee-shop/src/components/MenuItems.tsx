import "../styles/MenuItems.css";
import { formatBudget } from "../utils/convertCurrency";
import type { MenuItemProps } from "../interface/menuItem";

export default function MenuItem({
  _id,
  name,
  price,
  totalQuantity,
  currency,
  selectedQuantity,
  cartQuantity,
  onIncrement,
  onDecrement,
  onAddToCart,
}: MenuItemProps) {
  const isOutOfStock = totalQuantity === 0;
  const isDisabled = selectedQuantity === 0;
  const availableQuantity = totalQuantity - selectedQuantity - cartQuantity
  const allSelected = availableQuantity === 0;

  function handleAddToCart() {
    if (selectedQuantity === 0) return;
    onAddToCart(_id, name, price, selectedQuantity);
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
          availableQuantity <= 5 ? "menu-item__stock--low" : ""
        }`}
      >
        {isOutOfStock ? "Out of stock" : `${availableQuantity} left`}
      </span>

      {!isOutOfStock && (
        <div className="menu-item__actions">
          <div className="quantity-selector">
            <button
              onClick={() => onDecrement(_id)}
              className="quantity-selector__btn"
            >
              −
            </button>
            <span className="quantity-selector__value">{selectedQuantity}</span>
            <button
              onClick={() => onIncrement(_id)}
              disabled={allSelected}
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
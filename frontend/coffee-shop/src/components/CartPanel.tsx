import "../styles/CartPanel.css";
import "../styles/Button.css";
import { formatBudget } from "../utils/convertCurrency";
import type { CartPanelProps } from "../interface/cart";
import Button from "../common/Button";

export default function CartPanel({
  isPurchasing,
  budget,
  cart,
  currency,
  onRemoveFromCart,
  onPurchase,
  onLeave,
}: CartPanelProps) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isEmpty = cart.length === 0;
  const canAfford = total <= budget;
  return (
    <>
      <div className="cart__body">
        {isEmpty ? (
          <p className="cart__empty">Your cart is empty</p>
        ) : (
          <ul className="cart__list">
            {cart.map((item) => (
              <li key={item._id} className="cart-item">
                {/* Name and remove button */}
                <div className="cart-item__header">
                  <span className="cart-item__name">{item.name}</span>
                  <button
                    className="cart-item__remove"
                    onClick={() => onRemoveFromCart(item._id)}
                  >
                    ✕
                  </button>
                </div>

                <div className="cart-item__details">
                  <span className="cart-item__quantity">
                    {item.quantity}x @ {formatBudget(item.price, currency)}
                  </span>
                  <span
                    className={`cart__total-amount ${
                      !canAfford ? "cart__total-amount--over" : ""
                    }`}
                  >
                    {formatBudget(item.price * item.quantity, currency)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="cart__footer">
        {/* Total */}
        {!isEmpty && (
          <div className="cart__total-row">
            <span className="cart__total-label">Total</span>
            <span className="cart__total-amount">
              {formatBudget(total, currency)}
            </span>
          </div>
        )}

        <div className="cart__budget-row">
          <span className="cart__budget-label">Your Budget</span>
          <span className="cart__budget-amount">
            {formatBudget(budget, currency)}
          </span>
        </div>

        {!canAfford && !isEmpty && (
          <p className="cart__over-budget">⚠️ You're over budget</p>
        )}
        <Button
          label="Purchase"
          size="medium"
          onClick={onPurchase}
          isDisabled={isEmpty || !canAfford || isPurchasing}
          isLoading={isPurchasing}
        />

        <Button
          label="Leave without buying"
          onClick={onLeave}
          fullWidth={true}
          variant="ghost-danger"
          size="small"
        />
      </div>
    </>
  );
}

import "../styles/ShoppingView.css";
import MenuItem from "./MenuItems";
import CartPanel from "./CartPanel";
import ThankYouModal from "../modals/ThankYouModal";
import ConfirmLeaveModal from "../modals/ConfirmLeaveModal";
import { useShoppingView } from "../hooks/useShoppingView";
import type { ShoppingViewProps } from "../interface/shoppingView";

export default function ShoppingView({
  currentUser,
  onLeaveShop,
}: ShoppingViewProps) {
  const {
    menuItems,
    cart,
    quantities,
    isPurchasing,
    showThankYou,
    isLeaving,
    handleOpenConfirmLeavingModal,
    handleCloseConfirmLeavingModal,
    handleIncrement,
    handleDecrement,
    onAddToCart,
    onRemoveFromCart,
    handlePurchase,
    handleLeave,
    getCartQuantity,
  } = useShoppingView(currentUser, onLeaveShop);

  return (
    <>
      {showThankYou && <ThankYouModal onLeave={handleLeave} />}
      {isLeaving && <ConfirmLeaveModal onLeave={handleLeave} onCancel={handleCloseConfirmLeavingModal} />}
      
      <div className="shopping-view">
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">☕ Menu</h2>
          </div>
          <div className="card__body">
            {menuItems.map((item) => (
              <MenuItem
                key={item._id.toString()}
                _id={item._id.toString()}
                name={item.name}
                price={item.price}
                totalQuantity={item.quantity}
                currency={currentUser?.currency ?? "USD"}
                selectedQuantity={quantities[item._id] ?? 0}
                cartQuantity={getCartQuantity(item._id)}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h2 className="card__title">🛒 Your Cart</h2>
          </div>
          <CartPanel
            cart={cart}
            budget={currentUser?.budget ?? 0}
            currency={currentUser?.currency ?? "USD"}
            isPurchasing={isPurchasing}
            onRemoveFromCart={onRemoveFromCart}
            onPurchase={handlePurchase}
            onLeave={handleOpenConfirmLeavingModal}
          />
        </div>
      </div>
    </>
  );
}
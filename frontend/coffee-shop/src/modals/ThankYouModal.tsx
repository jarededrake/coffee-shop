import "../styles/ThankYouModal.css"

interface ThankYouModalProps {
  onLeave: () => void;
}

export default function ThankYouModal({ onLeave }: ThankYouModalProps) {
  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__icon">☕</div>
        <h2 className="modal__title">Thank you for shopping with us!</h2>
        <p className="modal__subtitle">We hope to see you again soon.</p>
        <button className="modal__btn" onClick={onLeave}>
          Leave Coffee Shop
        </button>
      </div>
    </div>
  );
}
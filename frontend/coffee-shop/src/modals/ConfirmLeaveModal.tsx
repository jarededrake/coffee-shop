import "../styles/ThankYouModal.css";
import Button from "../common/Button";

interface ConfirmLeaveModalProps {
  onLeave: () => void;
  onCancel: () => void;
}

export default function ConfirmLeaveModal({ onLeave, onCancel }: ConfirmLeaveModalProps) {
  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__icon">☕</div>
        <h2 className="modal__title">Are you sure you want to leave without buying?</h2>
        <h6 className="modal__subtitle">If you leave you will lose your place in line</h6>
        <div className="modal__buttons">
        <Button
          label="Exit Shop"
          onClick={onLeave}
          variant="primary"
          size="medium"
        />
        <Button
          label="Cancel"
          onClick={onCancel}
          variant="ghost-danger"
          size="medium"
        />
        </div>
      </div>
    </div>
  );
}

import "../styles/EntranceScreen.css"
import Button from "../common/Button";

interface EntranceScreenProps {
  onEnter: () => void;
  queueCount: number;
}

export default function EntranceScreen({ onEnter, queueCount }: EntranceScreenProps) {
  return (
    <div className="entrance">
      
      {/* ── Background blur circles for atmosphere ── */}
      <div className="entrance__glow entrance__glow--left" />
      <div className="entrance__glow entrance__glow--right" />

      {/* ── Content ── */}
      <div className="entrance__content">
        <div className="entrance__icon">☕</div>

        <div className="entrance__text">
          <h1 className="entrance__title">Caliola Café</h1>
          <p className="entrance__tagline">Where every sip is mission critical</p>
        </div>

        <div className="entrance__divider" />

        <p className="entrance__queue-info">
          {queueCount === 0
            ? "No one in line — walk right in!"
            : `${queueCount} ${queueCount === 1 ? "person" : "people"} ahead of you`}
        </p>

        <Button
          label="Enter Coffee Shop"
          onClick={onEnter}
          variant="primary"
          size="large"
        />

        <p className="entrance__hint">
          You'll be assigned a random budget in a surprise currency
        </p>
      </div>

    </div>
  );
}
import "../styles/EntranceScreen.css";
import Button from "../common/Button";
import type { EntranceScreenProps } from "../interface/entranceScreen";

export default function EntranceScreen({
  onEnter,
  queueCount,
  isAtFrontOfLine,
}: EntranceScreenProps) {
  return (
    <div className="entrance">
      <div className="entrance__glow entrance__glow--left" />
      <div className="entrance__glow entrance__glow--right" />

      <div className="entrance__content">
        <div className="entrance__icon">☕</div>

        <div className="entrance__text">
          <h1 className="entrance__title">Caliola Café</h1>
          <p className="entrance__tagline">
            Where every sip is mission critical
          </p>
        </div>

        <div className="entrance__divider" />

        <p className="entrance__queue-info">
          {isAtFrontOfLine
            ? "No one in line — walk right in!"
            : `${queueCount} ${
                queueCount === 1 ? "person" : "people"
              } ahead of you`}
        </p>

        <Button
          label={
            !isAtFrontOfLine ? "Please Wait To Enter" : "Enter Coffee Shop"
          }
          onClick={onEnter}
          variant="primary"
          size="large"
          isDisabled={!isAtFrontOfLine}
        />
      </div>
    </div>
  );
}

import "../styles/Button.css";
import type { ButtonProps } from "../interface/button";

export default function Button({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  isDisabled = false,
  isLoading = false,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`btn btn--${variant} btn--${size} ${
        fullWidth ? "btn--full" : ""
      }`}
    >
      {isLoading ? <span className="btn__spinner" /> : null}
      {label}
    </button>
  );
}

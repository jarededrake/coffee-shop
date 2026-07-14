export interface EntranceScreenProps {
  onEnter: () => void;
  queueCount: number;
  isAtFrontOfLine: boolean;
}

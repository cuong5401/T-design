import { useViewportScale } from "../../hooks/useViewportScale";
import "./KioskViewport.css";

export default function KioskViewport({ children }) {
  useViewportScale();

  return (
    <div className="kiosk-viewport">
      <div className="kiosk-viewport__scaler">{children}</div>
    </div>
  );
}

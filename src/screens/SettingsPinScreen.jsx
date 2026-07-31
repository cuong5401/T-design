import { useState } from "react";
import { adminAccessService } from "../services/adminAccessService";
import "./SettingsPinScreen.css";

const KEYPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"]
];

export default function SettingsPinScreen({ state, dispatch }) {
  const [checking, setChecking] = useState(false);

  const handleSubmit = async () => {
    if (state.settingsPin.length !== 4 || checking) {
      return;
    }

    setChecking(true);
    const isValid = await adminAccessService.validatePin(state.settingsPin);
    setChecking(false);
    dispatch({ type: isValid ? "SETTINGS_PIN_VALID" : "SETTINGS_PIN_INVALID" });
  };

  const handleDigit = (digit) => {
    dispatch({ type: "APPEND_SETTINGS_PIN_DIGIT", digit });
  };

  return (
    <div className="settings-pin">
      <h2 className="settings-pin__title">暗証番号を入力してください</h2>
      <div className="settings-pin__display" aria-label="PIN">
        {Array.from({ length: 4 }, (_, index) => (
          <span className="settings-pin__dot" key={index}>
            {index < state.settingsPin.length ? "●" : ""}
          </span>
        ))}
      </div>
      {state.settingsPinError && <div className="settings-pin__error">{state.settingsPinError}</div>}
      <div className="settings-pin__keypad">
        {KEYPAD_ROWS.flat().map((digit) => (
          <button className="settings-pin__key" type="button" key={digit} disabled={checking} onClick={() => handleDigit(digit)}>
            {digit}
          </button>
        ))}
        <button className="settings-pin__key settings-pin__key--delete" type="button" disabled={checking} onClick={() => dispatch({ type: "DELETE_SETTINGS_PIN_DIGIT" })}>
          削除
        </button>
        <button className="settings-pin__key" type="button" disabled={checking} onClick={() => handleDigit("0")}>
          0
        </button>
        <button className="settings-pin__key settings-pin__key--submit" type="button" disabled={state.settingsPin.length !== 4 || checking} onClick={handleSubmit}>
          {checking ? "確認中" : "確認"}
        </button>
      </div>
    </div>
  );
}

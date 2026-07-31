import { useState } from "react";
import { AdminMessage } from "../components/AdminShared";
import { settingsService } from "../services/adminServices";

const fields = [
  { id: "current", label: "現在の暗証番号" },
  { id: "next", label: "新しい暗証番号" },
  { id: "confirm", label: "新しい暗証番号（確認）" }
];

export default function PinChangeScreen() {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [active, setActive] = useState("current");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const canSubmit = values.current.length === 4 && values.next.length === 4 && values.confirm.length === 4 && values.next === values.confirm && values.next !== values.current;

  const addDigit = (digit) => {
    setValues((current) => ({ ...current, [active]: current[active].length < 4 ? `${current[active]}${digit}` : current[active] }));
    setError("");
  };

  const submit = async () => {
    if (values.next !== values.confirm) {
      setError("新しい暗証番号が一致しません。");
      return;
    }

    const result = await settingsService.changePin(values.current, values.next);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setValues({ current: "", next: "", confirm: "" });
    setMessage(result.message);
    setError("");
  };

  return (
    <div className="admin-page admin-pin-change">
      <AdminMessage type="success">{message}</AdminMessage>
      <AdminMessage type="error">{error}</AdminMessage>
      <div className="admin-pin-fields">
        {fields.map((field) => (
          <button className={`admin-pin-field${active === field.id ? " active" : ""}`} type="button" key={field.id} onClick={() => setActive(field.id)}>
            <span>{field.label}</span>
            <strong>{"●".repeat(values[field.id].length).padEnd(4, "□")}</strong>
          </button>
        ))}
      </div>
      <div className="admin-keypad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
          <button type="button" key={digit} onClick={() => addDigit(digit)}>{digit}</button>
        ))}
        <button className="admin-button--warning" type="button" onClick={() => setValues((current) => ({ ...current, [active]: current[active].slice(0, -1) }))}>削除</button>
        <button type="button" onClick={() => addDigit("0")}>0</button>
        <button className="admin-button--subtle" type="button" onClick={() => setValues({ current: "", next: "", confirm: "" })}>全消去</button>
      </div>
      <div className="admin-actions">
        <button className="admin-button admin-button--subtle" type="button" onClick={() => setValues({ current: "", next: "", confirm: "" })}>変更を破棄</button>
        <button className="admin-button admin-button--primary" type="button" disabled={!canSubmit} onClick={submit}>暗証番号を変更</button>
      </div>
    </div>
  );
}

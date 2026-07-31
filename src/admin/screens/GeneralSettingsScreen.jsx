import { useEffect, useState } from "react";
import { AdminMessage } from "../components/AdminShared";
import { settingsService } from "../services/adminServices";

function NumberControl({ label, value, unit, min, max, step, onChange }) {
  const change = (nextValue) => onChange(Math.min(max, Math.max(min, Number(nextValue) || 0)));
  return (
    <label className="admin-number">
      <span>{label}</span>
      <button type="button" onClick={() => change(value - step)}>-</button>
      <input value={value} inputMode="numeric" onChange={(event) => change(event.target.value)} />
      <button type="button" onClick={() => change(value + step)}>+</button>
      <em>{unit}</em>
    </label>
  );
}

export default function GeneralSettingsScreen() {
  const [tab, setTab] = useState("card");
  const [settings, setSettings] = useState(null);
  const [limits, setLimits] = useState(null);
  const [message, setMessage] = useState("");
  const [cardState, setCardState] = useState("未開始");
  const [readCardId, setReadCardId] = useState("");

  useEffect(() => {
    settingsService.getSettings().then(({ settings: nextSettings, limits: nextLimits }) => {
      setSettings(nextSettings);
      setLimits(nextLimits);
    });
  }, []);

  if (!settings || !limits) {
    return <div className="admin-page">読込中です。</div>;
  }

  const saveOperation = async () => {
    const saved = await settingsService.saveOperationSettings(settings.operation);
    setSettings({ ...settings, operation: saved });
    setMessage("運用設定を保存しました。");
  };

  const saveCommunication = async () => {
    const saved = await settingsService.saveCommunicationSettings(settings.communication);
    setSettings({ ...settings, communication: saved });
    setMessage("通信設定を保存しました。");
  };

  const readCard = async () => {
    setCardState("読取中");
    const cardId = await settingsService.readCardIdMock();
    setReadCardId(cardId);
    setCardState("確認待ち");
  };

  const confirmCard = async () => {
    const cardId = await settingsService.setCardId(readCardId);
    setSettings({ ...settings, cardId });
    setCardState("設定完了");
    setMessage("カードIDを設定しました。");
  };

  const retryError = settings.communication.retryCount < limits.retryCount.min || settings.communication.retryCount > limits.retryCount.max;
  const waitError = settings.communication.responseWaitMs < limits.responseWaitMs.min || settings.communication.responseWaitMs > limits.responseWaitMs.max;

  return (
    <div className="admin-page">
      <div className="admin-tabs">
        <button className={tab === "card" ? "active" : ""} type="button" onClick={() => setTab("card")}>カードID設定</button>
        <button className={tab === "operation" ? "active" : ""} type="button" onClick={() => setTab("operation")}>運用設定</button>
        <button className={tab === "communication" ? "active" : ""} type="button" onClick={() => setTab("communication")}>通信設定</button>
      </div>
      <AdminMessage type="success">{message}</AdminMessage>

      {tab === "card" && (
        <div className="admin-panel">
          <div className="admin-field-grid">
            <span>現在のカードID</span><strong>{settings.cardId.value}</strong>
            <span>最終更新日時</span><strong>{settings.cardId.updatedAt}</strong>
            <span>リーダー状態</span><strong>{cardState}</strong>
            <span>読取カード</span><strong>{readCardId || "-"}</strong>
          </div>
          <div className="admin-actions">
            <button className="admin-button admin-button--primary" type="button" onClick={() => setCardState("カード待ち")}>カードIDを設定する</button>
            <button className="admin-button admin-button--subtle" type="button" onClick={readCard}>カード挿入</button>
            <button className="admin-button admin-button--warning" type="button" onClick={() => setCardState("読取エラー")}>読取エラー</button>
            <button className="admin-button admin-button--primary" type="button" disabled={!readCardId || cardState !== "確認待ち"} onClick={confirmCard}>このカードIDを設定</button>
          </div>
        </div>
      )}

      {tab === "operation" && (
        <div className="admin-panel">
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={settings.operation.humanSensorEnabled}
              onChange={(event) => setSettings({ ...settings, operation: { ...settings.operation, humanSensorEnabled: event.target.checked } })}
            />
            人感センサー
          </label>
          <NumberControl label="起動待機時間" value={settings.operation.startupWaitSeconds} unit="秒" {...limits.waitSeconds} onChange={(value) => setSettings({ ...settings, operation: { ...settings.operation, startupWaitSeconds: value } })} />
          <NumberControl label="画面待機時間" value={settings.operation.screenWaitSeconds} unit="秒" {...limits.waitSeconds} onChange={(value) => setSettings({ ...settings, operation: { ...settings.operation, screenWaitSeconds: value } })} />
          <NumberControl label="注意喚起画面待機時間" value={settings.operation.cautionWaitSeconds} unit="秒" {...limits.waitSeconds} onChange={(value) => setSettings({ ...settings, operation: { ...settings.operation, cautionWaitSeconds: value } })} />
          <NumberControl label="精算待機時間" value={settings.operation.settlementWaitSeconds} unit="秒" {...limits.waitSeconds} onChange={(value) => setSettings({ ...settings, operation: { ...settings.operation, settlementWaitSeconds: value } })} />
          <div className="admin-actions">
            <button className="admin-button admin-button--subtle" type="button" onClick={() => settingsService.getSettings().then(({ settings: next }) => setSettings(next))}>変更を破棄</button>
            <button className="admin-button admin-button--primary" type="button" onClick={saveOperation}>設定を保存</button>
          </div>
        </div>
      )}

      {tab === "communication" && (
        <div className="admin-panel">
          <NumberControl label="リトライ回数" value={settings.communication.retryCount} unit="回" {...limits.retryCount} onChange={(value) => setSettings({ ...settings, communication: { ...settings.communication, retryCount: value } })} />
          <NumberControl label="応答待ち時間" value={settings.communication.responseWaitMs} unit="ms" {...limits.responseWaitMs} onChange={(value) => setSettings({ ...settings, communication: { ...settings.communication, responseWaitMs: value } })} />
          <AdminMessage type="error">{retryError || waitError ? "入力値が設定範囲外です。" : ""}</AdminMessage>
          <div className="admin-actions">
            <button className="admin-button admin-button--subtle" type="button" onClick={() => settingsService.getSettings().then(({ settings: next }) => setSettings(next))}>変更を破棄</button>
            <button className="admin-button admin-button--primary" type="button" disabled={retryError || waitError} onClick={saveCommunication}>設定を保存</button>
          </div>
        </div>
      )}
    </div>
  );
}

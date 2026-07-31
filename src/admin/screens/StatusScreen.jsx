import { useEffect, useState } from "react";
import { AdminDataTable, AdminModal, AdminMessage } from "../components/AdminShared";
import { createNowText, machineStatusService, settingsService } from "../services/adminServices";

export default function StatusScreen() {
  const [settings, setSettings] = useState(null);
  const [rows, setRows] = useState([]);
  const [machineNumber, setMachineNumber] = useState(1);
  const [timeModal, setTimeModal] = useState(false);
  const now = new Date();
  const [timeParts, setTimeParts] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes()
  });
  const [message, setMessage] = useState("");

  const load = () => {
    settingsService.getSettings().then(({ settings: next }) => setSettings(next));
    machineStatusService.getRows().then(setRows);
  };

  useEffect(load, []);

  const selected = rows.find((row) => row.machineNumber === Number(machineNumber));

  const setScenario = async (scenario) => {
    const nextRows = await machineStatusService.setScenario(machineNumber, scenario);
    setRows(nextRows);
    setMessage("機器状態を変更しました。");
  };

  const changeTime = async () => {
    const nextSystem = await settingsService.changeSystemTime(timeParts);
    setSettings({ ...settings, system: nextSystem });
    setTimeModal(false);
    setMessage("PC時刻を変更しました。");
  };

  if (!settings) return <div className="admin-page">読込中です。</div>;

  return (
    <div className="admin-page">
      <AdminMessage type="success">{message}</AdminMessage>
      <div className="admin-summary">
        <div><span>マイコンソフトバージョン</span><strong>{settings.system.mcuVersion}</strong><small>現在値</small></div>
        <div><span>PCアプリソフトバージョン</span><strong>{settings.system.pcAppVersion}</strong><small>現在値</small></div>
        <div><span>PCの現在時刻</span><strong>{settings.system.mockPcTime || createNowText()}</strong><small>{settings.system.timeSyncStatus}</small></div>
      </div>
      <div className="admin-actions">
        <button className="admin-button admin-button--primary" type="button" onClick={() => setTimeModal(true)}>PC時刻を変更</button>
        <span className="admin-note">時刻同期状態を確認してから変更してください。</span>
      </div>
      <div className="admin-filter">
        <label>
          機械番号
          <select value={machineNumber} onChange={(event) => setMachineNumber(Number(event.target.value))}>
            {rows.map((row) => <option value={row.machineNumber} key={row.machineNumber}>{row.machineNumber}号機</option>)}
          </select>
        </label>
        <button className="admin-button admin-button--subtle" type="button" onClick={() => setScenario("normal")}>正常状態</button>
        <button className="admin-button admin-button--subtle" type="button" onClick={() => setScenario("running")}>運転中</button>
        <button className="admin-button admin-button--warning" type="button" onClick={() => setScenario("communication")}>通信エラー</button>
        <button className="admin-button admin-button--danger" type="button" onClick={() => setScenario("machineError")}>機器エラー</button>
      </div>
      {selected && (
        <AdminDataTable
          columns={[
            { key: "machineNumber", label: "機械番号" },
            { key: "type", label: "機器種類" },
            { key: "connection", label: "接続" },
            { key: "operation", label: "運転状態" },
            { key: "remainingMinutes", label: "残り時間", render: (row) => `${row.remainingMinutes}分` },
            { key: "errorStatus", label: "エラー状態", render: (row) => `${row.errorStatus === "正常" ? "正常" : "注意"} ${row.errorStatus}` },
            { key: "errorCode", label: "エラーコード" },
            { key: "lastCommunicationAt", label: "最終通信日時" }
          ]}
          rows={[selected]}
          getRowKey={(row) => row.machineNumber}
        />
      )}
      {timeModal && (
        <AdminModal title="PC時刻を変更" onCancel={() => setTimeModal(false)} onConfirm={changeTime} confirmText="変更">
          <div className="admin-time-grid">
            {[
              ["year", "年"],
              ["month", "月"],
              ["day", "日"],
              ["hour", "時"],
              ["minute", "分"]
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input inputMode="numeric" value={timeParts[key]} onChange={(event) => setTimeParts({ ...timeParts, [key]: Number(event.target.value) || 0 })} />
              </label>
            ))}
          </div>
        </AdminModal>
      )}
    </div>
  );
}

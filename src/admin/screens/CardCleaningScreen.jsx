import { useRef, useState } from "react";
import { AdminMessage } from "../components/AdminShared";
import { cardCleaningService } from "../services/adminServices";

export default function CardCleaningScreen() {
  const [status, setStatus] = useState("待機中");
  const [cycle, setCycle] = useState(0);
  const [message, setMessage] = useState("");
  const stoppedRef = useRef(false);
  const busy = status === "清掃中" || status === "清掃カード待ち" || status === "カード排出中";

  const start = () => {
    setStatus("清掃カード待ち");
    setCycle(0);
    setMessage("清掃カードを挿入してください。");
  };

  const insertCard = async () => {
    stoppedRef.current = false;
    setStatus("清掃中");
    setMessage("");
    for (let index = 1; index <= 8; index += 1) {
      if (stoppedRef.current) return;
      const next = await cardCleaningService.waitCycle(index);
      setCycle(next.cycle);
    }
    setStatus("カード排出中");
    await cardCleaningService.waitCycle(8);
    setStatus("完了");
    setMessage("カード清掃が完了しました。");
  };

  const setError = (nextStatus) => {
    stoppedRef.current = true;
    setStatus(nextStatus);
    setMessage(`${nextStatus}が発生しました。`);
  };

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <h3>カード清掃</h3>
        <p>清掃カードを使用してカードリーダー内部を清掃します。</p>
        <div className="admin-field-grid">
          <span>状態</span><strong>{status}</strong>
          <span>進捗</span><strong>クリーニング中 {cycle} / 8</strong>
        </div>
        <div className="admin-progress"><span style={{ width: `${(cycle / 8) * 100}%` }} /></div>
        <AdminMessage type={status.includes("エラー") || status.includes("詰まり") ? "error" : "success"}>{message}</AdminMessage>
        <div className="admin-actions">
          <button className="admin-button admin-button--primary" type="button" disabled={busy} onClick={start}>カード清掃を開始</button>
          <button className="admin-button admin-button--subtle" type="button" disabled={status !== "清掃カード待ち"} onClick={insertCard}>清掃カード挿入</button>
          <button className="admin-button admin-button--warning" type="button" disabled={!busy} onClick={() => setError("カード詰まり")}>カード詰まり</button>
          <button className="admin-button admin-button--danger" type="button" disabled={!busy} onClick={() => setError("読取エラー")}>読取エラー</button>
        </div>
      </div>
    </div>
  );
}

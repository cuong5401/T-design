import { useState } from "react";
import { AdminModal, AdminMessage } from "../components/AdminShared";
import { settingsService } from "../services/adminServices";

export default function InitializeScreen() {
  const [confirming, setConfirming] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const initialize = async () => {
    setProcessing(true);
    setMessage("初期化しています...");
    await settingsService.initializeAllMockData();
    setProcessing(false);
    setConfirming(false);
    setMessage("初期化が完了しました。");
  };

  return (
    <div className="admin-page">
      <AdminMessage type="success">{message}</AdminMessage>
      <div className="admin-warning-panel">
        <h3>この操作は元に戻せません。</h3>
        <p>以下のデータを初期状態に戻します。</p>
        <ul>
          <li>Card ID</li>
          <li>人感センサー設定</li>
          <li>待機時間設定</li>
          <li>通信設定</li>
          <li>回収金額データ</li>
          <li>ランドリー機データ</li>
          <li>コースデータ</li>
          <li>管理者PINと設定情報</li>
        </ul>
        <button className="admin-button admin-button--danger" type="button" disabled={processing} onClick={() => setConfirming(true)}>
          全データを初期化
        </button>
      </div>
      {confirming && (
        <AdminModal title="全データを初期化しますか？" onCancel={() => setConfirming(false)} onConfirm={initialize} confirmText="はい、初期化します" danger disabled={processing}>
          <p>設定データを初期状態に戻します。</p>
          <strong>この操作は元に戻せません。</strong>
        </AdminModal>
      )}
    </div>
  );
}

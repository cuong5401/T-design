import BaseModal from "./BaseModal";

export default function StopConfirmModal({ machineNumber, onBack, onConfirm }) {
  return (
    <BaseModal
      title="運転を停止しますか？"
      machineNumber={machineNumber}
      subtitle="この機械の運転状態と残り時間を削除します。"
      confirmLabel="停止する"
      danger
      onBack={onBack}
      onConfirm={onConfirm}
    />
  );
}

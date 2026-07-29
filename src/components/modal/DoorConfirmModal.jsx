import BaseModal from "./BaseModal";

export default function DoorConfirmModal({ machineNumber, onBack, onConfirm }) {
  return (
    <BaseModal
      title="ドアが開いています"
      machineNumber={machineNumber}
      subtitle="ドアを閉じてください"
      confirmLabel="閉じました"
      onBack={onBack}
      onConfirm={onConfirm}
    />
  );
}

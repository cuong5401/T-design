import BaseModal from "./BaseModal";

export default function MachineConfirmModal({ machineNumber, action, isBusy, onBack, onConfirm }) {
  let title = "機械番号を確認してください。";

  if (action === "stop") {
    title = "停止する機械番号を確認してください。";
  } else if (isBusy) {
    title = "延長する機械番号を確認してください。";
  }

  return (
    <BaseModal
      title={title}
      machineNumber={machineNumber}
      subtitle="選択した機械が点滅していますか？"
      confirmLabel="確認しました"
      onBack={onBack}
      onConfirm={onConfirm}
    />
  );
}

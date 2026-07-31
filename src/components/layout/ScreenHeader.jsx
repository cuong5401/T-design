import "./ScreenHeader.css";
import { isMachineScreen } from "../../data/machines";

function getTitle(screen, isExtension) {
  if (screen === "payment") {
    return "お支払い";
  }

  if (screen === "complete") {
    return "運転開始";
  }

  if (screen === "settings-pin") {
    return "設定PINを入力してください";
  }

  if (screen === "settings") {
    return "設定モード";
  }

  if (screen === "course" || screen === "plan") {
    return isExtension ? "延長時間を選択してください" : "コースを選択してください";
  }

  return "洗濯物を入れた機械番号を選択してください";
}

export default function ScreenHeader({ screen, selectedMachine, isExtension }) {
  const title = getTitle(screen, isExtension);

  if (isMachineScreen(screen) || screen === "settings-pin" || screen === "settings") {
    return <div className="screen-header__title">{title}</div>;
  }

  return (
    <div className="screen-header__course">
      <div className="screen-header__badge">
        <div className="screen-header__badge-label">機械番号</div>
        <div className="screen-header__badge-number">{selectedMachine || "-"}</div>
      </div>
      <div className="screen-header__course-title">{title}</div>
    </div>
  );
}

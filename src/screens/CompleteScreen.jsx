import "./CompleteScreen.css";

export default function CompleteScreen({ state }) {
  const isFailed = state.completeMode === "failed";

  return (
    <div className={`complete-screen${isFailed ? " complete-screen--failed" : ""}`}>
      <div className="complete-screen__title">{isFailed ? "お支払いに失敗しました。" : "お支払い完了です。"}</div>
      <div className="complete-screen__thanks">{isFailed ? "もう一度お試しください。" : "ご利用ありがとうございます。"}</div>
    </div>
  );
}

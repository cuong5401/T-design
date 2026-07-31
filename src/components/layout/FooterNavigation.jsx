import "./FooterNavigation.css";

export default function FooterNavigation({ disabled, onBack, onCancel, showCancel = true }) {
  return (
    <footer className="footer-navigation">
      {showCancel && (
        <button
          className="footer-navigation__button footer-navigation__button--cancel"
          type="button"
          disabled={disabled}
          onClick={onCancel}
        >
          中止
        </button>
      )}
      <button className="footer-navigation__button footer-navigation__button--back" type="button" disabled={disabled} onClick={onBack}>
        戻る
      </button>
    </footer>
  );
}

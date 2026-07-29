import "./FooterNavigation.css";

export default function FooterNavigation({ disabled, onBack, onCancel }) {
  return (
    <footer className="footer-navigation">
      <button className="footer-navigation__button" type="button" disabled={disabled} onClick={onBack}>
        戻る
      </button>
      <button
        className="footer-navigation__button footer-navigation__button--cancel"
        type="button"
        disabled={disabled}
        onClick={onCancel}
      >
        中止
      </button>
    </footer>
  );
}

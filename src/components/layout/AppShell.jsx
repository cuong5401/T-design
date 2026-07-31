import ProgressHeader from "./ProgressHeader";
import ScreenHeader from "./ScreenHeader";
import FooterNavigation from "./FooterNavigation";
import "./AppShell.css";

export default function AppShell({
  clockText,
  progressStep,
  screen,
  selectedMachine,
  isExtension,
  contentMode,
  showFooter = true,
  showFooterCancel = true,
  footerDisabled,
  hideProgress = false,
  onBack,
  onCancel,
  onStepOneLongPress,
  children
}) {
  return (
    <div className="app-shell">
      {!hideProgress && (
        <ProgressHeader
          clockText={clockText}
          currentStep={progressStep}
          storeName="ランドリー和田野店"
          onStepOneLongPress={onStepOneLongPress}
        />
      )}
      <ScreenHeader screen={screen} selectedMachine={selectedMachine} isExtension={isExtension} />
      <main className={`app-shell__content app-shell__content--${contentMode}`}>{children}</main>
      {showFooter && (
        <FooterNavigation
          disabled={footerDisabled}
          showCancel={showFooterCancel}
          onBack={onBack}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

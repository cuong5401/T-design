import { AdminMenu, AdminPageLayout } from "../admin/components/AdminShared";
import CardCleaningScreen from "../admin/screens/CardCleaningScreen";
import CourseNameScreen from "../admin/screens/CourseNameScreen";
import GeneralSettingsScreen from "../admin/screens/GeneralSettingsScreen";
import InitializeScreen from "../admin/screens/InitializeScreen";
import PinChangeScreen from "../admin/screens/PinChangeScreen";
import RevenueScreen from "../admin/screens/RevenueScreen";
import StatusScreen from "../admin/screens/StatusScreen";
import "./SettingsModeScreen.css";

function CurrentSettingsPage({ page }) {
  if (page === "revenue") return <RevenueScreen />;
  if (page === "status") return <StatusScreen />;
  if (page === "course-names") return <CourseNameScreen />;
  if (page === "general") return <GeneralSettingsScreen />;
  if (page === "pin-change") return <PinChangeScreen />;
  if (page === "card-cleaning") return <CardCleaningScreen />;
  if (page === "initialize") return <InitializeScreen />;
  return null;
}

export default function SettingsModeScreen({ state, dispatch }) {
  const openPage = (page) => dispatch({ type: "OPEN_SETTINGS_PAGE", page });

  if (!state.settingsPage) {
    return <AdminMenu onOpen={openPage} />;
  }

  return (
    <AdminPageLayout activePage={state.settingsPage}>
      <CurrentSettingsPage page={state.settingsPage} />
    </AdminPageLayout>
  );
}

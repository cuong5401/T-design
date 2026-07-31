import { mockConfig } from "./mockConfig";
import { mockDelay } from "./mockDelay";
import { settingsService } from "../admin/services/adminServices";

export const adminAccessService = {
  canEnterSettings() {
    return mockDelay(Boolean(mockConfig.adminCanEnterSettings));
  },

  validatePin(pin) {
    return settingsService.validatePin(pin);
  }
};

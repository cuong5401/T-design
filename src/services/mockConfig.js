export const mockConfig = {
  adminCanEnterSettings: true,
  settingsPin: "1234",
  usbMemoryAvailable: true,
  cardId: "MOCK-CARD-0001",
  cardCleaningRequired: false,
  physicalSwitchOn: true,
  softwareVersion: "1.0.0-test",
  systemClockChangeAllowed: true,
  waitSettings: {
    idleReturnSeconds: 30,
    paymentTimeoutSeconds: 60
  },
  communicationSettings: {
    retryCount: 3,
    retryIntervalMs: 500
  }
};

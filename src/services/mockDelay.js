export function mockDelay(value, delayMs = 250) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), delayMs);
  });
}

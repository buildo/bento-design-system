export function ignoreWarnings(regex: RegExp, body: () => void) {
  const originalWarn = console.warn;
  console.warn = jest.fn((...args: any[]) => {
    if (!regex.test(args[0])) {
      originalWarn(...args);
    }
  });
  body();
  console.warn = originalWarn;
}

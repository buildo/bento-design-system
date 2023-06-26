export async function ignoreWarnings<A>(regex: RegExp, body: () => Promise<A>): Promise<A> {
  const originalWarn = console.warn;
  console.warn = vi.fn((...args: any[]) => {
    if (!regex.test(args[0])) {
      originalWarn(...args);
    }
  });
  const result = await body();
  console.warn = originalWarn;
  return result;
}

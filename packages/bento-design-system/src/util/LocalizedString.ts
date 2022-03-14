/**
 * A string that has been localized
 */
export type LocalizedString = string & {
  readonly LocalizedString: "LocalizedString";
};

export function unsafeLocalizedString(n: number | string): LocalizedString {
  return String(n) as any;
}

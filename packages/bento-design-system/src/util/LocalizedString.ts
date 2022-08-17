import { LocalizedString } from "./ConfigurableTypes";

export type { LocalizedString };

export type StrictLocalizedString = string & { readonly LocalizedString: "LocalizedString" };

export function unsafeLocalizedString(n: number | string): LocalizedString {
  return String(n) as any;
}

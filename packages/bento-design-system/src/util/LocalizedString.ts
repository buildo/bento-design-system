import { ConfiguredTypes } from "./ConfigurableTypes";

// We set a (string | number) "baseline" so that a user can only refine `string | number` and not
// provide a completely unrelated type (which would break at runtime, since we perform string
// operations on it).
export type LocalizedString = (string | number) & ConfiguredTypes["LocalizedString"];

export type StrictLocalizedString = string & { readonly LocalizedString: "LocalizedString" };

export function unsafeLocalizedString(n: number | string): LocalizedString {
  return String(n) as any;
}

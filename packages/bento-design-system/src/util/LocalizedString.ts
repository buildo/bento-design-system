interface ConfigurableTypes {
  LocalizedString: string;
}

export interface TypeOverrides {}

type ResolvedTypes = Omit<ConfigurableTypes, keyof TypeOverrides> & TypeOverrides;

export type LocalizedString = ResolvedTypes["LocalizedString"];

export function unsafeLocalizedString(n: number | string): LocalizedString {
  return String(n) as any;
}

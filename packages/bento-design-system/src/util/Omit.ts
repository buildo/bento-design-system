// Better version of Omit which preserves discriminated unions
// See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/49783
export type Omit<T, K> = string | number extends keyof T
  ? T // T has indexed type e.g. { _id: string; [k: string]: any; } or it is "any"
  : T extends any
  ? Pick<T, Exclude<keyof T, K>> // discriminated unions
  : never;

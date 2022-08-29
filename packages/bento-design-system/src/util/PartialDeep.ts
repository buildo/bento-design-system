export type PartialDeep<O extends Record<string, unknown>> = {
  [K in keyof O]+?: O[K] extends Record<string, unknown> ? PartialDeep<O[K]> : O[K];
};

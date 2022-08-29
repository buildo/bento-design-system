// Inlined from https://github.com/millsp/ts-toolbelt
// Re-distributed under the Apache License 2.0 (see: https://github.com/millsp/ts-toolbelt/blob/master/LICENSE)

export declare type OptionalFlat<O> = {
  [K in keyof O]?: O[K];
} & {};

export declare type RequiredFlat<O> = {
  [K in keyof O]-?: O[K];
} & {};

export declare type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
  ? 0
  : A1 extends A2
  ? 1
  : 0;

declare type RequiredIfKeys<O extends object, K extends string> = Extends<keyof O & K, K> extends 1
  ? RequiredFlat<O>
  : O;
/**
 * @hidden
 */
declare type __AtLeast<O extends object, K extends string> = K extends keyof O
  ? Pick<O, K> & OptionalFlat<O>
  : O;

export declare type ComputeRaw<A extends any> = A extends Function
  ? A
  : {
      [K in keyof A]: A[K];
    } & unknown;

/**
 * @hidden
 */
declare type _AtLeast<O extends object, K extends string> = ComputeRaw<
  __AtLeast<RequiredIfKeys<O, K>, K>
>;

/**
 * Make that at least one of the keys `K` are required in `O` at a time.
 * @param O to make required
 * @param K (?=`keyof O`) to choose fields
 * @returns [[Object]] [[Union]]
 * @example
 * ```ts
 * ```
 */
export declare type AtLeast<
  O extends object,
  K extends string = keyof O & string
> = O extends unknown ? _AtLeast<O, K> : never;

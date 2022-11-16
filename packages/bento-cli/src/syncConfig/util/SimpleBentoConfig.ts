import { BentoConfig } from "@buildo/bento-design-system";

type Widen<A> = A extends number ? number : A extends string ? string : A;

type SimpleValue<A> = Widen<
  Exclude<
    A,
    {
      wide?: number | string;
      desktop?: number | string;
      tablet?: number | string;
      mobile?: number | string;
    }
  >
>;

type SimpleConfig<C> = {
  [k in keyof C]: C[k] extends Record<string, unknown> ? SimpleConfig<C[k]> : SimpleValue<C[k]>;
};

// A simplified version of BentoConfig which requires number | string values instead of ResponsiveValue with literal type
export type SimpleBentoConfig = SimpleConfig<BentoConfig>;

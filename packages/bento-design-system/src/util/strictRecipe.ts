import { recipe } from "@vanilla-extract/recipes";

type VariantGroups = NonNullable<Parameters<typeof recipe>[0]["variants"]>;
type PatternOptions<Variants extends VariantGroups> = Parameters<typeof recipe<Variants>>[0];

declare type BooleanMap<T> = T extends "true" | "false" ? boolean : T;

type VariantSelection<Variants extends VariantGroups> = {
  [VariantGroup in keyof Variants]: BooleanMap<keyof Variants[VariantGroup]>;
};

type RuntimeFn<Variants extends VariantGroups> = (options: VariantSelection<Variants>) => string;

/** A stricter version of 'recipe' in which all parameters are required */
export function strictRecipe<Variants extends VariantGroups>(
  options: PatternOptions<Variants>,
  debugId?: string
): RuntimeFn<Variants> {
  return recipe(options, debugId);
}

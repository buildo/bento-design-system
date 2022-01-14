import { recipe } from "@vanilla-extract/recipes";
import {
  PatternOptions,
  VariantGroups,
} from "@vanilla-extract/recipes/dist/declarations/src/types";

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

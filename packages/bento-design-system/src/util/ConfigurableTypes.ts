import { bentoSprinkles } from "../internal/sprinkles.css";
import { Overwrite } from "./Overwrite";

interface ConfigurableTypes {
  LocalizedString: string;
  SprinklesFn: typeof bentoSprinkles;
  ChipCustomColors: never;
  PaginationItemsPerPage: 10 | 25 | 50 | 100;
}

/**
 * This interface is meant to be extended by clients via module augmentation and declaration merging,
 * so that they can override the default types defined by us.
 */
export interface TypeOverrides {}

export type ConfiguredTypes = Overwrite<ConfigurableTypes, TypeOverrides>;

// NOTE(gabro): We export the configured types below by intersecting them first with a "baseline" type,
// which effectively acts as a type constraint.
// This is to avoid users to set a completely unrelated type, which would break at runtime.
// E.g. LocalizedString must be at least a string, since we perform string operations on it internally.
// provide a completely unrelated type (which would break at runtime, since we perform string operations on it).

export type LocalizedString = string & ConfiguredTypes["LocalizedString"];

export type SprinklesFn = typeof bentoSprinkles & ConfiguredTypes["SprinklesFn"];

export type ChipCustomColors = string & ConfiguredTypes["ChipCustomColors"];

export type PaginationItemsPerPage = number & ConfiguredTypes["PaginationItemsPerPage"];

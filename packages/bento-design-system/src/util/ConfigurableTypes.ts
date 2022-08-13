import { bentoSprinkles } from "../internal/sprinkles.css";
import { Object } from "ts-toolbelt";

interface ConfigurableTypes {
  LocalizedString: string;
  SprinklesFn: typeof bentoSprinkles
}

/**
 * This interface is meant to be extended by clients via module augmentation and declaration merging,
 * so that they can override the default types defined by us.
 */
export interface TypeOverrides {}

export type ConfiguredTypes = Object.Overwrite<ConfigurableTypes, TypeOverrides>;

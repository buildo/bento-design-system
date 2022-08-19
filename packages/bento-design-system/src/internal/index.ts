// NOTE(gabro): don't import from ".." in this file, or it will cause a circular dependency
import { SprinklesFn } from "../util/ConfigurableTypes";

export { bentoSprinkles } from "./sprinkles.css";
export type BentoSprinkles = Parameters<SprinklesFn>[0];
export type ResponsiveSpace = BentoSprinkles["gap"];

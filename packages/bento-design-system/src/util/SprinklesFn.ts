import { bentoSprinkles } from "../internal/sprinkles.css";
import { ConfiguredTypes } from "./ConfigurableTypes";

export type SprinklesFn = typeof bentoSprinkles & ConfiguredTypes['SprinklesFn']

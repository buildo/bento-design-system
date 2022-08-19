import { createContext, useContext } from "react";
import { bentoSprinkles } from "./internal";
import { SprinklesFn } from "./util/ConfigurableTypes";

export const SprinklesContext = createContext<SprinklesFn>(bentoSprinkles);

export function useSprinkles() {
  return useContext(SprinklesContext);
}

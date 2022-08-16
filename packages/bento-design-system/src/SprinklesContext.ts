import { createContext, useContext } from "react";
import { bentoSprinkles } from "./internal";
import { SprinklesFn } from "./util/SprinklesFn";

export const SprinklesContext = createContext<SprinklesFn>(bentoSprinkles);

export function useSprinkles() {
  return useContext(SprinklesContext);
}

import { BoxProps, createBentoBox } from "..";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { BodyConfig, createBody } from "./createBody";

export function createTextComponents<AtomsFn extends typeof bentoSprinkles>(
  sprinkles: AtomsFn,
  fontFamily: BoxProps<AtomsFn>["fontFamily"],
  bodyConfig: BodyConfig<AtomsFn>
) {
  const Box = createBentoBox(sprinkles);

  const Body = createBody(Box, fontFamily, bodyConfig);

  return { Body };
}

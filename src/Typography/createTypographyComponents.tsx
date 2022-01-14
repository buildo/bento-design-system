import { createBentoBox } from "..";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { BodyConfig, createBody } from "./createBody";

export function createTypographyComponents<AtomsFn extends typeof bentoSprinkles>(
  sprinkles: AtomsFn,
  bodyConfig: BodyConfig<AtomsFn>
) {
  const Box = createBentoBox(sprinkles);

  const Body = createBody(Box, bodyConfig);

  return { Body };
}

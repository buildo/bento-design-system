import { createBentoBox } from "..";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { BodyConfig, createBody } from "./Body/createBody";
import { createDisplay, DisplayConfig } from "./Display/createDisplay";
import { createHeadline, HeadlineConfig } from "./Headline/createHeadline";
import { createLabel, LabelConfig } from "./Label/createLabel";
import { createTitle, TitleConfig } from "./Title/createTitle";

export function createTypographyComponents<AtomsFn extends typeof bentoSprinkles>(
  sprinkles: AtomsFn,
  bodyConfig: BodyConfig<AtomsFn>,
  displayConfig: DisplayConfig<AtomsFn>,
  headlineConfig: HeadlineConfig<AtomsFn>,
  labelConfig: LabelConfig<AtomsFn>,
  titleConfig: TitleConfig<AtomsFn>
) {
  const Box = createBentoBox(sprinkles);

  const Body = createBody(Box, bodyConfig);
  const Display = createDisplay(Box, displayConfig);
  const Headline = createHeadline(Box, headlineConfig);
  const Label = createLabel(Box, labelConfig);
  const Title = createTitle(Box, titleConfig);

  return { Body, Display, Headline, Label, Title };
}

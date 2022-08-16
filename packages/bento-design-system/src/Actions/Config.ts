import { SprinklesFn } from "@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles";
import { ButtonProps } from "../Button/createButtons";
import { BentoSprinkles } from "../internal";
import { ActionsProps } from "./createActions";

export type ActionsConfig = {
  primaryActionButtonKind: ButtonProps["kind"];
  secondaryActionButtonKind: ButtonProps["kind"];
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
  buttonsAlignment: "left" | "right" | "spaceBetween";
  spaceBetweenButtons: BentoSprinkles["gap"];
  defaultErrorBannerWidth: NonNullable<ActionsProps["errorBannerWidth"]>;
};

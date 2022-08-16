import { ButtonProps } from "../Button/Button";
import { BentoSprinkles } from "../internal";
import { ActionsProps } from "./Actions";

export type ActionsConfig = {
  primaryActionButtonKind: ButtonProps["kind"];
  secondaryActionButtonKind: ButtonProps["kind"];
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
  buttonsAlignment: "left" | "right" | "spaceBetween";
  spaceBetweenButtons: BentoSprinkles["gap"];
  defaultErrorBannerWidth: NonNullable<ActionsProps["errorBannerWidth"]>;
};

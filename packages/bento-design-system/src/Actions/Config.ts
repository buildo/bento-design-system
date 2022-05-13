import { BoxProps } from "../Box/createBentoBox";
import { ButtonProps } from "../Button/createButtons";
import { bentoSprinkles } from "../internal";
import { ActionsProps } from "./createActions";

export type ActionsConfig = {
  primaryActionButtonKind: ButtonProps["kind"];
  secondaryActionButtonKind: ButtonProps["kind"];
  primaryPosition: "left" | "right";
  defaultSize: ButtonProps["size"];
  buttonsAlignment: "left" | "right" | "spaceBetween";
  spaceBetweenButtons: BoxProps<typeof bentoSprinkles>["gap"];
  defaultErrorBannerWidth: NonNullable<ActionsProps["errorBannerWidth"]>;
};

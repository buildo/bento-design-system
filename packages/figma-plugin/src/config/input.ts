import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function inputConfig(): Omit<
  SimpleBentoConfig["input"],
  "passwordShowIcon" | "passwordHideIcon" | "iconSize"
> {
  const { findWithVariants } = findComponentInPage("Input", "Password Field");

  const passwordField = findWithVariants({
    "Assistive text": "True",
    Info: "True",
    State: "Enabled Value",
  });

  const input = findChildByName(passwordField, "Input", "FRAME");
  const value = findChildByName(input, "Value", "TEXT");
  const icon = findChildByName(input, "Icon");

  return {
    internalSpacing: input.itemSpacing,
    paddingX: input.paddingLeft,
    paddingY: input.verticalPadding,
    radius: input.cornerRadius as number,
    fontSize: typographyVariant(value).size,
    passwordIconSize: icon.width,
  };
}

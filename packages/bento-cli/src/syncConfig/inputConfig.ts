import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { Ctx } from "../util/Ctx.js";

export function inputConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["input"],
  "passwordShowIcon" | "passwordHideIcon" | "iconSize" | "background"
> {
  const { findWithVariants } = ctx.findComponentsInPage("Input", "Password Field");

  const passwordField = findWithVariants({
    "Assistive text": "True",
    State: "Enabled Value",
  });

  const input = findChildByName(passwordField, "Input", "FRAME");
  const value = findChildByName(input, "Value", "TEXT");
  const icon = findChildByName(input, "Icon");

  return {
    internalSpacing: input.itemSpacing,
    paddingX: input.paddingLeft,
    paddingY: input.paddingTop,
    radius: input.cornerRadius,
    fontSize: ctx.typographyVariant(value).size,
    passwordIconSize: icon.absoluteBoundingBox.width,
  };
}

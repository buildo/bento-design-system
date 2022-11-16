import * as Figma from "figma-api";
import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function chipConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["chip"], "closeIcon" | "customColors"> {
  const { findWithVariants } = ctx.findComponentsInPage("Chip");

  const chip = findWithVariants({
    Icon: "True",
    Dismissable: "True",
  });

  const iconLabelContainer = chip.children[0] as Figma.Node<"FRAME">;
  const label = findChildByName(chip, "Label", "TEXT");
  const icon = findChildByName(chip, "Icon");
  const closeIcon = findChildByName(chip, "Icon Button");

  const radius =
    chip.cornerRadius === chip.absoluteBoundingBox.height / 2 ? "circledX" : chip.cornerRadius;

  return {
    paddingX: chip?.paddingLeft,
    paddingY: chip?.paddingTop,
    labelSize: ctx.typographyVariant(label)?.size,
    iconSize: icon?.absoluteBoundingBox.width,
    closeIconSize: closeIcon?.absoluteBoundingBox.width,
    spacingAfterIcon: iconLabelContainer.itemSpacing,
    spacingAfterLabel: chip?.itemSpacing,
    radius,
  };
}

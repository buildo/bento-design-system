import * as Figma from "figma-api";
import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function tooltipConfig(ctx: Ctx): SimpleBentoConfig["tooltip"] {
  const { findWithVariants } = ctx.findComponentsInPage("Tooltip");
  const TooltipContainer = findWithVariants({ Orientation: "Top" });
  const Tooltip = TooltipContainer.children[0] as Figma.Node<"FRAME">;
  const label = findChildByName(TooltipContainer, "Tooltip label", "TEXT");

  return {
    labelSize: ctx.typographyVariant(label).size,
    paddingX: Tooltip.paddingLeft,
    paddingY: Tooltip.paddingTop,
    radius: Tooltip.cornerRadius,
  };
}

import { Ctx } from "../util/Ctx.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import * as Figma from "figma-api";

export function decorativeDividerConfig(ctx: Ctx): SimpleBentoConfig["decorativeDivider"] {
  const { components } = ctx.findComponentsInPage("Divider");

  const decorativeDivider = components.find((c) => c.name === "Decorative Divider")
    ?.children[0] as Figma.Node<"FRAME">;

  const radius =
    decorativeDivider.cornerRadius === decorativeDivider.absoluteBoundingBox.height / 2
      ? "circledX"
      : decorativeDivider.cornerRadius;

  return {
    color: ctx.colorVariant(decorativeDivider),
    height: decorativeDivider.absoluteBoundingBox.height,
    radius,
  };
}

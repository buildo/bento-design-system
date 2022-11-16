import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import * as Figma from "figma-api";

export function selectionControlConfig(ctx: Ctx): SimpleBentoConfig["selectionControl"] {
  const { findWithVariants } = ctx.findComponentsInPage("Input", "Radio Group");

  const radioGroupHorizontal = findWithVariants({
    Orientation: "Horizontal",
    "Assistive text": "True",
    State: "Enabled",
  });

  const radioGroupVertical = findWithVariants({
    Orientation: "Vertical",
    "Assistive text": "True",
    State: "Enabled",
  });

  const radio = findChildByName(radioGroupHorizontal, "Radio", "INSTANCE");
  const radioLabelContainer = radio.children[1] as Figma.Node<"FRAME">;

  const radioContainerHorizontal = radioGroupHorizontal.children[1] as Figma.Node<"FRAME">;

  const radioContainerVertical = radioGroupVertical.children[1] as Figma.Node<"FRAME">;

  const radioLabel = findChildByName(radio, "Label", "TEXT");

  return {
    group: {
      internalSpacing: {
        vertical: radioContainerVertical.itemSpacing,
        horizontal: radioContainerHorizontal.itemSpacing,
      },
    },
    element: {
      controlLabelSpacing: radio.itemSpacing,
      labelPaddingTop: radioLabelContainer.paddingTop,
      labelSize: ctx.typographyVariant(radioLabel).size,
    },
  };
}

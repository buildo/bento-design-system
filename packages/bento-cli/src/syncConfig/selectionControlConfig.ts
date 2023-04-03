import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import * as Figma from "figma-api";

export function selectionControlConfig(ctx: Ctx): SimpleBentoConfig["selectionControl"] {
  const { findWithVariants } = ctx.findComponentsInPage("Input", "Checkbox Group");

  const checkboxGroupHorizontal = findWithVariants({
    Orientation: "Horizontal",
    "Assistive text": "True",
    State: "Enabled",
  });

  const checkboxGroupVertical = findWithVariants({
    Orientation: "Vertical",
    "Assistive text": "True",
    State: "Enabled",
  });

  const checkbox = findChildByName(checkboxGroupHorizontal, "Checkbox", "INSTANCE");
  const checkboxLabelContainer = checkbox.children[1] as Figma.Node<"FRAME">;

  const checkboxContainerHorizontal = checkboxGroupHorizontal.children[1] as Figma.Node<"FRAME">;

  const checkboxContainerVertical = checkboxGroupVertical.children[1] as Figma.Node<"FRAME">;

  const checkboxLabel = findChildByName(checkbox, "Label", "TEXT");

  return {
    group: {
      internalSpacing: {
        vertical: checkboxContainerVertical.itemSpacing,
        horizontal: checkboxContainerHorizontal.itemSpacing,
      },
    },
    element: {
      controlLabelSpacing: checkbox.itemSpacing,
      labelPaddingTop: checkboxLabelContainer.paddingTop,
      labelSize: ctx.typographyVariant(checkboxLabel).size,
      checkboxBorderRadius: checkbox.cornerRadius,
    },
  };
}

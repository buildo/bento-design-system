import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function buttonConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["button"], "defaultSize" | "defaultIconPosition"> {
  const { findWithVariants } = ctx.findComponentsInPage("Button");

  const smallButton = findWithVariants({
    Size: "Small",
    Icon: "True",
  });
  const mediumButton = findWithVariants({
    Size: "Medium",
    Icon: "True",
  });
  const largeButton = findWithVariants({
    Size: "Large",
    Icon: "True",
  });
  const buttonLabel = findChildByName(smallButton, "Label", "TEXT");

  return {
    paddingX: {
      small: smallButton.paddingLeft,
      medium: mediumButton.paddingLeft,
      large: largeButton.paddingLeft,
    },
    paddingY: {
      small: smallButton.paddingTop,
      medium: mediumButton.paddingTop,
      large: largeButton.paddingTop,
    },
    labelSize: ctx.typographyVariant(buttonLabel).size,
    radius: smallButton.cornerRadius,
    internalSpacing: smallButton.itemSpacing,
    iconSize: {
      small: findChildByName(smallButton, "Icon").absoluteBoundingBox.width,
      medium: findChildByName(mediumButton, "Icon").absoluteBoundingBox.width,
      large: findChildByName(largeButton, "Icon").absoluteBoundingBox.width,
    },
    uppercaseLabel: buttonLabel.characters === buttonLabel.characters.toUpperCase(),
  };
}

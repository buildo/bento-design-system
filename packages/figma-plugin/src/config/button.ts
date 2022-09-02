import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function buttonConfig(): Omit<SimpleBentoConfig["button"], "defaultSize"> {
  const { findWithVariants } = findComponentInPage("Button");

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
      small: smallButton.verticalPadding,
      medium: mediumButton.verticalPadding,
      large: largeButton.verticalPadding,
    },
    labelSize: typographyVariant(buttonLabel).size,
    radius: smallButton.cornerRadius as number,
    internalSpacing: smallButton.itemSpacing,
    iconSize: {
      small: findChildByName(smallButton, "Icon").width,
      medium: findChildByName(mediumButton, "Icon").width,
      large: findChildByName(largeButton, "Icon").width,
    },
    uppercaseLabel: buttonLabel.characters === buttonLabel.characters.toUpperCase(),
  };
}

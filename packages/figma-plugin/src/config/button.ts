import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";

export function buttonConfig() {
  const { findWithVariants } = findComponent("Button");

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
  const buttonLabel = smallButton?.findOne((c) => c.name === "Label") as TextNode;

  return {
    paddingX: {
      small: smallButton?.paddingLeft,
      medium: mediumButton?.paddingLeft,
      large: largeButton?.paddingLeft,
    },
    paddingY: {
      small: smallButton?.verticalPadding,
      medium: mediumButton?.verticalPadding,
      large: largeButton?.verticalPadding,
    },
    labelSize: typographyVariant(buttonLabel)?.size,
    radius: smallButton?.cornerRadius,
    internalSpacing: smallButton?.itemSpacing,
    iconSize: {
      small: smallButton?.findOne((c) => c.name === "Icon")?.width,
      medium: mediumButton?.findOne((c) => c.name === "Icon")?.width,
      large: largeButton?.findOne((c) => c.name === "Icon")?.width,
    },
    uppercaseLabel: buttonLabel?.characters === buttonLabel?.characters.toUpperCase(),
  };
}

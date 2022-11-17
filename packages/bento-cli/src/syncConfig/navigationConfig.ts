import * as Figma from "figma-api";
import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function navigationConfig(ctx: Ctx): Omit<
  SimpleBentoConfig["navigation"],
  "activeVisualElement"
> & {
  activeVisualElement:
    | (SimpleBentoConfig["navigation"]["activeVisualElement"] & { lineColor: unknown })
    | undefined;
} {
  const { findWithVariants } = ctx.findComponentsInPage("Navigation", "Destination");

  const { components } = ctx.findComponentsInPage("Navigation");

  const navigation = components.find((c) => c.name.includes("Navigation"))!;

  const mediumDestinationWithIcon = findWithVariants({
    Kind: "Icon",
    Size: "Medium",
    State: "Active",
  });

  const largeDestinationWithIcon = findWithVariants({
    Kind: "Icon",
    Size: "Large",
    State: "Active",
  });

  const mediumDestinationWithIllustration = findWithVariants({
    Kind: "Illustration",
    Size: "Medium",
    State: "Active",
  });

  const largeDestinationWithIllustration = findWithVariants({
    Kind: "Illustration",
    Size: "Large",
    State: "Active",
  });

  const mediumActiveLine = mediumDestinationWithIcon.children.find((c) =>
    c.name.includes("Rectangle")
  ) as Figma.Node<"RECTANGLE"> | undefined;
  const largeActiveLine = largeDestinationWithIcon.children.find((c) =>
    c.name.includes("Rectangle")
  ) as Figma.Node<"RECTANGLE"> | undefined;

  const mediumDestinationContainer = mediumDestinationWithIcon.children[0] as Figma.Node<"FRAME">;
  const largeDestinationContainer = largeDestinationWithIcon.children[0] as Figma.Node<"FRAME">;

  const mediumIcon = findChildByName(mediumDestinationContainer, "Icon");
  const largeIcon = findChildByName(largeDestinationContainer, "Icon");

  const mediumIllustration = findChildByName(mediumDestinationWithIllustration, "Illustration");
  const largeIllustration = findChildByName(largeDestinationWithIllustration, "Illustration");

  const mediumLabel = findChildByName(mediumDestinationContainer, "Label", "TEXT");
  const largeLabel = findChildByName(largeDestinationContainer, "Label", "TEXT");

  return {
    activeVisualElement:
      mediumActiveLine && largeActiveLine
        ? {
            lineColor: ctx.colorVariant(mediumActiveLine),
            lineHeight: {
              medium: mediumActiveLine.absoluteBoundingBox.height,
              large: largeActiveLine.absoluteBoundingBox.height,
            },
          }
        : undefined,
    destinationPaddingX: {
      medium: mediumDestinationContainer.paddingLeft,
      large: largeDestinationContainer.paddingLeft,
    },
    destinationPaddingY: {
      medium: mediumDestinationContainer.paddingTop,
      large: largeDestinationContainer.paddingTop,
    },
    destinationsSpacing: navigation.itemSpacing ?? 0,
    iconSize: {
      medium: mediumIcon.absoluteBoundingBox.width,
      large: largeIcon.absoluteBoundingBox.width,
    },
    illustrationSize: {
      medium: mediumIllustration.absoluteBoundingBox.width,
      large: largeIllustration.absoluteBoundingBox.width,
    },
    labelSize: {
      medium: ctx.typographyVariant(mediumLabel).size,
      large: ctx.typographyVariant(largeLabel).size,
    },
    uppercaseLabel: mediumLabel.characters.toUpperCase() === mediumLabel.characters,
    internalSpacing: {
      medium: mediumDestinationContainer.itemSpacing,
      large: largeDestinationContainer.itemSpacing,
    },
  };
}

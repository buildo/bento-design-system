import { figmaRGBToHex } from "@figma-plugin/helpers";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const components =
    figma.currentPage.parent?.findAllWithCriteria({
      types: ["COMPONENT"],
    }) ?? [];

  const config = {
    button: buttonConfig(components),
  };

  console.log(config);
  console.log(JSON.stringify(config, null, 2));

  const cssTheme = theme();
  console.log(cssTheme);
  console.log(JSON.stringify(cssTheme, null, 2));

  figma.closePlugin("Done! Check the console");
}

function buttonConfig(components: Array<ComponentNode>) {
  const smallButton = components?.find(
    (c) =>
      c.parent?.name === "Button" &&
      c.variantProperties?.["Size"] === "Small" &&
      c.variantProperties?.["Icon"] === "True"
  );
  const mediumButton = components?.find(
    (c) =>
      c.parent?.name === "Button" &&
      c.variantProperties?.["Size"] === "Medium" &&
      c.variantProperties?.["Icon"] === "True"
  );
  const largeButton = components?.find(
    (c) =>
      c.parent?.name === "Button" &&
      c.variantProperties?.["Size"] === "Large" &&
      c.variantProperties?.["Icon"] === "True"
  );
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

function theme() {
  return {
    brandColor: {
      brandPrimary: getStyleColor("Brand/Primary"),
      brandSecondary: getStyleColor("Brand/Secondary"),
      brandTertiary: getStyleColor("Brand/Tertiary"),
    },
    backgroundColor: {
      backgroundPrimary: getStyleColor("Background/Primary"),
      backgroundSecondary: getStyleColor("Background/Secondary"),
      backgroundOverlay: getStyleColor("Background/Overlay"),
      backgroundPrimaryInverse: getStyleColor("Background/Primary Inverse"),
      backgroundSecondaryInverse: getStyleColor("Background/Secondary Inverse"),
      backgroundInteractive: getStyleColor("Background/Interactive"),
    },
  };
}

function getStyleColor(name: string): string | undefined {
  const styles = figma.getLocalPaintStyles();
  const paint = styles.find((s) => s.name === name)?.paints[0];
  if (paint?.type === "SOLID") {
    return figmaRGBToHex(paint.color).toUpperCase();
  }
}

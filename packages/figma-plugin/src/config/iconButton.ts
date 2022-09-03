import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";

export function iconButtonConfig(): SimpleBentoConfig["iconButton"] {
  const { findWithVariants } = findComponentInPage("Icon Button");

  const iconButtonSolid24 = findWithVariants({
    Kind: "Solid",
    Size: "24",
  });

  const iconButtonSolid16 = findWithVariants({
    Kind: "Solid",
    Size: "16",
  });

  const iconButtonSolid12 = findWithVariants({
    Kind: "Solid",
    Size: "12",
  });

  const iconButtonSolid8 = findWithVariants({
    Kind: "Solid",
    Size: "8",
  });

  return {
    padding: {
      "24": iconButtonSolid24.paddingLeft,
      "16": iconButtonSolid16.paddingLeft,
      "12": iconButtonSolid12.paddingLeft,
      "8": iconButtonSolid8.paddingLeft,
    },
    radius: iconButtonSolid24.cornerRadius as number,
  };
}

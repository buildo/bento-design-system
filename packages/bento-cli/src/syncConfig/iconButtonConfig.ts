import { Ctx } from "../util/Ctx.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function iconButtonConfig(ctx: Ctx): SimpleBentoConfig["iconButton"] {
  const { findWithVariants } = ctx.findComponentsInPage("Icon Button");

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
    radius: iconButtonSolid24.cornerRadius,
  };
}

import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function progressBarConfig(ctx: Ctx): SimpleBentoConfig["progressBar"] {
  const { findWithVariants } = ctx.findComponentsInPage("Progress Bar");

  const discrete = findWithVariants({ Kind: "Discrete" });
  const discreteTrail = findChildByName(discrete, "Trail", "RECTANGLE");

  console.log(discreteTrail);

  return {
    discreteInternalSpacing: discrete.itemSpacing,
    height: discreteTrail.absoluteBoundingBox.height,
    radius: discreteTrail.cornerRadius,
  };
}

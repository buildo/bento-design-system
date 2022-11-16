import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function areaLoaderConfig(ctx: Ctx): Omit<SimpleBentoConfig["areaLoader"], "dots"> {
  const { findWithVariants } = ctx.findComponentsInPage("Loader", "Area Loader");

  const areaLoader = findWithVariants({
    "Waiting time": "Long",
  });

  const readabilityArea = findChildByName(areaLoader, "Readability Area", "FRAME");
  const message = findChildByName(areaLoader, "Message", "TEXT");

  return {
    scrimColor: ctx.backgroundColorVariant(areaLoader).replace("-scrim", ""),
    messageSize: ctx.typographyVariant(message).size,
    messageColor: ctx.textColorVariant(message),
    readabilityAreaColor: ctx.backgroundColorVariant(readabilityArea),
    readabilityAreaBorderRadius: readabilityArea.cornerRadius,
  };
}

import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function disclosureConfig(ctx: Ctx): Omit<SimpleBentoConfig["disclosure"], "icons"> {
  const { findWithVariants } = ctx.findComponentsInPage("Disclosure");

  const disclosureLevel1 = findWithVariants({
    Kind: "First level",
  });

  const disclosureLevel2 = findWithVariants({
    Kind: "Second level",
  });

  const disclosureLabelLevel1 = findChildByName(disclosureLevel1, "Title", "TEXT");
  const disclosureLabelLevel2 = findChildByName(disclosureLevel2, "Title", "TEXT");
  const iconLevel1 = findChildByName(disclosureLevel1, "Icon");
  const iconLevel2 = findChildByName(disclosureLevel2, "Icon");

  const defaultIconPosition = disclosureLevel1.children[0].name === "Icon" ? "leading" : "trailing";

  return {
    internalSpacing: disclosureLevel1.itemSpacing,
    defaultIconPosition,
    titleSize: {
      1: ctx.typographyVariant(disclosureLabelLevel1).size,
      2: ctx.typographyVariant(disclosureLabelLevel2).size,
    },
    iconSize: {
      1: iconLevel1.absoluteBoundingBox.width,
      2: iconLevel2.absoluteBoundingBox.width,
    },
  };
}

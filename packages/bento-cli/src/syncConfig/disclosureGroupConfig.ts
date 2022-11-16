import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function disclosureGroupConfig(ctx: Ctx): SimpleBentoConfig["disclosureGroup"] {
  const { findWithVariants } = ctx.findComponentsInPage("Disclosure");

  const disclosureGroup = findWithVariants({
    Nested: "False",
  });

  const disclosureGroupNested = findWithVariants({
    Nested: "True",
  });

  const disclosure = findChildByName(disclosureGroup, "Disclosure", "INSTANCE");
  const defaultIconPosition = disclosure.children[0].name === "Icon" ? "leading" : "trailing";

  return {
    defaultIconPosition,
    disclosureSpacing: disclosureGroup.itemSpacing,
    groupSpacing: disclosureGroupNested.itemSpacing,
  };
}

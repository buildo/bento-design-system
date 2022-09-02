import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";

export function disclosureGroupConfig(): SimpleBentoConfig["disclosureGroup"] {
  const { findWithVariants } = findComponentInPage("Disclosure");

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

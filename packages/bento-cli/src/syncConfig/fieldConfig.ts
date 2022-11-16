import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function fieldConfig(ctx: Ctx): SimpleBentoConfig["field"] {
  const { findWithVariants } = ctx.findComponentsInPage("Input");

  const inputField = findWithVariants(
    {
      "Assistive Text": "True",
      Info: "True",
      State: "Enabled",
    },
    // Alternative variant for older versions of Bento when Info was called Tooltip
    {
      "Assistive Text": "True",
      Tooltip: "True",
      State: "Enabled",
    }
  );

  const label = findChildByName(inputField, "Label", "TEXT");
  const assistiveText = findChildByName(inputField, "Assistive text", "FRAME");
  const assistiveTextLabel = findChildByName(assistiveText, "Text", "TEXT");
  const tip = findChildByName(inputField, "Field Tip", "INSTANCE");
  const tipIcon = findChildByName(tip, "Icon");

  return {
    label: {
      size: ctx.typographyVariant(label).size,
      color: ctx.textColorVariant(label),
    },
    assistiveText: {
      size: ctx.typographyVariant(assistiveTextLabel).size,
      paddingLeft: assistiveText.paddingLeft,
    },
    internalSpacing: inputField.itemSpacing,
    tip: {
      iconSize: tipIcon.absoluteBoundingBox.width,
    } as SimpleBentoConfig["field"]["tip"],
  };
}

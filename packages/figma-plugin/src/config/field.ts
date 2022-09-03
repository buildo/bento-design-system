import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { textColorVariant } from "../util/textColorVariant";
import { typographyVariant } from "../util/typographyVariant";

export function fieldConfig(): SimpleBentoConfig["field"] {
  const { findWithVariants } = findComponentInPage("Input");

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
      size: typographyVariant(label).size,
      color: textColorVariant(label),
    },
    assistiveText: {
      size: typographyVariant(assistiveTextLabel).size,
      paddingLeft: assistiveText.paddingLeft,
    },
    internalSpacing: inputField.itemSpacing,
    tip: {
      iconSize: tipIcon.width,
    } as SimpleBentoConfig["field"]["tip"],
  };
}

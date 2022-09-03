import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function selectionControlConfig(): SimpleBentoConfig["selectionControl"] {
  const { findWithVariants } = findComponentInPage("Input", "Radio Group");

  const radioGroupHorizontal = findWithVariants({
    Orientation: "Horizontal",
    "Assistive text": "True",
    Info: "True",
    State: "Enabled",
  });

  const radioGroupVertical = findWithVariants({
    Orientation: "Vertical",
    "Assistive text": "True",
    Info: "True",
    State: "Enabled",
  });

  const radio = findChildByName(radioGroupHorizontal, "Radio", "INSTANCE");

  const radioContainerHorizontal = radio.parent as FrameNode;

  const radioContainerVertical = findChildByName(radioGroupVertical, "Radio", "INSTANCE")
    .parent as FrameNode;

  const radioLabel = findChildByName(radio, "Label", "TEXT");

  return {
    group: {
      internalSpacing: {
        vertical: radioContainerVertical.itemSpacing,
        horizontal: radioContainerHorizontal.itemSpacing,
      },
    },
    element: {
      controlLabelSpacing: radio.itemSpacing,
      labelPaddingTop: (radioLabel.parent as FrameNode).paddingTop,
      labelSize: typographyVariant(radioLabel).size,
    },
  };
}

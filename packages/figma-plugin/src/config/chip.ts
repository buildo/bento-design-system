import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function chipConfig(): Omit<SimpleBentoConfig["chip"], "closeIcon" | "customColors"> {
  const { findWithVariants } = findComponentInPage("Chip");

  const chip = findWithVariants({
    Icon: "True",
    Dismissable: "True",
  });

  const label = findChildByName(chip, "Label", "TEXT");
  const icon = findChildByName(chip, "Icon");
  const closeIcon = findChildByName(chip, "Icon Button");

  const radius = chip.cornerRadius === chip.height / 2 ? "circledX" : (chip.cornerRadius as number);

  return {
    paddingX: chip?.paddingLeft,
    paddingY: chip?.verticalPadding,
    labelSize: typographyVariant(label)?.size,
    iconSize: icon?.width,
    closeIconSize: closeIcon?.width,
    spacingAfterIcon: (icon?.parent as FrameNode).itemSpacing,
    spacingAfterLabel: chip?.itemSpacing,
    radius,
  };
}

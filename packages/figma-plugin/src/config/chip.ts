import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";

export function chipConfig() {
  const { findWithVariants } = findComponent("Chip");

  const chip = findWithVariants({
    Icon: "True",
    Dismissable: "True",
  });

  const label = chip?.findOne((c) => c.name === "Label") as TextNode;
  const icon = chip?.findOne((c) => c.name === "Icon") as InstanceNode;
  const closeIcon = chip?.findOne((c) => c.name === "IconButton") as InstanceNode;

  const radius = chip && chip.cornerRadius === chip.height / 2 ? "circledX" : chip?.cornerRadius;

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

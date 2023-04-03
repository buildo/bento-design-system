import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function modalConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["modal"],
  "closeIcon" | "defaultErrorBannerWidth" | "titleIcon" | "internalSpacing"
> {
  const { findWithVariants } = ctx.findComponentsInPage("Modal");

  const normalSmallModal = findWithVariants({
    Kind: "Normal",
    Size: "Small",
  });

  const normalMediumModal = findWithVariants({
    Kind: "Normal",
    Size: "Medium",
  });

  const normalLargeModal = findWithVariants({
    Kind: "Normal",
    Size: "Large",
  });

  const normalWideModal = findWithVariants({
    Kind: "Normal",
    Size: "Wide",
  });

  const warningSmallModal = findWithVariants({
    Kind: "Warning",
    Size: "Small",
  });

  const title = findChildByName(normalSmallModal, "Title", "TEXT");
  const closeIcon = findChildByName(normalSmallModal, "Icon Button");
  const header = findChildByName(normalSmallModal, "Modal Header");
  const titleIcon = findChildByName(warningSmallModal, "Icon");
  const actionsInstance = findChildByName(normalSmallModal, "Actions", "INSTANCE");
  const actions = ctx.componentFromInstance(actionsInstance);

  return {
    elevation: ctx.elevationVariant(normalSmallModal),
    titleSize: ctx.typographyVariant(title).size,
    titleIconSize: titleIcon.absoluteBoundingBox.width,
    closeIconSize: closeIcon.absoluteBoundingBox.height,
    paddingX: normalSmallModal.paddingLeft,
    paddingY: normalSmallModal.paddingTop,
    radius: header.cornerRadius,
    width: {
      small: normalSmallModal.absoluteBoundingBox.width,
      medium: normalMediumModal.absoluteBoundingBox.width,
      large: normalLargeModal.absoluteBoundingBox.width,
      wide: normalWideModal.absoluteBoundingBox.width,
    },
    actionsSize: nameToVariantProperties(actions.name)["Button size"].toLowerCase(),
  };
}

import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function bannerConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["banner"], "outline" | "closeIcon" | "semanticIcons"> {
  const { findWithVariants } = ctx.findComponentsInPage("Banner");

  const informativeBanner = findWithVariants({
    Kind: "Informative",
    Title: "True",
    Description: "True",
    Dismissable: "True",
    Action: "True",
  });

  const informativeBannerWithoutTitle = findWithVariants({
    Kind: "Informative",
    Title: "False",
    Description: "True",
    Dismissable: "True",
  });

  const title = findChildByName(informativeBanner, "Title", "TEXT");
  const description = findChildByName(informativeBanner, "Description", "TEXT");
  const closeIcon = findChildByName(informativeBanner, "Icon Button", "INSTANCE");
  const infoIconWithTitle = findChildByName(informativeBanner, "Icon", "INSTANCE");
  const infoIconWithoutTitle = findChildByName(informativeBannerWithoutTitle, "Icon", "INSTANCE");
  const actionButton = findChildByName(informativeBanner, "Button", "INSTANCE");

  return {
    paddingX: informativeBanner.paddingLeft,
    paddingY: informativeBanner.paddingTop,
    radius: informativeBanner.cornerRadius,
    titleSize: ctx.typographyVariant(title)?.size,
    descriptionSize: ctx.typographyVariant(description)?.size,
    closeIconSize: closeIcon?.absoluteBoundingBox.width,
    semanticIconSize: {
      withoutTitle: infoIconWithoutTitle?.absoluteBoundingBox.width,
      withTitle: infoIconWithTitle?.absoluteBoundingBox.width,
    },
    buttonKind: nameToVariantProperties(ctx.componentFromInstance(actionButton).name)[
      "Kind"
    ].toLowerCase(),
    buttonSize: nameToVariantProperties(ctx.componentFromInstance(actionButton).name)[
      "Size"
    ].toLowerCase(),
    // TODO(gabro)
    // outline: undefined
  };
}

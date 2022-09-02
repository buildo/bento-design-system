import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";
import { findChildByName } from "../util/findChildByName";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";

export function bannerConfig(): Omit<
  SimpleBentoConfig["banner"],
  "outline" | "closeIcon" | "semanticIcons"
> {
  const { findWithVariants } = findComponent("Banner");

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
    paddingY: informativeBanner.verticalPadding,
    radius: informativeBanner.cornerRadius as number,
    titleSize: typographyVariant(title)?.size,
    descriptionSize: typographyVariant(description)?.size,
    closeIconSize: closeIcon?.width,
    semanticIconSize: {
      withoutTitle: infoIconWithoutTitle?.width,
      withTitle: infoIconWithTitle?.width,
    },
    buttonKind: (actionButton.componentProperties["Kind"].value as string).toLowerCase(),
    buttonSize: (actionButton.componentProperties["Size"].value as string).toLowerCase(),
    // TODO(gabro)
    // outline: undefined
  };
}

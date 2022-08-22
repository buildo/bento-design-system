import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";

export function bannerConfig() {
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

  const title = informativeBanner?.findOne((c) => c.name === "Title") as TextNode;
  const description = informativeBanner?.findOne((c) => c.name === "Description") as TextNode;
  const closeIcon = informativeBanner?.findOne((c) => c.name === "Icon Button") as InstanceNode;
  const infoIconWithTitle = informativeBanner?.findOne((c) => c.name === "Icon") as InstanceNode;
  const infoIconWithoutTitle = informativeBannerWithoutTitle?.findOne(
    (c) => c.name === "Icon"
  ) as InstanceNode;
  const actionButton = informativeBanner?.findOne((c) => c.name === "Button") as InstanceNode;

  return {
    paddingX: informativeBanner?.paddingLeft,
    paddingY: informativeBanner?.verticalPadding,
    radius: informativeBanner?.cornerRadius,
    titleSize: typographyVariant(title)?.size,
    descriptionSize: typographyVariant(description)?.size,
    closeIconSize: closeIcon?.width,
    semanticIconSize: {
      withoutTitle: infoIconWithoutTitle?.width,
      withTitle: infoIconWithTitle?.width,
    },
    buttonKind: (actionButton.componentProperties["Kind"].value as string).toLowerCase(),
    buttonSize: (actionButton.componentProperties["Size"].value as string).toLowerCase(),
  };
}

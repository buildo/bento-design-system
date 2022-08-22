import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";

export function breadcrumb() {
  const { findWithVariants } = findComponent("Breadcrumb");

  const breadcrumb = findWithVariants({});
  const breadcrumbItem = breadcrumb?.findOne((c) => c.name === "Link") as TextNode;
  const separator = breadcrumb?.findOne((c) => c.name === "Icon") as InstanceNode;

  return {
    fontSize: typographyVariant(breadcrumbItem)?.size,
    separatorSize: separator?.width,
    space: breadcrumb?.itemSpacing,
  };
}

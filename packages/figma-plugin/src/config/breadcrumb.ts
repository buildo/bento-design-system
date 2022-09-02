import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function breadcrumbConfig(): Omit<SimpleBentoConfig["breadcrumb"], "separator"> {
  const { findWithVariants } = findComponentInPage("Breadcrumb");

  const breadcrumb = findWithVariants({});
  const breadcrumbItem = findChildByName(breadcrumb, "Link", "TEXT");
  const separator = findChildByName(breadcrumb, "Icon");

  return {
    fontSize: typographyVariant(breadcrumbItem).size,
    separatorSize: separator.width,
    space: breadcrumb.itemSpacing,
  };
}

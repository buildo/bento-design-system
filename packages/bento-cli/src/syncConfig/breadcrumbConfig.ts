import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { Ctx } from "../util/Ctx.js";

export function breadcrumbConfig(ctx: Ctx): Omit<SimpleBentoConfig["breadcrumb"], "separator"> {
  const { findWithVariants } = ctx.findComponentsInPage("Breadcrumb");

  const breadcrumb = findWithVariants({});
  const breadcrumbItem = findChildByName(breadcrumb, "Link", "TEXT");
  const separator = findChildByName(breadcrumb, "Icon");

  return {
    fontSize: ctx.typographyVariant(breadcrumbItem).size,
    separatorSize: separator.absoluteBoundingBox.width,
    space: breadcrumb.itemSpacing,
  };
}

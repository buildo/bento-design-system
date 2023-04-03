import { findChild, findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { Ctx } from "../util/Ctx.js";

export function listConfig(ctx: Ctx): SimpleBentoConfig["list"] {
  const { findWithVariants: findListWithVariants } = ctx.findComponentsInPage(
    "List",
    "List (to detach)"
  );
  const List = findListWithVariants({
    Size: "Medium",
    Divider: "False",
  });
  const { findWithVariants: findListItemWithVariants } = ctx.findComponentsInPage(
    "List",
    "List Item"
  );

  const ListItemMedium = findListItemWithVariants({
    Kind: "Two-line",
    "Leading icon": "True",
    "Trailing icon": "True",
    State: "Enabled",
    Size: "Medium",
    Illustration: "False",
  });
  const ListItemLarge = findListItemWithVariants({
    Kind: "Two-line",
    "Leading icon": "True",
    "Trailing icon": "True",
    State: "Enabled",
    Size: "Large",
    Illustration: "False",
  });
  const ListItemOverline = findListItemWithVariants({
    Kind: "Overline",
    "Leading icon": "False",
    "Trailing icon": "False",
    State: "Enabled",
    Size: "Large",
    Illustration: "True",
  });
  const firstLineText = findChildByName(ListItemMedium, "List item", "TEXT");
  const secondLineText = findChildByName(ListItemMedium, "Second line", "TEXT");
  const overlineText = findChildByName(ListItemOverline, "OVERLINE", "TEXT");
  const leadingIcon = findChildByName(ListItemMedium, "Icon");
  const trailingIcon = findChild(ListItemMedium, (n) => n.name === "Icon" && n !== leadingIcon);
  const illustration = findChildByName(ListItemOverline, "Illustration");

  return {
    spacing: List.itemSpacing,
    item: {
      borderRadius: ListItemMedium.cornerRadius,
      fontSize: {
        firstLine: ctx.typographyVariant(firstLineText).size,
        secondLine: ctx.typographyVariant(secondLineText).size,
        overline: ctx.typographyVariant(overlineText).size,
      },
      iconSize: {
        leading: leadingIcon.absoluteBoundingBox.width,
        trailing: trailingIcon.absoluteBoundingBox.width,
        illustration: illustration.absoluteBoundingBox.width,
      },
      paddingX: {
        medium: ListItemMedium.paddingLeft,
        large: ListItemLarge.paddingLeft,
      },
      paddingY: {
        medium: ListItemMedium.paddingTop,
        large: ListItemLarge.paddingTop,
      },
      iconColor: {
        leading: ctx.iconColorVariant(leadingIcon),
        trailing: ctx.iconColorVariant(trailingIcon),
        illustration: "default", // TODO: the illustration color is configurable, but the only available colors are "default" | "disabled" | "inherit"
      },
      internalSpacing: ListItemMedium.itemSpacing,
    },
  };
}

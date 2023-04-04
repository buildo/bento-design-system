import { Omit } from "@buildo/bento-design-system";
import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function tabsConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["tabs"], "tabsWidth" | "tabsAlignment" | "uppercaseLabel"> {
  const { components: tabsComponents } = ctx.findComponentsInPage("Tabs");
  const Tabs = tabsComponents.find((c) => c.name === "Folder Tabs (to detach)")!;
  const { findWithVariants: findTabWithVariants } = ctx.findComponentsInPage("Tabs", "Folder Tab");
  const Tab = findTabWithVariants({
    Icon: "True",
    Notification: "True",
    Size: "Medium",
    State: "Active",
  });
  const TabLarge = findTabWithVariants({
    Icon: "True",
    Notification: "True",
    Size: "Large",
    State: "Active",
  });
  const icon = findChildByName(Tab, "Icon", "INSTANCE");
  const label = findChildByName(Tab, "Label", "TEXT");
  const largeLabel = findChildByName(TabLarge, "Label", "TEXT");
  const notification = findChildByName(Tab, "Ellipse 1", "ELLIPSE");

  return {
    kind: "folder",
    radius: Tabs.cornerRadius,
    iconSize: icon.absoluteBoundingBox.width,
    internalSpacing: Tab.itemSpacing,
    labelSize: {
      medium: ctx.typographyVariant(label).size,
      large: ctx.typographyVariant(largeLabel).size,
    },
    notificationSize: notification.absoluteBoundingBox.width,
    notificationColor: ctx.colorVariant(notification),
    paddingX: { medium: Tab.paddingLeft, large: TabLarge.paddingLeft },
    paddingY: { medium: Tab.paddingTop, large: TabLarge.paddingTop },
    spaceBetweenTabs: Tabs.itemSpacing,
  };
}

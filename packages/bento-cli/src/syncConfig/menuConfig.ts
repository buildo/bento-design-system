import * as Figma from "figma-api";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { Ctx } from "../util/Ctx.js";

export function menuConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["menu"], "defaultOffset" | "nestedMenuIcon"> {
  const { findWithVariants } = ctx.findComponentsInPage("Menu");
  const Menu = findWithVariants({
    Size: "Medium",
    Header: "True",
  });
  const header = Menu.children[0] as Figma.Node<"FRAME">;
  const menuList = Menu.children[1] as Figma.Node<"FRAME">;

  return {
    elevation: ctx.elevationVariant(Menu),
    headerPaddingX: header.paddingLeft,
    headerPaddingY: header.paddingTop,
    paddingX: menuList.paddingLeft,
    paddingY: menuList.paddingTop,
    radius: Menu.cornerRadius,
  };
}

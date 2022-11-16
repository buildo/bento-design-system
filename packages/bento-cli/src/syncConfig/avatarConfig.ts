import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function avatarConfig(ctx: Ctx): Omit<SimpleBentoConfig["avatar"], "icon" | "outline"> {
  const { findWithVariants } = ctx.findComponentsInPage("Avatar");

  const avatar = findWithVariants({
    Kind: "Initial",
  });

  const label = findChildByName(avatar, "Initial", "TEXT");

  const avatarWithIcon = findWithVariants({
    Kind: "Icon",
  });
  const icon = findChildByName(avatarWithIcon, "Icon");

  const width = avatar.absoluteBoundingBox.width;
  const height = avatar.absoluteBoundingBox.height;
  const radius = avatar.cornerRadius === width / 2 ? "circled" : avatar.cornerRadius;

  return {
    width,
    height,
    radius,
    labelSize: ctx.typographyVariant(label).size,
    iconSize: icon.absoluteBoundingBox.width,
  };
}

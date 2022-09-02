import { findChildByName } from "../util/findChildByName";
import { findComponent } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function avatarConfig(): Omit<SimpleBentoConfig["avatar"], "icon" | "outline"> {
  const { findWithVariants } = findComponent("Avatar");

  const avatar = findWithVariants({
    Kind: "Initial",
  });
  const label = findChildByName(avatar, "Initial", "TEXT");

  const avatarWithIcon = findWithVariants({
    Kind: "Icon",
  });
  const icon = findChildByName(avatarWithIcon, "Icon");

  const width = avatar.width;
  const height = avatar.height;
  const radius = avatar.cornerRadius === width / 2 ? "circled" : (avatar.cornerRadius as number);

  return {
    width,
    height,
    radius,
    labelSize: typographyVariant(label).size,
    iconSize: icon.width,
  };
}

import { findComponent } from "../util/findComponent";
import { typographyVariant } from "../util/typographyVariant";

export function avatarConfig() {
  const { findWithVariants } = findComponent("Avatar");

  const avatar = findWithVariants({
    Kind: "Initial",
  });
  const label = avatar?.findOne((c) => c.name === "Initial") as TextNode;

  const avatarWithIcon = findWithVariants({
    Kind: "Icon",
  });
  const icon = avatarWithIcon?.findOne((c) => c.name === "Icon");

  const width = avatar?.width;
  const height = avatar?.height;
  const radius =
    width === height && width && avatar?.cornerRadius === width / 2
      ? "circled"
      : avatar?.cornerRadius;

  return {
    width,
    height,
    radius,
    labelSize: typographyVariant(label)?.size,
    iconSize: icon?.width,
    // TODO(gabro)
    outline: {},
  };
}

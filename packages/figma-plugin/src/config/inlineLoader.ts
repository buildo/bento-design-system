import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function inlineLoaderConfig(): Omit<SimpleBentoConfig["inlineLoader"], "spinnerIcon"> {
  const { findWithVariants } = findComponentInPage("Loader", "Inline Loader");

  const inlineLoader = findWithVariants({});

  // Not using findChildByName since the child is named inconsistently across Bento versions
  const message = inlineLoader.findChild((c) => c.type === "TEXT") as TextNode;
  const spinnerIcon = findChildByName(inlineLoader, "Icon");

  return {
    messageSize: typographyVariant(message).size,
    spinnerIconSize: spinnerIcon.width,
  };
}

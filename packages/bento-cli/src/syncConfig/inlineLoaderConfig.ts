import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import * as Figma from "figma-api";

export function inlineLoaderConfig(
  ctx: Ctx
): Omit<SimpleBentoConfig["inlineLoader"], "spinnerIcon"> {
  const { findWithVariants } = ctx.findComponentsInPage("Loader", "Inline Loader");

  const inlineLoader = findWithVariants({});

  // Not using findChildByName since the child is named inconsistently across Bento versions
  const message = inlineLoader.children.find((c) => c.type === "TEXT") as Figma.Node<"TEXT">;
  const spinnerIcon = findChildByName(inlineLoader, "Icon");

  return {
    messageSize: ctx.typographyVariant(message).size,
    spinnerIconSize: spinnerIcon.absoluteBoundingBox.width,
  };
}

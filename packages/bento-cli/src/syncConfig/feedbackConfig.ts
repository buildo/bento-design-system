import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function feedbackConfig(
  ctx: Ctx
): Omit<
  SimpleBentoConfig["feedback"],
  "background" | "positiveIllustration" | "negativeIllustration"
> {
  const { findWithVariants } = ctx.findComponentsInPage("Feedback");

  const feedbackLarge = findWithVariants({
    Size: "Large",
    Description: "True",
    Action: "True",
  });

  const feedbackMedium = findWithVariants({
    Size: "Medium",
    Description: "True",
    Action: "True",
  });

  const illustrationLarge = findChildByName(feedbackLarge, "Illustration");
  const illustrationMedium = findChildByName(feedbackMedium, "Illustration");

  const titleLarge = findChildByName(feedbackLarge, "Title", "TEXT");
  const titleMedium = findChildByName(feedbackMedium, "Title", "TEXT");

  const descriptionLarge = findChildByName(feedbackLarge, "Description", "TEXT");
  const descriptionMedium = findChildByName(feedbackMedium, "Description", "TEXT");

  const actionLargeInstance = findChildByName(feedbackLarge, "Button", "INSTANCE");
  const actionMediumInstance = findChildByName(feedbackMedium, "Button", "INSTANCE");

  const actionLarge = ctx.componentFromInstance(actionLargeInstance);
  const actionMedium = ctx.componentFromInstance(actionMediumInstance);

  return {
    illustrationSize: {
      large: illustrationLarge.absoluteBoundingBox.width,
      medium: illustrationMedium.absoluteBoundingBox.width,
    },
    title: {
      large: {
        size: ctx.typographyVariant(titleLarge).size,
        kind: ctx.typographyVariant(titleLarge).kind,
      },
      medium: ctx.typographyVariant(titleMedium).size,
    },
    descriptionSize: {
      large: ctx.typographyVariant(descriptionLarge).size,
      medium: ctx.typographyVariant(descriptionMedium).size,
    },
    action: {
      large: {
        kind: nameToVariantProperties(actionLarge.name)["Kind"].toLowerCase(),
        hierarchy: nameToVariantProperties(actionLarge.name)["Hierarchy"].toLowerCase(),
        size: nameToVariantProperties(actionLarge.name)["Size"].toLowerCase(),
      },
      medium: {
        kind: nameToVariantProperties(actionMedium.name)["Kind"].toLowerCase(),
        hierarchy: nameToVariantProperties(actionMedium.name)["Hierarchy"].toLowerCase(),
        size: nameToVariantProperties(actionMedium.name)["Size"].toLowerCase(),
      },
    },
    maxWidth: {
      large: descriptionLarge.absoluteBoundingBox.width,
      medium: descriptionMedium.absoluteBoundingBox.width,
    },
  };
}

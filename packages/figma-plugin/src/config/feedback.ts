import { findChildByName } from "../util/findChildByName";
import { findComponentInPage } from "../util/findComponent";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { typographyVariant } from "../util/typographyVariant";

export function feedbackConfig(): Omit<
  SimpleBentoConfig["feedback"],
  "background" | "positiveIllustration" | "negativeIllustration"
> {
  const { findWithVariants } = findComponentInPage("Feedback");

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

  const actionLarge = findChildByName(feedbackLarge, "Button", "INSTANCE");
  const actionMedium = findChildByName(feedbackMedium, "Button", "INSTANCE");

  return {
    illustrationSize: {
      large: illustrationLarge.width,
      medium: illustrationMedium.width,
    },
    title: {
      large: typographyVariant(titleLarge),
      medium: typographyVariant(titleMedium).size,
    },
    descriptionSize: {
      large: typographyVariant(descriptionLarge).size,
      medium: typographyVariant(descriptionMedium).size,
    },
    action: {
      large: {
        kind: actionLarge.variantProperties!["Kind"].toLowerCase(),
        hierarchy: actionLarge.variantProperties!["Hierarchy"].toLowerCase(),
        size: actionLarge.variantProperties!["Size"].toLowerCase(),
      },
      medium: {
        kind: actionMedium.variantProperties!["Kind"].toLowerCase(),
        hierarchy: actionMedium.variantProperties!["Hierarchy"].toLowerCase(),
        size: actionMedium.variantProperties!["Size"].toLowerCase(),
      },
    },
    maxWidth: {
      large: descriptionLarge.width,
      medium: descriptionMedium.width,
    },
  };
}

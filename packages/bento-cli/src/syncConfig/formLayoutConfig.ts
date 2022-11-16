import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";
import { Ctx } from "../util/Ctx.js";
import { nameToVariantProperties } from "./util/nameToVariantProperties.js";

export function formLayoutConfig(ctx: Ctx): {
  form: Omit<SimpleBentoConfig["formLayout"]["form"], "defaultErrorBannerWidth">;
  row: SimpleBentoConfig["formLayout"]["row"];
  section: SimpleBentoConfig["formLayout"]["section"];
} {
  const form = ctx.findComponentsInPage("Form").findWithVariants({});

  const formHeader = findChildByName(form, "Form Header", "FRAME");
  const formHeaderTitle = findChildByName(formHeader, "Form title", "TEXT");
  const formHeaderDescription = findChildByName(formHeader, "Form description", "TEXT");
  const formActionsInstance = findChildByName(form, "Actions", "INSTANCE");
  const formActions = ctx.componentFromInstance(formActionsInstance);

  const section = findChildByName(form, "Section", "FRAME");
  const sectionHeader = findChildByName(section, "Section header", "FRAME");
  const sectionTitle = findChildByName(sectionHeader, "Section title", "TEXT");
  const sectionDescription = findChildByName(sectionHeader, "Section description", "TEXT");

  const row = findChildByName(section, "Row", "FRAME");

  return {
    form: {
      headerTitle: {
        kind: ctx.typographyVariant(formHeaderTitle).kind,
        size: ctx.typographyVariant(formHeaderTitle).size,
      },
      headerDescriptionSize: ctx.typographyVariant(formHeaderDescription).size,
      formSpacing: form.itemSpacing,
      headerSpacing: formHeader.itemSpacing,
      defaultActionsSize: nameToVariantProperties(formActions.name)["Button size"].toLowerCase(),
    },
    row: {
      rowSpacing: row.itemSpacing,
    },
    section: {
      sectionTitleSize: ctx.typographyVariant(sectionTitle).size,
      sectionDescriptionSize: ctx.typographyVariant(sectionDescription).size,
      sectionHeaderSpacing: sectionHeader.itemSpacing,
      sectionSpacing: section.itemSpacing,
    },
  };
}

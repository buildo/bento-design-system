import { findChildByName } from "../util/findChildByName";
import { SimpleBentoConfig } from "../util/SimpleBentoConfig";
import { stripEmojis } from "../util/stripEmojis";
import { typographyVariant } from "../util/typographyVariant";

export function formLayoutConfig(): {
  form: Omit<SimpleBentoConfig["formLayout"]["form"], "defaultErrorBannerWidth">;
  row: SimpleBentoConfig["formLayout"]["row"];
  section: SimpleBentoConfig["formLayout"]["section"];
} {
  const formPage = figma.root.findChild((c) => stripEmojis(c.name).trim() === "Form");
  const form = formPage!.children[0] as ComponentSetNode;

  const formHeader = findChildByName(form, "Form Header", "FRAME");
  const formHeaderTitle = findChildByName(formHeader, "Form title", "TEXT");
  const formHeaderDescription = findChildByName(formHeader, "Form description", "TEXT");
  const formActions = findChildByName(form, "Actions", "INSTANCE");

  const section = findChildByName(form, "Section", "FRAME");
  const sectionHeader = findChildByName(section, "Section header", "FRAME");
  const sectionTitle = findChildByName(sectionHeader, "Section title", "TEXT");
  const sectionDescription = findChildByName(sectionHeader, "Section description", "TEXT");

  const row = findChildByName(section, "Row", "FRAME");

  return {
    form: {
      headerTitle: {
        kind: typographyVariant(formHeaderTitle).kind,
        size: typographyVariant(formHeaderTitle).size,
      },
      headerDescriptionSize: typographyVariant(formHeaderDescription).size,
      formSpacing: form.itemSpacing,
      headerSpacing: formHeader.itemSpacing,
      defaultActionsSize: formActions.variantProperties?.["Button size"].toLowerCase(),
    },
    row: {
      rowSpacing: row.itemSpacing,
    },
    section: {
      sectionTitleSize: typographyVariant(sectionTitle).size,
      sectionDescriptionSize: typographyVariant(sectionDescription).size,
      sectionHeaderSpacing: sectionHeader.itemSpacing,
      sectionSpacing: section.itemSpacing,
    },
  };
}

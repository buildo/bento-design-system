import { FunctionComponent } from "react";
import { ActionsProps } from "src";
import { createForm, FormConfig } from "./Form";
import { createFormRow, FormRowConfig } from "./FormRow";
import { createFormSection, FormSectionConfig } from "./FormSection";

type FormLayoutConfig = {
  form: FormConfig;
  section: FormSectionConfig;
  row: FormRowConfig;
};

export function createFormLayoutComponents(
  Actions: FunctionComponent<ActionsProps>,
  config: FormLayoutConfig = {
    form: {
      headerTitleSize: {
        desktop: "small",
        mobile: "medium",
      },
      headerDescriptionSize: "medium",
      formSpacing: 40,
      headerSpacing: 16,
      actionsSize: "large",
    },
    section: {
      sectionTitleSize: "large",
      sectionDescriptionSize: "medium",
      sectionHeaderSpacing: 8,
      sectionSpacing: 24,
    },
    row: {
      rowSpacing: 16,
    },
  }
) {
  const Form = createForm(Actions, config.form);
  const FormSection = createFormSection(config.section);
  const FormRow = createFormRow(config.row);

  return { Form, FormSection, FormRow };
}

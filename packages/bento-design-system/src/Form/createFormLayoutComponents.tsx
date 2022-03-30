import { FunctionComponent } from "react";
import { ActionsProps } from "../";
import { createForm, FormConfig } from "./Form";
import { createFormRow, FormRowConfig } from "./FormRow";
import { createFormSection, FormSectionConfig } from "./FormSection";

type FormLayoutConfig = {
  form: FormConfig;
  section: FormSectionConfig;
  row: FormRowConfig;
};
export const defaultFormLayoutConfig: FormLayoutConfig = {
  form: {
    headerTitleSize: "small",
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
};

export function createFormLayoutComponents(
  config: FormLayoutConfig,
  {
    Actions,
  }: {
    Actions: FunctionComponent<ActionsProps>;
  }
) {
  const Form = createForm(config.form, { Actions });
  const FormSection = createFormSection(config.section);
  const FormRow = createFormRow(config.row);

  return { Form, FormSection, FormRow };
}

export type { FormProps } from "./Form";
export type { FormRowProps } from "./FormRow";
export type { FormSectionProps } from "./FormSection";

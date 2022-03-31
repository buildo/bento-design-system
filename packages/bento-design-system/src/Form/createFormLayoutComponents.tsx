import { FunctionComponent } from "react";
import { ActionsProps } from "../";
import { FormLayoutConfig } from "./Config";
import { createForm } from "./Form";
import { createFormRow } from "./FormRow";
import { createFormSection } from "./FormSection";

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

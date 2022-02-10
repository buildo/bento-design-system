import { ComponentProps } from "react";
import { Body, Label } from "..";
import { createField } from "./createField";
import { createTextField, TextFieldConfig } from "../TextField/createTextField";
import { CheckboxFieldConfig, createCheckboxField } from "../CheckboxField/createCheckboxField";

type FieldsConfig = {
  labelSize: ComponentProps<typeof Label>["size"];
  assistiveTextSize: ComponentProps<typeof Body>["size"];
  input: TextFieldConfig;
  checkbox: CheckboxFieldConfig;
};

export function createFormFields(
  config: FieldsConfig = {
    labelSize: "small",
    assistiveTextSize: "small",
    input: {
      radius: 8,
      paddingX: 16,
      paddingY: 16,
      fontSize: "large",
    },
    checkbox: {
      labelSpacing: 8,
    },
  }
) {
  const Field = createField({
    label: { size: config.labelSize },
    assistiveText: { size: config.assistiveTextSize, paddingLeft: config.input.paddingX },
  });

  const TextField = createTextField(Field, config.input);
  const CheckboxField = createCheckboxField(Field, config.checkbox);

  return { Field, TextField, CheckboxField };
}

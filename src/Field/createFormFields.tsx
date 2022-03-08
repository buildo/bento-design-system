import { createField, FieldConfig } from "./createField";
import { createTextField } from "../TextField/createTextField";
import { createRadioGroupField } from "../RadioGroupField/createRadioGroupField";
import { createNumberInput } from "../NumberInput/createNumberInput";
import { createNumberField } from "../NumberField/createNumberField";
import { createSelectField, DropdownConfig } from "../SelectField/createSelectField";
import { SelectionControlConfig } from "./SelectionControlConfig";
import { defaultInputConfig, InputConfig } from "./InputConfig";
import { createCheckboxField } from "../CheckboxField/createCheckboxField";
import { createCheckboxGroupField } from "../CheckboxGroupField/createCheckboxGroupField";

type FieldsConfig = {
  field: FieldConfig;
  input: InputConfig;
  selectionControl: SelectionControlConfig;
  dropdown: DropdownConfig;
};

export function createFormFields(
  config: FieldsConfig = {
    field: {
      label: { size: "small" },
      assistiveText: {
        size: "small",
        paddingLeft: 16,
      },
      internalSpacing: 4,
    },
    input: defaultInputConfig,
    selectionControl: {
      paddingY: 8,
      controlLabelSpacing: 8,
      internalSpacing: {
        horizontal: 24,
        vertical: 16,
      },
    },
    dropdown: {
      elevation: "medium",
      radius: 8,
      menuPaddingY: 8,
      list: {
        item: {
          paddingX: 16,
          paddingY: {
            medium: 8,
            large: 16,
          },
          fontSize: {
            firstLine: "medium",
            secondLine: "small",
            overline: "small",
          },
          internalSpacing: 16,
          iconSize: {
            leading: 24,
            trailing: 16,
            illustration: 32,
          },
        },
      },
    },
  }
) {
  const Field = createField(config.field);
  const TextField = createTextField(Field, config.input);
  const CheckboxField = createCheckboxField(Field, config.selectionControl);
  const CheckboxGroupField = createCheckboxGroupField(Field, config.selectionControl);
  const RadioGroupField = createRadioGroupField(Field, config.selectionControl);
  const NumberInput = createNumberInput(config.input);
  const NumberField = createNumberField(Field, NumberInput);
  const SelectField = createSelectField(Field, config.input, config.dropdown);

  return {
    CheckboxField,
    CheckboxGroupField,
    Field,
    NumberField,
    RadioGroupField,
    SelectField,
    TextField,
  };
}

export type { SelectOption } from "../SelectField/createSelectField";
export type { RadioOption } from "../RadioGroupField/createRadioGroupField";
export type { CheckboxOption } from "../CheckboxGroupField/createCheckboxGroupField";

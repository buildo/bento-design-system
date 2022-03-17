import { createField, FieldConfig } from "./createField";
import { createTextField } from "../TextField/createTextField";
import { createRadioGroupField } from "../RadioGroupField/createRadioGroupField";
import { createNumberInput } from "../NumberInput/createNumberInput";
import { createNumberField } from "../NumberField/createNumberField";
import { createSelectField, DropdownConfig } from "../SelectField/createSelectField";
import { SelectionControlConfig, SelectionControlGroupConfig } from "./SelectionControlConfig";
import { InputConfig } from "./InputConfig";
import { createCheckboxField } from "../CheckboxField/createCheckboxField";
import { createCheckboxGroupField } from "../CheckboxGroupField/createCheckboxGroupField";
import { FunctionComponent } from "react";
import { TooltipProps } from "..";
import { createReadOnlyField } from "../ReadOnlyField/createReadOnlyField";

type FieldsConfig = {
  field: FieldConfig;
  input: InputConfig;
  selectionControl: {
    group: SelectionControlGroupConfig;
    element: SelectionControlConfig;
  };
  dropdown: DropdownConfig;
};

export function createFormFields(Tooltip: FunctionComponent<TooltipProps>, config: FieldsConfig) {
  const Field = createField(Tooltip, config.field);
  const TextField = createTextField(Field, config.input);
  const CheckboxField = createCheckboxField(Field, config.selectionControl.element);
  const CheckboxGroupField = createCheckboxGroupField(Field, config.selectionControl);
  const RadioGroupField = createRadioGroupField(Field, config.selectionControl);
  const NumberInput = createNumberInput(config.input);
  const NumberField = createNumberField(Field, NumberInput);
  const SelectField = createSelectField(Field, config.input, config.dropdown);
  const ReadOnlyField = createReadOnlyField(TextField);

  return {
    CheckboxField,
    CheckboxGroupField,
    Field,
    NumberField,
    RadioGroupField,
    SelectField,
    TextField,
    ReadOnlyField,
  };
}

export type { SelectOption } from "../SelectField/createSelectField";
export type { RadioOption } from "../RadioGroupField/createRadioGroupField";
export type { CheckboxOption } from "../CheckboxGroupField/createCheckboxGroupField";
export { defaultSelectionControlConfig } from "./SelectionControlConfig";
export { defaultDropdownConfig } from "../SelectField/createSelectField";
export { defaultInputConfig } from "./InputConfig";
export { defaultFieldConfig } from "./createField";

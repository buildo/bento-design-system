import { createField } from "./createField";
import { createTextField } from "../TextField/createTextField";
import { createRadioGroupField } from "../RadioGroupField/createRadioGroupField";
import { createNumberInput } from "../NumberInput/createNumberInput";
import { createNumberField } from "../NumberField/createNumberField";
import { createSelectField } from "../SelectField/createSelectField";
import { createCheckboxField } from "../CheckboxField/createCheckboxField";
import { createCheckboxGroupField } from "../CheckboxGroupField/createCheckboxGroupField";
import { FunctionComponent } from "react";
import { TooltipProps } from "..";
import { createReadOnlyField } from "../ReadOnlyField/createReadOnlyField";
import {
  FieldConfig,
  InputConfig,
  SelectionControlConfig,
  SelectionControlGroupConfig,
} from "./Config";
import { DropdownConfig } from "../SelectField/Config";
import { createSlider } from "../Slider/createSlider";
import { SliderConfig } from "../Slider/Config";
import { createSliderField } from "../SliderField/createSliderField";

type FieldsConfig = {
  field: FieldConfig;
  input: InputConfig;
  selectionControl: {
    group: SelectionControlGroupConfig;
    element: SelectionControlConfig;
  };
  dropdown: DropdownConfig;
  slider: SliderConfig;
};

export function createFormFields(
  config: FieldsConfig,
  {
    Tooltip,
  }: {
    Tooltip: FunctionComponent<TooltipProps>;
  }
) {
  const Field = createField(config.field, { Tooltip });
  const TextField = createTextField(config.input, { Field });
  const CheckboxField = createCheckboxField(config.selectionControl.element, { Field });
  const CheckboxGroupField = createCheckboxGroupField(config.selectionControl, { Field });
  const RadioGroupField = createRadioGroupField(config.selectionControl, { Field });
  const NumberInput = createNumberInput(config.input);
  const NumberField = createNumberField({ Field, NumberInput });
  const SelectField = createSelectField(config.input, config.dropdown, { Field });
  const ReadOnlyField = createReadOnlyField({ TextField });
  const Slider = createSlider(config.slider);
  const SliderField = createSliderField({ Slider, Field });

  return {
    CheckboxField,
    CheckboxGroupField,
    Field,
    NumberField,
    RadioGroupField,
    SelectField,
    TextField,
    ReadOnlyField,
    Slider,
    SliderField,
  };
}

export type { TextFieldProps } from "../TextField/createTextField";
export type { ReadOnlyFieldProps } from "../ReadOnlyField/createReadOnlyField";
export type { SelectOption, SelectFieldProps } from "../SelectField/createSelectField";
export type { RadioOption, RadioGroupFieldProps } from "../RadioGroupField/createRadioGroupField";
export type {
  CheckboxOption,
  CheckboxGroupFieldProps,
} from "../CheckboxGroupField/createCheckboxGroupField";
export type { NumberFieldProps } from "../NumberField/createNumberField";
export type { SliderFieldProps } from "../SliderField/createSliderField";
export type { CheckboxFieldProps } from "../CheckboxField/createCheckboxField";

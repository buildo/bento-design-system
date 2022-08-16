import { createField } from "./Field";
import { createTextField } from "../TextField/createTextField";
import { createRadioGroupField } from "../RadioGroupField/createRadioGroupField";
import { createNumberInput } from "../NumberInput/createNumberInput";
import { createNumberField } from "../NumberField/createNumberField";
import { createSelectField } from "../SelectField/createSelectField";
import { createCheckboxField } from "../CheckboxField/CheckboxField";
import { createCheckboxGroupField } from "../CheckboxGroupField/CheckboxGroupField";
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
import { DateFieldConfig } from "../DateField/Config";
import { createDateField } from "../DateField/createDateField";
import { IconButtonProps } from "../IconButton/IconButton";
import { MenuProps } from "../Menu/createMenu";
import { ButtonProps } from "../Button/Button";
import { createTextArea } from "../TextArea/createTextArea";

type FieldsConfig = {
  field: FieldConfig;
  input: InputConfig;
  selectionControl: {
    group: SelectionControlGroupConfig;
    element: SelectionControlConfig;
  };
  dropdown: DropdownConfig;
  slider: SliderConfig;
  date: DateFieldConfig;
};

export function createFormFields(
  config: FieldsConfig,
  {
    Tooltip,
    IconButton,
    Menu,
    Button,
  }: {
    Tooltip: FunctionComponent<TooltipProps>;
    IconButton: FunctionComponent<IconButtonProps>;
    Menu: FunctionComponent<MenuProps>;
    Button: FunctionComponent<ButtonProps>;
  }
) {
  const Field = createField(config.field, { Tooltip });
  const TextField = createTextField(config.input, { Field, IconButton });
  const CheckboxField = createCheckboxField(config.selectionControl.element, { Field });
  const CheckboxGroupField = createCheckboxGroupField(config.selectionControl, { Field });
  const RadioGroupField = createRadioGroupField(config.selectionControl, { Field });
  const NumberInput = createNumberInput(config.input);
  const NumberField = createNumberField({ Field, NumberInput });
  const SelectField = createSelectField(config.input, config.dropdown, { Field, Button });
  const ReadOnlyField = createReadOnlyField({ TextField });
  const Slider = createSlider(config.slider);
  const SliderField = createSliderField({ Slider, Field });
  const DateField = createDateField(config.date, config.input, { Field, IconButton, Menu, Button });
  const TextArea = createTextArea(config.input, { Field });

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
    DateField,
    TextArea,
  };
}

export type { TextFieldProps } from "../TextField/createTextField";
export type { ReadOnlyFieldProps } from "../ReadOnlyField/createReadOnlyField";
export type { SelectOption, SelectFieldProps } from "../SelectField/createSelectField";
export type { RadioOption, RadioGroupFieldProps } from "../RadioGroupField/createRadioGroupField";
export type {
  CheckboxOption,
  CheckboxGroupFieldProps,
} from "../CheckboxGroupField/CheckboxGroupField";
export type { NumberFieldProps } from "../NumberField/createNumberField";
export type { SliderFieldProps } from "../SliderField/createSliderField";
export type { CheckboxFieldProps } from "../CheckboxField/CheckboxField";
export type { DateFieldProps } from "../DateField/createDateField";
export type { TextAreaProps } from "../TextArea/createTextArea";

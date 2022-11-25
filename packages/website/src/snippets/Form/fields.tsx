import {
  TextField,
  SelectFieldProps,
  SliderFieldProps,
  NumberField,
  RadioGroupField,
  SelectField,
  SliderField,
  Omit,
} from "..";
import * as React from "react";
import { ComponentProps, useState } from "react";

export const ExampleTextField = (
  props: Omit<
    ComponentProps<typeof TextField>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur"
  >
) => {
  const [value, onChange] = useState("");
  return (
    <TextField
      placeholder="Insert a value"
      value={value}
      onChange={onChange}
      name="textField"
      hint="Some useful advice on how to fill this field"
      {...props}
    />
  );
};

export const ExampleNumberField = (
  props: Omit<
    ComponentProps<typeof NumberField>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur"
  >
) => {
  const [value, onChange] = useState<number | undefined>(undefined);
  return (
    <NumberField
      placeholder="Insert a value"
      value={value}
      onChange={onChange}
      name="numberField"
      {...props}
    />
  );
};

export const ExampleSelectField = <A extends {}>(
  props: Omit<
    SelectFieldProps<A, false>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur" | "menuSize"
  >
) => {
  const [value, onChange] = useState<A | undefined>(undefined);
  return (
    <SelectField
      placeholder="Select a value"
      value={value}
      onChange={onChange}
      name="selectField"
      {...props}
    />
  );
};

export const ExampleRadioGroupField = (
  props: Omit<ComponentProps<typeof RadioGroupField>, "value" | "onChange" | "name" | "onBlur">
) => {
  const [value, onChange] = useState<string | number | boolean | undefined>(undefined);
  return <RadioGroupField value={value} onChange={onChange} name="radioGroupField" {...props} />;
};

export const ExampleSliderField = (
  props: Omit<
    SliderFieldProps & { type: "single"; kind: "decimal" },
    "value" | "onChange" | "type" | "kind" | "name" | "onBlur"
  > & {
    initialValue?: number;
  }
) => {
  const [value, onChange] = useState(props.initialValue ?? 1);
  return (
    <SliderField
      minValue={props.minValue}
      maxValue={props.maxValue}
      label={props.label}
      name="slider"
      type="single"
      kind="decimal"
      value={value}
      onChange={onChange}
    />
  );
};

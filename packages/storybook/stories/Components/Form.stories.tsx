import { action } from "@storybook/addon-actions";
import { ComponentProps, useState } from "react";
import { SelectFieldProps } from "..";
import {
  Form,
  FormSection,
  FormRow,
  TextField,
  NumberField,
  SelectField,
  RadioGroupField,
  Omit,
} from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Form,
  args: {},
  argTypes: {},
});

export default defaultExport;

const ExampleTextField = (
  props: Omit<
    ComponentProps<typeof TextField>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur"
  >
) => {
  const [value, onChange] = useState("");
  return (
    <TextField
      placeholder={formatMessage("Insert a value")}
      value={value}
      onChange={onChange}
      onBlur={() => {}}
      name="textField"
      hint={formatMessage("Some useful advice on how to fill this field")}
      {...props}
    />
  );
};

const ExampleNumberField = (
  props: Omit<
    ComponentProps<typeof NumberField>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur"
  >
) => {
  const [value, onChange] = useState<number | undefined>(undefined);
  return (
    <NumberField
      placeholder={formatMessage("Insert a value")}
      value={value}
      onChange={onChange}
      onBlur={() => {}}
      name="numberField"
      {...props}
    />
  );
};

const ExampleSelectField = <A extends {}>(
  props: Omit<
    SelectFieldProps<A, false>,
    "placeholder" | "value" | "onChange" | "name" | "onBlur" | "multiValueMessage"
  >
) => {
  const [value, onChange] = useState<A | undefined>(undefined);
  return (
    <SelectField
      placeholder={formatMessage("Select a value")}
      value={value}
      onChange={onChange}
      name="selectField"
      onBlur={() => {}}
      isMulti={false}
      {...props}
    />
  );
};

const ExampleRadioGroupField = (
  props: Omit<ComponentProps<typeof RadioGroupField>, "value" | "onChange" | "name" | "onBlur">
) => {
  const [value, onChange] = useState<string | number | boolean | undefined>(undefined);
  return (
    <RadioGroupField
      value={value}
      onChange={onChange}
      name="radioGroupField"
      onBlur={() => {}}
      {...props}
    />
  );
};

export const multipleSections = createStory({
  title: formatMessage("Sign-up"),
  description: formatMessage("We will ask you some data in order to sign you up"),
  submitButton: {
    onPress: action("Submit"),
    label: formatMessage("Sign up"),
  },
  secondaryButton: {
    onPress: action("Cancel"),
    label: formatMessage("Never mind"),
  },
  children: [
    <FormSection title={formatMessage("Personal information")}>
      <FormRow>
        <ExampleTextField label={formatMessage("First name")} />
        <ExampleTextField label={formatMessage("Last name")} />
      </FormRow>
    </FormSection>,
    <FormSection
      title={formatMessage("Address")}
      description={formatMessage("We need this data for invoicing purposes")}
    >
      <FormRow>
        <ExampleTextField label={formatMessage("Street")} />
        <ExampleTextField label={formatMessage("Number")} />
      </FormRow>
      <FormRow>
        <ExampleTextField label={formatMessage("City")} />
      </FormRow>
      <FormRow>
        <ExampleTextField label={formatMessage("Country")} />
      </FormRow>
    </FormSection>,
    <FormSection title={formatMessage("Tell us more about you")}>
      <FormRow>
        <ExampleNumberField
          label={formatMessage("Average income")}
          kind="currency"
          currency="EUR"
        />
        <ExampleNumberField
          label={formatMessage("% of income spent on candies")}
          kind="percentage"
        />
      </FormRow>
      <FormRow>
        <ExampleSelectField
          label={formatMessage("Select your gender")}
          options={[
            { label: formatMessage("Male"), value: "M", kind: "single-line" },
            { label: formatMessage("Female"), value: "F", kind: "single-line" },
            { label: formatMessage("Other"), value: "O", kind: "single-line" },
          ]}
        />
      </FormRow>
      <FormRow>
        <ExampleRadioGroupField
          label={formatMessage("What's your main income source?")}
          options={[
            { label: formatMessage("Working"), value: "W" },
            { label: formatMessage("Inheritance"), value: "I" },
            { label: formatMessage("Other"), value: "O" },
          ]}
        />
      </FormRow>
    </FormSection>,
  ],
});

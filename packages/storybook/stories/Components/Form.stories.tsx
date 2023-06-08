import { action } from "@storybook/addon-actions";
import { ComponentProps, useState } from "react";
import {
  SelectFieldProps,
  Form,
  FormSection,
  FormRow,
  TextField,
  NumberField,
  SelectField,
  RadioGroupField,
  Omit,
} from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

const ExampleTextField = (
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

const ExampleNumberField = (
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

const ExampleSelectField = <A extends {}>(
  props: Omit<
    SelectFieldProps<A> & { isMulti?: false },
    "placeholder" | "value" | "onChange" | "name" | "onBlur" | "multiValueMessage"
  >
) => {
  const [value, onChange] = useState<A | undefined>(undefined);
  return (
    <SelectField
      placeholder="Select a value"
      value={value}
      onChange={onChange}
      name="selectField"
      isMulti={false}
      {...props}
    />
  );
};

const ExampleRadioGroupField = (
  props: Omit<ComponentProps<typeof RadioGroupField>, "value" | "onChange" | "name" | "onBlur">
) => {
  const [value, onChange] = useState<string | number | boolean | undefined>(undefined);
  return <RadioGroupField value={value} onChange={onChange} name="radioGroupField" {...props} />;
};

export const multipleSections = {
  args: {
    title: "Sign-up",
    description: "We will ask you some data in order to sign you up",
    submitButton: {
      onPress: action("Submit"),
      label: "Sign up",
      name: "action",
      value: "submit",
    },
    secondaryButton: {
      onPress: action("Cancel"),
      label: "Never mind",
      name: "action",
      value: "cancel",
    },
    children: (
      <>
        <FormSection title="Personal information">
          <FormRow>
            <ExampleTextField label="First name" />
            <ExampleTextField label="Last name" />
          </FormRow>
        </FormSection>
        <FormSection title="Address" description="We need this data for invoicing purposes">
          <FormRow>
            <ExampleTextField label="Street" />
            <ExampleTextField label="Number" />
          </FormRow>
          <FormRow>
            <ExampleTextField label="City" />
          </FormRow>
          <FormRow>
            <ExampleTextField label="Country" />
          </FormRow>
        </FormSection>
        <FormSection title="Tell us more about you">
          <FormRow>
            <ExampleNumberField label="Average income" kind="currency" currency="EUR" />
            <ExampleNumberField label="% of income spent on candies" kind="percentage" />
          </FormRow>
          <FormRow>
            <ExampleSelectField
              label="Select your gender"
              options={[
                { label: "Male", value: "M", kind: "single-line" },
                { label: "Female", value: "F", kind: "single-line" },
                { label: "Other", value: "O", kind: "single-line" },
              ]}
            />
          </FormRow>
          <FormRow>
            <ExampleRadioGroupField
              label={"What's your main income source?"}
              options={[
                { label: "Working", value: "W" },
                { label: "Inheritance", value: "I" },
                { label: "Other", value: "O" },
              ]}
            />
          </FormRow>
        </FormSection>
      </>
    ),
  },
} satisfies Story;

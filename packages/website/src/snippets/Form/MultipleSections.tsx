import * as React from "react";
import { Form, FormSection, FormRow } from "..";
import {
  ExampleNumberField,
  ExampleRadioGroupField,
  ExampleSelectField,
  ExampleSliderField,
  ExampleTextField,
} from "./fields";

export default function MultipleSections() {
  return (
    <Form title="Sign-up" description="We will ask you some data in order to sign you up">
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
              { label: "Male", value: "M" },
              { label: "Female", value: "F" },
              { label: "Other", value: "O" },
            ]}
          />
        </FormRow>
        <FormRow>
          <ExampleSliderField
            initialValue={4}
            label="How would you rate yourself from 1 to 10?"
            minValue={1}
            maxValue={10}
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
    </Form>
  );
}

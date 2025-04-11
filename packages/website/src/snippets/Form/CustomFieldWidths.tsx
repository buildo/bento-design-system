import * as React from "react";
import { Form, FormSection, FormRow, Column } from "..";
import {
  ExampleNumberField,
  ExampleRadioGroupField,
  ExampleSelectField,
  ExampleSliderField,
  ExampleTextField,
} from "./fields";

export default function CustomFieldWidths() {
  return (
    <Form title="Sign-up" description="We will ask you some data in order to sign you up">
      <FormSection title="Personal information">
        <FormRow>
          <ExampleTextField label="First name" />
          <ExampleTextField label="Last name" />
        </FormRow>
      </FormSection>
      ,
      <FormSection title="Address" description="We need this data for invoicing purposes">
        <FormRow>
          <ExampleTextField label="Street" />
          <Column width="1/5">
            <ExampleTextField label="Number" />
          </Column>
        </FormRow>
        <FormRow>
          <Column width="1/2">
            <ExampleTextField label="City" />
          </Column>
        </FormRow>
        <FormRow>
          <Column width="1/2">
            <ExampleTextField label="Country" />
          </Column>
        </FormRow>
      </FormSection>
      <FormSection title="Tell us more about you">
        <FormRow>
          <ExampleNumberField label="Average income" kind="currency" currency="EUR" />
          <ExampleNumberField label="% of income spent on candies" kind="percentage" />
        </FormRow>
        <FormRow>
          <Column width="1/2">
            <ExampleSelectField
              label="Select your gender"
              options={[
                { label: "Male", value: "M" },
                { label: "Female", value: "F" },
                { label: "Other", value: "O" },
              ]}
            />
          </Column>
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
            label="What's your main income source?"
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

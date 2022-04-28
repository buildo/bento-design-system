import * as React from "react";
import { Form, FormSection, FormRow } from "..";
import { ExampleTextField } from "./fields";

export default function Basic() {
  return (
    <Form>
      <FormSection>
        <FormRow>
          <ExampleTextField label="First name" />
          <ExampleTextField label="Last name" />
        </FormRow>
      </FormSection>
    </Form>
  );
}

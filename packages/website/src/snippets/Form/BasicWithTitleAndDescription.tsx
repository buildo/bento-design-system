import * as React from "react";
import { Form, FormSection, FormRow } from "..";
import { ExampleTextField } from "./fields";

export default function BasicWithTitleAndDescription() {
  return (
    <Form title="Sign-up" description="We will ask you some data in order to sign you up">
      <FormSection>
        <FormRow>
          <ExampleTextField label="First name" />
          <ExampleTextField label="Last name" />
        </FormRow>
      </FormSection>
    </Form>
  );
}

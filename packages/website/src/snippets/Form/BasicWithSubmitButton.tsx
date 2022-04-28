import * as React from "react";
import { Form, FormSection, FormRow } from "..";
import { ExampleTextField } from "./fields";

export default function BasicWithSubmitButton() {
  return (
    <Form
      title="Sign-up"
      description="We will ask you some data in order to sign you up"
      submitButton={{
        onPress: () => window.alert("Submitted!"),
        label: "Sign up",
      }}
    >
      <FormSection>
        <FormRow>
          <ExampleTextField label="First name" />
          <ExampleTextField label="Last name" />
        </FormRow>
      </FormSection>
    </Form>
  );
}

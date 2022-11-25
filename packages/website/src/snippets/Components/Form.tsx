import * as React from "react";
import { Form, FormSection, FormRow, TextField } from "..";

export default function FormExample() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  return (
    <Form
      title="Personal information"
      description="Type here your personal information"
      submitButton={{ label: "Submit", onPress: () => window.alert("Submit!") }}
    >
      <FormSection>
        <FormRow>
          <TextField
            name="name"
            placeholder="Type here..."
            label="Name"
            value={name}
            onChange={setName}
          />
          <TextField
            name="surname"
            placeholder="Type here..."
            label="Surname"
            value={surname}
            onChange={setSurname}
          />
        </FormRow>
      </FormSection>
    </Form>
  );
}

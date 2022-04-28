import * as React from "react";
import { Form, FormSection, FormRow, TextField } from "..";
import { formatMessage } from "../formatMessage";

export default function FormExample() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  return (
    <Form
      title={formatMessage("Personal information")}
      description={formatMessage("Type here your personal information")}
      submitButton={{ label: formatMessage("Submit"), onPress: () => window.alert("Submit!") }}
    >
      <FormSection>
        <FormRow>
          <TextField
            name="name"
            placeholder={formatMessage("Type here...")}
            label={formatMessage("Name")}
            value={name}
            onChange={setName}
            onBlur={() => {}}
          />
          <TextField
            name="surname"
            placeholder={formatMessage("Type here...")}
            label={formatMessage("Surname")}
            value={surname}
            onChange={setSurname}
            onBlur={() => {}}
          />
        </FormRow>
      </FormSection>
    </Form>
  );
}

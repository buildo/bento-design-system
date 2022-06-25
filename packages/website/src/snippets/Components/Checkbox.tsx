import * as React from "react";
import { Body, Box, Card, Column, Checkbox, Columns, Stack, Title } from "..";

export default function CheckboxFieldExample() {
  const [checked, toggleChecked] = React.useReducer((value) => !value, false);
  return (
    <Card>
      <Box
        padding={24}
        background={checked ? "softOrange" : "backgroundPrimary"}
        onClick={toggleChecked}
        cursor={{
          default: "pointer",
          disabled: "notAllowed",
        }}
      >
        <Columns space={16}>
          <Column width="content">
            <Checkbox aria-label="Toggle card selection" value={checked} onChange={toggleChecked} />
          </Column>
          <Stack space={8}>
            <Title size="medium">Selectable card</Title>
            <Body size="medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Body>
          </Stack>
        </Columns>
      </Box>
    </Card>
  );
}

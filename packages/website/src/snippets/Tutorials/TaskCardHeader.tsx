import * as React from "react";
import { Box, Button, Chip, Column, Columns, Placeholder, Stack, Title } from "..";
import { taskCardRecipe } from "./TaskCard.css";

export default function TaskCard() {
  return (
    <Box className={taskCardRecipe({ status: "InProgress" })}>
      <Stack space={8}>
        <Columns space={16} alignY="center">
          <Title size="medium">Task name</Title>
          <Column width="content">
            <Columns space={8} alignY="center">
              <Button
                size="small"
                kind="transparent"
                hierarchy="primary"
                label="Block"
                onPress={() => {}}
              />
              <Chip color="blue" label="Running" />
            </Columns>
          </Column>
        </Columns>
        <Placeholder label="task content" height={50} />
        <Placeholder label="task steps" height={30} />
      </Stack>
    </Box>
  );
}

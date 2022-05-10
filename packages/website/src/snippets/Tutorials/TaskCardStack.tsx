import * as React from "react";
import { Box, Placeholder, Stack } from "..";
import { taskCardRecipe } from "./TaskCard.css";

export default function TaskCard() {
  return (
    <Box className={taskCardRecipe({ status: "InProgress" })}>
      <Stack space={8}>
        <Placeholder label="task header" height={30} />
        <Placeholder label="task content" height={50} />
        <Placeholder label="task steps" height={30} />
      </Stack>
    </Box>
  );
}

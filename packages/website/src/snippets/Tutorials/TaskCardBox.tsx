import * as React from "react";
import { Title, Box } from "..";
import { taskCardRecipe } from "./TaskCard.css";

export default function TaskCard() {
  return (
    <Box className={taskCardRecipe({ status: "InProgress" })}>
      <Title size="large">This is a task</Title>
    </Box>
  );
}

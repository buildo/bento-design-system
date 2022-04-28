import * as React from "react";
import { Feedback, Stack } from "..";
import { formatMessage } from "../formatMessage";

export default function FeedbackExample() {
  return (
    <Stack space={0} align="center">
      <Feedback
        size="medium"
        title={formatMessage("Error!")}
        description={formatMessage("Something went wrong!")}
        status="negative"
      />
    </Stack>
  );
}

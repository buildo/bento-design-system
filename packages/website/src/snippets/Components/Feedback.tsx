import * as React from "react";
import { Feedback, Stack } from "..";

export default function FeedbackExample() {
  return (
    <Stack space={0} align="center">
      <Feedback
        size="medium"
        title="Error!"
        description="Something went wrong!"
        status="negative"
      />
    </Stack>
  );
}

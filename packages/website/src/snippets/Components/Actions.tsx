import * as React from "react";
import { Actions } from "..";
import { formatMessage } from "../formatMessage";

export default function ButtonExample() {
  return (
    <Actions
      size="medium"
      primaryAction={{
        label: formatMessage("Ok"),
        onPress: () =>
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
      }}
      secondaryAction={{
        label: formatMessage("Cancel"),
        onPress: () => window.alert("Cancel"),
      }}
      error={formatMessage("Something went wrong!")}
    />
  );
}

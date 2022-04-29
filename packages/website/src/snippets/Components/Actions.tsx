import * as React from "react";
import { Actions } from "..";

export default function ActionsExample() {
  return (
    <Actions
      size="medium"
      primaryAction={{
        label: "Ok",
        onPress: () =>
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          }),
      }}
      secondaryAction={{
        label: "Cancel",
        onPress: () => window.alert("Cancel"),
      }}
      error="Something went wrong!"
    />
  );
}

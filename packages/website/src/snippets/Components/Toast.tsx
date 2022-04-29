import * as React from "react";
import { Button, useToast } from "..";

export default function ToastExample() {
  const { showToast } = useToast();
  return (
    <Button
      kind="solid"
      hierarchy="primary"
      label="Click to show toast!"
      onPress={() =>
        showToast({
          kind: "informative",
          message: "Informative toast",
          dismissable: true,
        })
      }
    />
  );
}

import * as React from "react";
import { Button, useToast } from "..";
import { formatMessage } from "../formatMessage";

export default function ToastExample() {
  const { showToast } = useToast();
  return (
    <Button
      kind="solid"
      hierarchy="primary"
      label={formatMessage("Click to show toast!")}
      onPress={() =>
        showToast({
          kind: "informative",
          message: formatMessage("Informative toast"),
          dismissable: true,
        })
      }
    />
  );
}

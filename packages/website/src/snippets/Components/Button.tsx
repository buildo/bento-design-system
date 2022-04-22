import * as React from "react";
import { Button } from "..";
import { formatMessage } from "../formatMessage";

export default function ButtonExample() {
  return (
    <Button
      kind="solid"
      hierarchy="primary"
      label={formatMessage("Hello")}
      onPress={() => window.alert("Hello!")}
    />
  );
}

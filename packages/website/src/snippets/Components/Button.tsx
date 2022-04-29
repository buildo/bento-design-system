import * as React from "react";
import { Button } from "..";

export default function ButtonExample() {
  return (
    <Button kind="solid" hierarchy="primary" label="Hello" onPress={() => window.alert("Hello!")} />
  );
}

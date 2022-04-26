import * as React from "react";
import { Box } from "..";

export default function BoxExample() {
  return (
    <Box
      background={{
        default: "brandPrimary",
        hover: "primarySolidHoverBackground",
      }}
      height={80}
      width={80}
      borderRadius="circled"
    />
  );
}

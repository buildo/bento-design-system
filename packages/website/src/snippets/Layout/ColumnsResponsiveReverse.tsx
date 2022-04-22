import * as React from "react";
import { Column, Columns, Placeholder } from "..";

export default function ColumnsResponsiveReverse() {
  return (
    <Columns space={24} collapseBelow="desktop" reverse={{ tablet: true, mobile: false }}>
      <Placeholder background="softJade" />
      <Column width={{ desktop: "content", tablet: "full", mobile: "full" }}>
        <Placeholder label="sidebar" background="softBlue" />
      </Column>
    </Columns>
  );
}

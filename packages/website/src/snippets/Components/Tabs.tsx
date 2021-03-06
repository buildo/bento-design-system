import * as React from "react";
import { Tabs } from "..";

export default function TabsExample() {
  const [tab, setTab] = React.useState("tab1");
  return (
    <Tabs
      size="medium"
      tabs={[
        { label: "Tab 1", value: "tab1" },
        { label: "Tab 2", value: "tab2" },
        { label: "Tab 3", value: "tab3", disabled: true },
      ]}
      value={tab}
      onChange={setTab}
    />
  );
}

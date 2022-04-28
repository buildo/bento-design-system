import * as React from "react";
import { Tabs } from "..";
import { formatMessage } from "../formatMessage";

export default function TabsExample() {
  const [tab, setTab] = React.useState("tab1");
  return (
    <Tabs
      size="medium"
      tabs={[
        { label: formatMessage("Tab 1"), value: "tab1" },
        { label: formatMessage("Tab 2"), value: "tab2" },
        { label: formatMessage("Tab 3"), value: "tab3", disabled: true },
      ]}
      value={tab}
      onChange={setTab}
    />
  );
}

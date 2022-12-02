import * as React from "react";
import { DonutChart } from "..";

export default function DonutChartExample() {
  return (
    <DonutChart
      height={300}
      dataKey="name"
      category="value"
      data={[
        {
          name: "Group A",
          value: 400,
        },
        {
          name: "Group B",
          value: 300,
        },
        {
          name: "Group C",
          value: 500,
        },
        {
          name: "Group D",
          value: 200,
        },
        {
          name: "Group E",
          value: 278,
        },
        {
          name: "Group F",
          value: 189,
        },
      ]}
    />
  );
}

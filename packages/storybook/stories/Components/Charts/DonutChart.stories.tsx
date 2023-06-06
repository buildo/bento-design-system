import { DonutChart } from "../..";
import isChromatic from "chromatic/isChromatic";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: DonutChart,
  args: {
    height: 300,
    dataKey: "name",
    category: "value",
    hideLegend: false,
    hideTooltip: false,
    disableAnimation: isChromatic(),
    data: [
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
    ],
  },
} satisfies Meta<typeof DonutChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const donutChart = {} satisfies Story;

export const donutChartWithTooltipFormatter = {
  args: {
    tooltipFormatter: (value: number | string) => `$${value}`,
  },
} satisfies Story;

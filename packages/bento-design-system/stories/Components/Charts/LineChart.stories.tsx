import { LineChart } from "../..";
import isChromatic from "chromatic/isChromatic";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: LineChart,
  args: {
    height: 300,
    categories: ["uv", "pv", "amt"],
    hideXAxis: false,
    hideYAxis: false,
    hideLegend: false,
    hideTooltip: false,
    disableAnimation: isChromatic(),
    data: [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
    dataKey: "name",
  },
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const lineChart = {} satisfies Story;

export const LineChartWithXAxisFormatter = {
  args: {
    xAxisValueFormatter: (value: number | string) => `${value.toString().replace("Page ", "")}`,
  },
} satisfies Story;

export const LineChartWithYAxisFormatter = {
  args: {
    yAxisValueFormatter: (value: number | string) => `$${value}`,
  },
} satisfies Story;

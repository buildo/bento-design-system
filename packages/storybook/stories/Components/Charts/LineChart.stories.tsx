import { LineChart } from "../..";
import { createComponentStories } from "../../util";
import isChromatic from "chromatic/isChromatic";

const { defaultExport, createStory } = createComponentStories({
  component: LineChart,
  args: {
    height: 300,
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
});

export default defaultExport;

export const lineChart = createStory({
  categories: ["uv", "pv", "amt"],
});

export const lineChartWithXAxisFormatter = createStory({
  categories: ["uv", "pv", "amt"],
  xAxisValueFormatter: (value: number | string) => `${value.toString().replace("Page ", "")}`,
});

export const lineChartWithYAxisFormatter = createStory({
  categories: ["uv", "pv", "amt"],
  yAxisValueFormatter: (value: number | string) => `$${value}`,
});

export const biaxialLineChart = createStory({
  categories: { left: ["uv", "pv"], right: ["amt"] },
});

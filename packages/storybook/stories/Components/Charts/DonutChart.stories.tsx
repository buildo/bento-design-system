import { DonutChart } from "../..";
import { createComponentStories } from "../../util";
import isChromatic from "chromatic/isChromatic";

const { defaultExport, createStory } = createComponentStories({
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
});

export default defaultExport;

export const donutChart = createStory({});

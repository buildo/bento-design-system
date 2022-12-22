import { Legend, LegendProps, LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Box, Columns, Column, Inline, useChart } from "../..";
import { createComponentStories } from "../../util";

function CustomChart({ data }: { data: { name: unknown; uv: unknown; pv: unknown }[] }) {
  const { makeLegendEntry, makeLineProps, containerProps, tooltip } = useChart({});

  const legendContent: Required<LegendProps>["content"] = ({ payload = [] }) => {
    const leftPayload = payload.filter(
      (entry) => entry.payload?.["yAxisId" as keyof typeof entry.payload] === "yAxis1"
    );
    const rightPayload = payload.filter(
      (entry) => entry.payload?.["yAxisId" as keyof typeof entry.payload] === "yAxis2"
    );
    return (
      <Box paddingTop={8} width="full">
        <Columns space={0} alignY="center">
          <Inline space={16} alignY="center">
            {leftPayload.map(makeLegendEntry)}
          </Inline>
          <Column width="content">
            <Inline space={16} alignY="center" align="center">
              {rightPayload.map(makeLegendEntry)}
            </Inline>
          </Column>
        </Columns>
      </Box>
    );
  };

  return (
    <ResponsiveContainer {...containerProps} width="100%" height={300}>
      <LineChart data={data}>
        <Line
          {...makeLineProps(0)}
          type="monotone"
          yAxisId="yAxis1"
          dataKey="uv"
          isAnimationActive={true}
        />
        <Line
          {...makeLineProps(1)}
          type="monotone"
          yAxisId="yAxis2"
          dataKey="pv"
          isAnimationActive={true}
        />
        <XAxis dataKey="name" />
        <YAxis yAxisId="yAxis1" />
        <YAxis yAxisId="yAxis2" orientation="right" />
        {tooltip}
        <Legend content={legendContent} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const { defaultExport, createStory } = createComponentStories({
  component: CustomChart,
  args: {
    data: [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
      },
    ],
  },
});

export default defaultExport;

export const Chart = createStory({});

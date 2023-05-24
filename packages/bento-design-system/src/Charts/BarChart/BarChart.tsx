import {
  Bar,
  BarChart as RechartBarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { vars } from "../../vars.css";
import { ChartProps } from "../ChartProps";
import { useChart } from "../useChart";
import { ValueFormatter } from "../ValueFormatter";

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<D | C, unknown>[];
  categories: C[];
  dataKey: D;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  stacked?: boolean;
  xAxisValueFormatter?: ValueFormatter;
  yAxisValueFormatter?: ValueFormatter;
};

export type { Props as BarChartProps };

export function BarChart<D extends string, C extends string>({
  data,
  dataKey,
  categories,
  hideXAxis = false,
  hideYAxis = false,
  hideLegend = false,
  disableAnimation = false,
  hideTooltip = false,
  width = "100%",
  height,
  minWidth,
  minHeight,
  maxHeight,
  aspect,
  debounce,
  stacked = false,
  dataColors,
  children,
  xAxisValueFormatter,
  yAxisValueFormatter,
}: Props<D, C>) {
  const { legendContent, containerProps, makeBarProps, tooltip } = useChart({
    customColors: dataColors,
    tooltipOptions: {
      cursor: { fill: vars.backgroundColor.backgroundSecondary },
      formatter: yAxisValueFormatter,
    },
  });

  return (
    <ResponsiveContainer
      {...containerProps}
      width={width}
      height={height}
      minWidth={minWidth}
      minHeight={minHeight}
      maxHeight={maxHeight}
      aspect={aspect}
      debounce={debounce}
    >
      <RechartBarChart data={data} layout="horizontal">
        {!hideXAxis && <XAxis dataKey={dataKey} tickFormatter={xAxisValueFormatter} />}
        {!hideYAxis && <YAxis tickFormatter={yAxisValueFormatter} />}
        {!hideTooltip && tooltip}
        {!hideLegend && <Legend content={legendContent} />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            isAnimationActive={!disableAnimation}
            stackId={stacked ? "stack" : undefined}
            {...makeBarProps(i)}
          />
        ))}
        {children}
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

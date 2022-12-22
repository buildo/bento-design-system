import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartProps } from "../ChartProps";
import { useChart } from "../useChart";
import { ValueFormatter } from "../ValueFormatter";

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<D | C, unknown>[];
  categories: C[];
  dataKey: D;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  lineType?:
    | "linear"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter";
  xAxisValueFormatter?: ValueFormatter;
  yAxisValueFormatter?: ValueFormatter;
};

export type { Props as LineChartProps };

export function LineChart<D extends string, C extends string>({
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
  lineType = "monotone",
  dataColors,
  children,
  xAxisValueFormatter,
  yAxisValueFormatter,
}: Props<D, C>) {
  const { legendContent, makeLineProps, containerProps, tooltip } = useChart({
    customColors: dataColors,
    tooltipOptions: { formatter: yAxisValueFormatter },
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
      <RechartLineChart data={data}>
        {categories.map((category, i) => (
          <Line
            type={lineType}
            key={category}
            dataKey={category}
            isAnimationActive={!disableAnimation}
            {...makeLineProps(i)}
          />
        ))}
        {!hideXAxis && <XAxis dataKey={dataKey} tickFormatter={xAxisValueFormatter} />}
        {!hideYAxis && <YAxis tickFormatter={yAxisValueFormatter} />}
        {!hideTooltip && tooltip}
        {!hideLegend && <Legend content={legendContent} />}
        {children}
      </RechartLineChart>
    </ResponsiveContainer>
  );
}

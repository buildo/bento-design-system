import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useBentoConfig } from "../../BentoConfigContext";
import { bodyRecipe } from "../../Typography/Body/Body.css";
import { allColors } from "../../util/atoms";
import { ChartProps } from "../ChartProps";
import { legendContent } from "../Legend/Legend";
import { useTooltip } from "../Tooltip/Tooltip";
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
  const config = useBentoConfig();
  const tooltip = useTooltip({ formatter: yAxisValueFormatter });
  const colors = (dataColors ?? config.chart.defaultDataColors).map(
    (colorName) => allColors[colorName]
  );

  return (
    <ResponsiveContainer
      className={bodyRecipe({ size: "medium", weight: "default", color: "default" })}
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
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
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

import {
  Bar,
  BarChart as RechartBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useBentoConfig } from "../../BentoConfigContext";
import { bodyRecipe } from "../../Typography/Body/Body.css";
import { allColors } from "../../util/atoms";
import { vars } from "../../vars.css";
import { ChartProps } from "../ChartProps";
import { legendContent } from "../Legend/Legend";
import { tooltipContent } from "../Tooltip/Tooltip";
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
  const config = useBentoConfig();
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
      <RechartBarChart data={data}>
        {!hideXAxis && <XAxis dataKey={dataKey} tickFormatter={xAxisValueFormatter} />}
        {!hideYAxis && <YAxis tickFormatter={yAxisValueFormatter} />}
        {!hideTooltip && (
          <Tooltip
            content={tooltipContent}
            cursor={{ fill: vars.backgroundColor.backgroundSecondary }}
            formatter={yAxisValueFormatter}
          />
        )}
        {!hideLegend && <Legend content={legendContent} />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            isAnimationActive={!disableAnimation}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
        {children}
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

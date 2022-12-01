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

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<D | C, unknown>[];
  categories: C[];
  dataKey: D;
  showXAxis?: boolean;
  showYAxis?: boolean;
  stacked?: boolean;
};

export type { Props as BarChartProps };

export function BarChart<D extends string, C extends string>({
  data,
  dataKey,
  categories,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showAnimation = true,
  showTooltip = true,
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
        {showXAxis && <XAxis dataKey={dataKey} />}
        {showYAxis && <YAxis />}
        {showTooltip && (
          <Tooltip
            content={tooltipContent}
            cursor={{ fill: vars.backgroundColor.backgroundSecondary }}
          />
        )}
        {showLegend && <Legend content={legendContent} />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            isAnimationActive={showAnimation}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
        {children}
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

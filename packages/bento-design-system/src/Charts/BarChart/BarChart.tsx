import {
  Bar,
  BarChart as RechartBarChart,
  Legend,
  ResponsiveContainer,
  ResponsiveContainerProps,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useBentoConfig } from "../../BentoConfigContext";
import { bodyRecipe } from "../../Typography/Body/Body.css";
import { allColors } from "../../util/atoms";
import { Children } from "../../util/Children";
import { ChartDataColor } from "../Config";

type Props<D extends string, C extends string[]> = {
  data: Record<D, unknown>[];
  categories: C;
  dataKey: D;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showAnimation?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  stacked?: boolean;
  dataColors?: ChartDataColor[];
  children?: Children;
} & Pick<
  ResponsiveContainerProps,
  "width" | "height" | "minWidth" | "minHeight" | "maxHeight" | "aspect" | "debounce"
>;

export type { Props as BarChartProps };

export function BarChart<D extends string, C extends string[]>({
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
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i]}
            isAnimationActive={showAnimation}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
        {children}
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

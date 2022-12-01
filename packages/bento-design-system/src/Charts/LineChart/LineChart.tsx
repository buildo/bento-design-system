import {
  LineChart as RechartLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useBentoConfig } from "../../BentoConfigContext";
import { bodyRecipe } from "../../Typography/Body/Body.css";
import { allColors } from "../../util/atoms";
import { ChartProps } from "../ChartProps";
import { legendContent } from "../Legend/Legend";
import { tooltipContent } from "../Tooltip/Tooltip";

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<D | C, unknown>[];
  categories: C[];
  dataKey: D;
  showXAxis?: boolean;
  showYAxis?: boolean;
  lineType?:
    | "linear"
    | "natural"
    | "monotoneX"
    | "monotoneY"
    | "monotone"
    | "step"
    | "stepBefore"
    | "stepAfter";
};

export type { Props as LineChartProps };

export function LineChart<D extends string, C extends string>({
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
  lineType = "monotone",
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
      <RechartLineChart data={data}>
        {categories.map((category, i) => (
          <Line
            type={lineType}
            key={category}
            dataKey={category}
            isAnimationActive={showAnimation}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
        {showXAxis && <XAxis dataKey={dataKey} />}
        {showYAxis && <YAxis />}
        {showTooltip && <Tooltip content={tooltipContent} />}
        {showLegend && <Legend content={legendContent} />}
        {children}
      </RechartLineChart>
    </ResponsiveContainer>
  );
}

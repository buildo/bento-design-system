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
import { TooltipContent } from "../Tooltip/Tooltip";
import { NameType, ValueType } from "../utils";

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
            isAnimationActive={!disableAnimation}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
        {!hideXAxis && <XAxis dataKey={dataKey} />}
        {!hideYAxis && <YAxis />}
        {!hideTooltip && (
          <Tooltip<ValueType, NameType>
            content={({ active, payload, label }) => (
              <TooltipContent active={active} payload={payload} label={label} />
            )}
          />
        )}
        {!hideLegend && <Legend content={legendContent} />}
        {children}
      </RechartLineChart>
    </ResponsiveContainer>
  );
}

import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useBentoConfig } from "../../BentoConfigContext";
import { bodyRecipe } from "../../Typography/Body/Body.css";
import { allColors } from "../../util/atoms";
import { ChartProps } from "../ChartProps";

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<D, unknown>[];
  category: C;
  dataKey: D;
};

export type { Props as DonutChartProps };

export function DonutChart<D extends string, C extends string>({
  data,
  dataKey,
  category,
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
      <RechartPieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={dataKey}
          isAnimationActive={showAnimation}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius="75%"
          outerRadius="100%"
          paddingAngle={0}
        >
          {data.map((_entry, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {children}
      </RechartPieChart>
    </ResponsiveContainer>
  );
}

import { PieChart as RechartPieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { ChartProps } from "../ChartProps";
import { useChart } from "../useChart";
import { ValueFormatter } from "../ValueFormatter";

type Props<D extends string, C extends string> = ChartProps & {
  data: Record<C | D, unknown>[];
  category: C;
  dataKey: D;
  tooltipFormatter?: ValueFormatter;
};

export type { Props as DonutChartProps };

export function DonutChart<D extends string, C extends string>({
  data,
  dataKey,
  category,
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
  dataColors,
  children,
  tooltipFormatter,
}: Props<D, C>) {
  const { legendContent, containerProps, pieProps, makePieCellProps, tooltip } = useChart({
    customColors: dataColors,
    tooltipOptions: { formatter: tooltipFormatter },
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
      <RechartPieChart>
        <Pie
          data={data}
          dataKey={category}
          nameKey={dataKey}
          isAnimationActive={!disableAnimation}
          {...pieProps}
        >
          {data.map((_entry, i) => (
            <Cell key={`cell-${i}`} {...makePieCellProps(i)} />
          ))}
        </Pie>
        {!hideTooltip && tooltip}
        {!hideLegend && <Legend content={legendContent} />}
        {children}
      </RechartPieChart>
    </ResponsiveContainer>
  );
}

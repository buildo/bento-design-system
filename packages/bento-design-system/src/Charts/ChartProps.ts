import { ResponsiveContainerProps } from "recharts";
import { Children } from "../util/Children";
import { ChartDataColor } from "./Config";

export type ChartProps = {
  dataColors?: ChartDataColor[];
  showAnimation?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  children?: Children;
} & Pick<
  ResponsiveContainerProps,
  "width" | "height" | "minWidth" | "minHeight" | "maxHeight" | "aspect" | "debounce"
>;

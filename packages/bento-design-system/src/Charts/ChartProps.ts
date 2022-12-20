import { ResponsiveContainerProps } from "recharts";
import { Children } from "../util/Children";
import { ChartDataColor } from "./Config";

export type ChartProps = {
  dataColors?: ChartDataColor[];
  disableAnimation?: boolean;
  hideLegend?: boolean;
  hideTooltip?: boolean;
  children?: Children;
} & Pick<
  ResponsiveContainerProps,
  "width" | "height" | "minWidth" | "minHeight" | "maxHeight" | "aspect" | "debounce"
>;

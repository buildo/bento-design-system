import { allColors } from "../util/atoms";

export type ChartDataColor = keyof typeof allColors;

export type ChartConfig = {
  defaultDataColors: ChartDataColor[];
};

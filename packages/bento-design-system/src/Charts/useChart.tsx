import { CSSVarFunction } from "@vanilla-extract/private";
import { ReactElement } from "react";
import {
  BarProps,
  CellProps,
  LegendProps,
  LineProps,
  PieProps,
  ResponsiveContainerProps,
  TooltipProps,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";
import { useBentoConfig } from "../BentoConfigContext";
import { Box } from "../Box/Box";
import { cardRecipe } from "../Card/Card.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { allColors } from "../util/atoms";
import { Children } from "../util/Children";
import { Omit } from "../util/Omit";
import { ChartConfig, ChartDataColor } from "./Config";
import { legendContent, makeLegendEntry } from "./Legend/Legend";
import { tooltipStyle, useTooltip } from "./Tooltip/Tooltip";
import { NameType, ValueType } from "./ValueFormatter";

type ChartTools<TValue extends ValueType, TName extends NameType> = {
  /**
   * The palette of colors to be used in the chart (e.g. for lines or bars).
   */
  colorPalette: Array<CSSVarFunction>;
  /**
   * The default configuration for Bento's `*Chart` components.
   */
  defaultConfig: ChartConfig;
  /**
   * A pre-constructed component that is meant to be used for the `content` property
   * of the `Legend` component.
   * Use this if you don't require a custom legend design.
   */
  legendContent: Required<LegendProps>["content"];
  /**
   * A function to convert payload entries into a component made of a symbol/name pair
   *  to be used to construct a custom `Legend` content.
   */
  makeLegendEntry: (entry: Payload) => JSX.Element;
  /**
   * A subset of `ResponsiveContainerProps`, consistent with those used internally
   * in Bento's `*Chart` components.
   */
  containerProps: Pick<ResponsiveContainerProps, "className">;
  /**
   * A function to generate a subset of `BarProps`, consistent with those used internally in Bento's
   * `BarChart` component.
   * The expected input is the index of the bar in the list of bars to be rendered.
   * Note: since bar fill is chosen cyclically between the values in `colorPalette`,
   * bars with equal or modulo-equivalent number will have the same fill.
   */
  makeBarProps: (i: number) => Pick<BarProps, "fill">;
  /**
   * A function to generate a subset of `LineProps`, consistent with those used internally
   * in Bento's `LineChart` component.
   * The expected input is the index of the line in the list of lines to be rendered.
   * Note: since line color is chosen cyclically between the values in `colorPalette`,
   * lines with equal or modulo-equivalent number will have the same color.
   */
  makeLineProps: (i: number) => Pick<LineProps, "stroke" | "strokeWidth" | "dot">;
  /**
   * A subset of `PieProps`, consistent with those used internally in Bento's
   * `DonutChart` component.
   */
  pieProps: Pick<
    PieProps,
    | "cx"
    | "cy"
    | "startAngle"
    | "endAngle"
    | "innerRadius"
    | "outerRadius"
    | "paddingAngle"
    | "stroke"
  >;
  /**
   * A function to generate a subset of `CellProps`, consistent with those used internally
   * in Bento's `DonutChart` component.
   * The expected input is the index of the cell in the list of pie cells to be rendered.
   * Note: since cell fill is chosen cyclically between the values in `colorPalette`,
   * cells with equal or modulo-equivalent number will have the same fill.
   */
  makePieCellProps: (i: number) => Pick<CellProps, "fill">;
  /**
   * A pre-constructed `Tooltip` component.
   * Use this if you don't require a custom tooltip design.
   */
  tooltip: ReactElement<TooltipProps<TValue, TName>>;
  /**
   * A component that is meant to wrap a custom implementation of `Tooltip`'s content,
   * to provide an appearance consistent with that of the internal `Tooltip` implementation.
   */
  TooltipContentWrapper: React.FunctionComponent<{ children: Children }>;
  /**
   * An inline style that is meant to be used for the `wrapperStyle` property
   * of the `Tooltip` component, to provide an appearance consistent with that of the
   * internal `Tooltip` implementation.
   */
  tooltipWrapperStyle: React.CSSProperties;
};

export function useChart<TValue extends ValueType, TName extends NameType>({
  customColors,
  tooltipOptions = {},
}: {
  customColors?: Array<ChartDataColor>;
  tooltipOptions?: Omit<TooltipProps<TValue, TName>, "wrapperStyle" | "content">;
}): ChartTools<TValue, TName> {
  const bentoConfig = useBentoConfig();
  const defaultConfig = bentoConfig.chart;

  const colorPalette = (customColors ?? defaultConfig.defaultDataColors).map(
    (colorName) => allColors[colorName]
  );

  const containerProps = {
    className: bodyRecipe({ size: "medium", weight: "default", color: "default", ellipsis: false }),
  };
  const makeBarProps = (i: number) => ({
    fill: colorPalette[i % colorPalette.length],
  });
  const makeLineProps = (i: number) => ({
    stroke: colorPalette[i % colorPalette.length],
    strokeWidth: 2,
    dot: false,
  });
  const pieProps = {
    cx: "50%",
    cy: "50%",
    startAngle: 90,
    endAngle: -270,
    innerRadius: "75%",
    outerRadius: "100%",
    paddingAngle: 0,
    // Remove 1px gap between slices
    stroke: "",
  };
  const makePieCellProps = (i: number) => ({
    fill: colorPalette[i % colorPalette.length],
  });

  const tooltip = useTooltip(tooltipOptions);
  function TooltipContentWrapper({ children }: { children: Children }) {
    return (
      <Box
        className={cardRecipe({ elevation: "small" })}
        borderRadius={bentoConfig.card.defaultRadius}
        padding={16}
        tabIndex={-1}
      >
        {children}
      </Box>
    );
  }

  return {
    colorPalette,
    defaultConfig,
    makeLegendEntry,
    containerProps,
    makeBarProps,
    makeLineProps,
    pieProps,
    makePieCellProps,
    legendContent,
    tooltip,
    TooltipContentWrapper,
    tooltipWrapperStyle: tooltipStyle,
  };
}

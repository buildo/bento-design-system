import { LegendProps as RechartsLegendProps } from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";
import { match } from "ts-pattern";
import { Box } from "../../Box/Box";
import { Column, Columns } from "../../Layout/Columns";
import { Inline } from "../../Layout/Inline";
import { Body } from "../../Typography/Body/Body";

export const legendContent: Required<RechartsLegendProps>["content"] = ({ payload = [] }) => {
  return (
    <Box paddingTop={8} width="full">
      <Inline space={16} alignY="center" align="center">
        {payload.map(makeLegendEntry)}
      </Inline>
    </Box>
  );
};

export const makeLegendEntry = (entry: Payload) =>
  match(entry.type ?? "square")
    .with("plainline", "line", () => <LegendItemLine key={entry.value} {...entry} />)
    .with("rect", "square", "circle", "cross", "diamond", "star", "triangle", "wye", "none", () => (
      <LegendItemArea key={entry.value} {...entry} />
    ))
    .exhaustive();

function LegendItemArea({ color, value }: Payload) {
  return (
    <Columns space={4} alignY="center">
      <Column width="content">
        <Box height={16} width={16} borderRadius={4} style={{ backgroundColor: color }} />
      </Column>
      <Body size="small">{value}</Body>
    </Columns>
  );
}

function LegendItemLine({ color, value }: Payload) {
  return (
    <Columns space={4} alignY="center">
      <Column width="content">
        <Box width={16} borderRadius="circledX" style={{ height: 3, backgroundColor: color }} />
      </Column>
      <Body size="small">{value}</Body>
    </Columns>
  );
}

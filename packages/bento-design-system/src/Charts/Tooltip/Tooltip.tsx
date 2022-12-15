import { TooltipProps as RechartsTooltipProps } from "recharts";
import { Box } from "../../Box/Box";
import { Column, Columns } from "../../Layout/Columns";
import { Stack } from "../../Layout/Stack";
import { Body } from "../../Typography/Body/Body";
import { NameType, ValueFormatter, ValueType } from "../utils";

type TooltipProps<TValue extends ValueType, TName extends NameType> = RechartsTooltipProps<
  TValue,
  TName
> & {
  valueFormatter?: ValueFormatter;
};

export function TooltipContent<TValue extends ValueType, TName extends NameType>({
  active,
  payload = [],
  label,
  valueFormatter,
}: TooltipProps<TValue, TName>) {
  if (!active || payload.length === 0) {
    return null;
  }
  return (
    <Box
      padding={16}
      background="backgroundPrimary"
      borderWidth={1}
      borderStyle="solid"
      borderColor="outlineContainer"
      borderRadius={4}
      tabIndex={-1}
    >
      <Stack space={8}>
        <Body size="medium">{label}</Body>
        <Stack space={4}>
          {payload.map(({ value, name, color }) => (
            <Columns key={name} space={4} alignY="center">
              <Column width="content">
                <Box height={16} width={16} borderRadius={4} style={{ backgroundColor: color }} />
              </Column>
              <Body size="small">{`${name}: ${
                valueFormatter && value !== undefined ? valueFormatter(value) : value
              }`}</Body>
            </Columns>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

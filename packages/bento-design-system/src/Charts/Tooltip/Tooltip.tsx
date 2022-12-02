import { TooltipProps as RechartsTooltipProps } from "recharts";
import { Box } from "../../Box/Box";
import { Column, Columns } from "../../Layout/Columns";
import { Stack } from "../../Layout/Stack";
import { Body } from "../../Typography/Body/Body";

type ValueType = number | string;
type NameType = number | string;

export const tooltipContent = <TValue extends ValueType, TName extends NameType>({
  active,
  payload = [],
  label,
}: RechartsTooltipProps<TValue, TName>) => {
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
              <Body size="small">{`${name}: ${value}`}</Body>
            </Columns>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

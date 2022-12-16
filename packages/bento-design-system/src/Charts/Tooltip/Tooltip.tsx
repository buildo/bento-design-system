import { TooltipProps as RechartsTooltipProps } from "recharts";
import { match, __, not } from "ts-pattern";
import { Box } from "../../Box/Box";
import { Column, Columns } from "../../Layout/Columns";
import { Stack } from "../../Layout/Stack";
import { Body } from "../../Typography/Body/Body";
import { NameType, ValueType } from "../ValueFormatter";

export const tooltipContent = <TValue extends ValueType, TName extends NameType>({
  active,
  payload = [],
  label,
  formatter,
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
          {payload.map(({ value, name, color, payload: item }, index) => (
            <Columns key={name} space={4} alignY="center">
              <Column width="content">
                <Box height={16} width={16} borderRadius={4} style={{ backgroundColor: color }} />
              </Column>
              <Body size="small">
                {match(formatter?.(value!, name!, item, index, payload))
                  .with([not(__.nullish), not(__.nullish)], ([value, name]) => `${name}: ${value}`)
                  .with(__.string, __.number, (value) => `${name}: ${value}`)
                  .otherwise(() => `${name}: ${value}`)}
              </Body>
            </Columns>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

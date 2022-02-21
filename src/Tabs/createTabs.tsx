import { usePress } from "@react-aria/interactions";
import { Box, Columns, Column, BentoSprinkles } from "../internal";
import { Label } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { tabRecipe } from "./Tabs.css";
import { ComponentProps } from "react";

type TabProps = {
  label: LocalizedString;
  onPress: () => void;
  active: boolean;
  disabled?: boolean;
};

type TabsConfig = {
  radius: BentoSprinkles["borderRadius"];
  paddingX: BentoSprinkles["paddingX"];
  paddingY: BentoSprinkles["paddingY"];
  labelSize: ComponentProps<typeof Label>["size"];
};

export function createTabs(
  config: TabsConfig = {
    radius: 8,
    paddingX: 40,
    paddingY: 8,
    labelSize: "large",
  }
) {
  function Tab({ active, onPress, label, disabled }: TabProps) {
    const {
      pressProps: { color: ignored1, ...pressProps },
    } = usePress({ onPress, isDisabled: disabled });

    return (
      <Box
        tabIndex={active || disabled ? -1 : 0}
        className={tabRecipe({ active })}
        {...pressProps}
        disabled={disabled}
        borderTopRadius={config.radius}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
      >
        <Label size={config.labelSize} uppercase>
          {label}
        </Label>
      </Box>
    );
  }

  type Props<A> = {
    value: A;
    onChange: (v: A) => void;
    tabs: Array<{ value: A; label: LocalizedString; disabled?: boolean }>;
  };

  return function Tabs<A>({ value, tabs, onChange }: Props<A>) {
    return (
      <Box boxShadow="outlineInteractiveBottom">
        <Columns space={0}>
          {tabs.map((t) => (
            <Column key={t.label} width="content">
              <Tab
                label={t.label}
                onPress={() => onChange(t.value)}
                active={value === t.value}
                disabled={t.disabled}
              />
            </Column>
          ))}
        </Columns>
      </Box>
    );
  };
}

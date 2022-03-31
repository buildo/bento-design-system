import { usePress } from "@react-aria/interactions";
import { Box, Columns, Column } from "../internal";
import { Children, IconPlaceholder, IconProps, Label } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { tabRecipe } from "./Tabs.css";
import { TabsConfig } from "./Config";

type Props<A> = {
  value: A;
  onChange: (v: A) => void;
  tabs: Array<{
    value: A;
    label: LocalizedString;
    disabled?: boolean;
    icon?: (props: IconProps) => Children;
    hasNotification?: boolean;
  }>;
};

export function createTabs(config: TabsConfig) {
  type TabProps = {
    label: LocalizedString;
    onPress: () => void;
    active: boolean;
    disabled?: boolean;
    icon?: (props: IconProps) => Children;
    hasNotification?: boolean;
  };
  function Tab({ active, onPress, label, disabled, icon, hasNotification }: TabProps) {
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
        <Columns space={8} alignY="center">
          {icon && <Column width="content">{icon({ size: 16, color: "inherit" })}</Column>}
          <Label size={config.labelSize} uppercase>
            {label}
          </Label>
          {hasNotification && (
            <Column width="content">
              <IconPlaceholder size={8} color="inherit" />
            </Column>
          )}
        </Columns>
      </Box>
    );
  }

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
                icon={t.icon}
                hasNotification={t.hasNotification}
              />
            </Column>
          ))}
        </Columns>
      </Box>
    );
  };
}

export type { Props as TabsProps };

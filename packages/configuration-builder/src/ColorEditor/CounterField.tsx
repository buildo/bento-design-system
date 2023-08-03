import {
  Column,
  Columns,
  IconButton,
  IconMinus,
  IconPlus,
  NumberField,
  NumberFieldProps,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";

export function CounterField(props: NumberFieldProps) {
  const { t } = useTranslation();
  const step = props.step ?? 1;
  return (
    <Columns space={8} alignY="bottom">
      <Column width="content">
        <IconButton
          kind="solid"
          hierarchy="secondary"
          icon={IconMinus}
          size={16}
          label={t("CounterField.decrement")}
          onPress={() => {
            const newValue = (props.value ?? 0) - step;
            if (!props.minValue || newValue >= props.minValue) {
              props.onChange(newValue);
            } else {
              props.onChange(props.minValue);
            }
          }}
        />
      </Column>
      <NumberField {...props} />
      <Column width="content">
        <IconButton
          kind="solid"
          hierarchy="secondary"
          icon={IconPlus}
          size={16}
          label={t("CounterField.increment")}
          onPress={() => {
            const newValue = (props.value ?? 0) + step;
            if (!props.maxValue || newValue <= props.maxValue) {
              props.onChange(newValue);
            } else {
              props.onChange(props.maxValue);
            }
          }}
        />
      </Column>
    </Columns>
  );
}
